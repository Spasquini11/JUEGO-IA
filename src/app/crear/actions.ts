"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { enviarInvitacion } from "@/lib/email";

/*
  Acción de servidor para crear una sesión (Épica 3, F1 real).
  Guarda en la base: la sesión, el participante creador (ya aceptado), los
  participantes invitados y sus invitaciones (con un token único cada una).
  Los emails de invitación se mandan más adelante (Épica 4).
*/

export type CrearResultado = { error?: string };

export async function crearSesion(
  _prev: CrearResultado,
  formData: FormData,
): Promise<CrearResultado> {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/ingresar");

  const creadorNombre = String(formData.get("creador_nombre") ?? "").trim();
  const tema = String(formData.get("tema") ?? "").trim();
  const objetivo = String(formData.get("objetivo") ?? "").trim();
  const nombres = formData.getAll("inv_nombre").map((v) => String(v).trim());
  const emails = formData.getAll("inv_email").map((v) => String(v).trim());

  // Armar la lista de invitados que tienen nombre Y email
  const invitados = nombres
    .map((nombre, i) => ({ nombre, email: emails[i] ?? "" }))
    .filter((p) => p.nombre && p.email);

  // Validaciones
  if (!creadorNombre) return { error: "Poné tu nombre." };
  if (!tema) return { error: "Escribí un tema." };
  if (invitados.length < 1)
    return { error: "Invitá al menos a una persona (con nombre y email)." };
  if (invitados.length > 4)
    return { error: "Podés invitar como máximo a 4 personas." };

  // Límite de 20 conversaciones activas por persona
  const { count } = await supabase
    .from("sessions")
    .select("*", { count: "exact", head: true })
    .eq("creator_id", user.id)
    .in("status", ["no_iniciada", "activa"]);
  if ((count ?? 0) >= 20)
    return { error: "Llegaste al máximo de 20 conversaciones activas." };

  // Guardar el nombre del creador en su perfil
  await supabase
    .from("profiles")
    .upsert({ id: user.id, display_name: creadorNombre });

  // Crear la sesión
  const { data: sesion, error: errSesion } = await supabase
    .from("sessions")
    .insert({
      creator_id: user.id,
      topic: tema,
      objective: objetivo || null,
      status: "no_iniciada",
    })
    .select("id")
    .single();
  if (errSesion || !sesion)
    return { error: "No se pudo crear la conversación. Probá de nuevo." };

  // Participante creador (ya aceptado)
  const { error: errCreador } = await supabase.from("participants").insert({
    session_id: sesion.id,
    user_id: user.id,
    role: "creator",
    display_name: creadorNombre,
    status: "accepted",
  });
  if (errCreador)
    return { error: "No se pudo crear la conversación. Probá de nuevo." };

  // Cada invitado: su participante + su invitación (con token único)
  for (const p of invitados) {
    const { data: part, error: errPart } = await supabase
      .from("participants")
      .insert({
        session_id: sesion.id,
        role: "invitee",
        display_name: p.nombre,
        status: "invited",
      })
      .select("id")
      .single();
    if (errPart || !part)
      return { error: "No se pudieron agregar los invitados." };

    const token = randomUUID();
    await supabase.from("invitations").insert({
      session_id: sesion.id,
      participant_id: part.id,
      email: p.email,
      token,
      status: "pending",
      last_sent_at: new Date().toISOString(),
    });

    // Mandar el email de invitación (best-effort: no frena la creación si falla)
    try {
      await enviarInvitacion({
        para: p.email,
        creadorNombre,
        tema,
        link: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/invitacion/${token}`,
      });
    } catch {
      // Ignoramos errores de email acá; la invitación ya quedó guardada.
    }
  }

  // Listo: al Home (donde ya aparece la conversación nueva)
  redirect("/");
}
