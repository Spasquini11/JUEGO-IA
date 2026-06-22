"use server";

import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabaseServer } from "@/lib/supabase/server";
import { enviarPropuesta } from "@/lib/email";

/*
  Respuesta del invitado a una invitación (Épica 4).
  Usamos el cliente admin porque el invitado puede no estar logueado todavía;
  el "secreto" que lo habilita es el token único de su invitación.
*/

export async function aceptarInvitacion(
  token: string,
  nombre: string,
): Promise<{ error?: string } | void> {
  const admin = getSupabaseAdmin();
  const { data: inv } = await admin
    .from("invitations")
    .select("id, status, email, session_id, participant_id")
    .eq("token", token)
    .maybeSingle();

  if (!inv || inv.status !== "pending") {
    return { error: "Esta invitación ya no está disponible." };
  }

  // Para aceptar hay que estar logueado con el email de la invitación.
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || (user.email ?? "").toLowerCase() !== inv.email.toLowerCase()) {
    return {
      error: `Para aceptar, primero entrá con tu email (${inv.email}) desde la pantalla de ingreso.`,
    };
  }

  const update: Record<string, unknown> = {
    user_id: user.id,
    status: "accepted",
  };
  if (nombre.trim()) update.display_name = nombre.trim();

  await admin.from("participants").update(update).eq("id", inv.participant_id);
  await admin.from("invitations").update({ status: "accepted" }).eq("id", inv.id);
  // Con al menos un invitado que acepta, la sesión queda activa.
  await admin.from("sessions").update({ status: "activa" }).eq("id", inv.session_id);

  redirect("/");
}

export async function declinarInvitacion(
  token: string,
): Promise<{ error?: string } | void> {
  const admin = getSupabaseAdmin();
  const { data: inv } = await admin
    .from("invitations")
    .select("id, status, participant_id")
    .eq("token", token)
    .maybeSingle();

  if (!inv || inv.status !== "pending") {
    return { error: "Esta invitación ya no está disponible." };
  }

  await admin
    .from("participants")
    .update({ status: "declined" })
    .eq("id", inv.participant_id);
  await admin.from("invitations").update({ status: "declined" }).eq("id", inv.id);

  redirect(`/invitacion/${token}`);
}

export async function proponerAjuste(
  token: string,
  mensaje: string,
): Promise<{ ok?: boolean; error?: string }> {
  const texto = mensaje.trim();
  if (!texto) return { error: "Escribí qué ajustarías del objetivo." };

  const admin = getSupabaseAdmin();
  const { data: inv } = await admin
    .from("invitations")
    .select("id, status, participant_id, session_id")
    .eq("token", token)
    .maybeSingle();
  if (!inv || inv.status !== "pending") {
    return { error: "Esta invitación ya no está disponible." };
  }

  const { data: sesion } = await admin
    .from("sessions")
    .select("topic, creator_id")
    .eq("id", inv.session_id)
    .single();
  const { data: parti } = await admin
    .from("participants")
    .select("display_name")
    .eq("id", inv.participant_id)
    .maybeSingle();

  // Buscar el email del creador para mandarle la propuesta
  let creadorEmail: string | null = null;
  if (sesion?.creator_id) {
    const { data: u } = await admin.auth.admin.getUserById(sesion.creator_id);
    creadorEmail = u.user?.email ?? null;
  }

  if (creadorEmail) {
    try {
      await enviarPropuesta({
        para: creadorEmail,
        invitadoNombre: parti?.display_name ?? "Un invitado",
        tema: sesion?.topic ?? "",
        mensaje: texto,
      });
    } catch {
      // no frenamos si el email falla
    }
  }

  // La invitación sigue pendiente: la persona puede aceptar luego del ajuste.
  return { ok: true };
}
