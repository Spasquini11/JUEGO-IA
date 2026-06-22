"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabaseServer } from "@/lib/supabase/server";
import { enviarInvitacion } from "@/lib/email";

/*
  Reinvitar a alguien que declinó (Épica 4).
  Regla: solo el creador, una sola vez, y recién 14 días después de la última
  invitación enviada. Genera un token nuevo y reenvía el email.
*/
export async function reinvitar(
  invitationId: string,
): Promise<{ ok?: boolean; error?: string }> {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Entrá para reinvitar." };

  const admin = getSupabaseAdmin();
  const { data: inv } = await admin
    .from("invitations")
    .select("id, email, status, reinvite_count, last_sent_at, session_id, participant_id")
    .eq("id", invitationId)
    .maybeSingle();
  if (!inv) return { error: "Invitación no encontrada." };

  const { data: sesion } = await admin
    .from("sessions")
    .select("topic, creator_id")
    .eq("id", inv.session_id)
    .single();
  if (!sesion || sesion.creator_id !== user.id) {
    return { error: "Solo quien creó la conversación puede reinvitar." };
  }
  if (inv.status !== "declined") {
    return { error: "Solo se puede reinvitar a alguien que declinó." };
  }
  if ((inv.reinvite_count ?? 0) >= 1) {
    return { error: "Ya reinvitaste a esta persona una vez." };
  }
  if (inv.last_sent_at) {
    const dias =
      (Date.now() - new Date(inv.last_sent_at).getTime()) / 86_400_000;
    if (dias < 14) {
      return { error: "Todavía no pasaron 14 días desde la última invitación." };
    }
  }

  const token = randomUUID();
  await admin
    .from("invitations")
    .update({
      token,
      status: "pending",
      reinvite_count: (inv.reinvite_count ?? 0) + 1,
      last_sent_at: new Date().toISOString(),
    })
    .eq("id", inv.id);
  await admin
    .from("participants")
    .update({ status: "invited" })
    .eq("id", inv.participant_id);

  const { data: prof } = await admin
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .maybeSingle();

  try {
    await enviarInvitacion({
      para: inv.email,
      creadorNombre: prof?.display_name ?? "Alguien",
      tema: sesion.topic ?? "",
      link: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/invitacion/${token}`,
    });
  } catch {
    // no frenamos si el email falla
  }

  revalidatePath(`/sesion/${inv.session_id}`);
  return { ok: true };
}

/*
  Enviar un mensaje al hilo (Épica 5).
  Usa el cliente del usuario (no admin): las reglas de la base (RLS) garantizan que
  solo un participante de la sesión puede escribir, y siempre como sí mismo.
*/
export async function enviarMensaje(
  sessionId: string,
  texto: string,
): Promise<{ error?: string } | void> {
  const t = texto.trim();
  if (!t) return { error: "Escribí algo." };

  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Entrá para escribir." };

  const { error } = await supabase.from("messages").insert({
    session_id: sessionId,
    sender_id: user.id,
    body: t,
  });
  if (error) return { error: "No se pudo enviar el mensaje." };

  revalidatePath(`/sesion/${sessionId}`);
}

// --- Cierre de la conversación (Épica 10, parte gratis) ---

async function esParticipante(
  admin: ReturnType<typeof getSupabaseAdmin>,
  sessionId: string,
  userId: string,
) {
  const { data } = await admin
    .from("participants")
    .select("id")
    .eq("session_id", sessionId)
    .eq("user_id", userId)
    .maybeSingle();
  return !!data;
}

export async function proponerCierre(sessionId: string): Promise<void> {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  const admin = getSupabaseAdmin();
  if (!(await esParticipante(admin, sessionId, user.id))) return;

  await admin
    .from("sessions")
    .update({
      close_proposed_at: new Date().toISOString(),
      close_proposed_by: user.id,
    })
    .eq("id", sessionId);
  revalidatePath(`/sesion/${sessionId}`);
}

export async function confirmarCierre(sessionId: string): Promise<void> {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  const admin = getSupabaseAdmin();
  if (!(await esParticipante(admin, sessionId, user.id))) return;

  await admin
    .from("sessions")
    .update({ status: "cerrada", closed_at: new Date().toISOString() })
    .eq("id", sessionId);
  revalidatePath(`/sesion/${sessionId}`);
}

export async function seguirConversando(sessionId: string): Promise<void> {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  const admin = getSupabaseAdmin();
  if (!(await esParticipante(admin, sessionId, user.id))) return;

  await admin
    .from("sessions")
    .update({ close_proposed_at: null, close_proposed_by: null })
    .eq("id", sessionId);
  revalidatePath(`/sesion/${sessionId}`);
}

// --- Borrado real (Épica 11) ---

export async function borrarMisMensajes(sessionId: string): Promise<void> {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  // Las reglas de la base (RLS) solo dejan borrar los mensajes propios.
  await supabase
    .from("messages")
    .delete()
    .eq("session_id", sessionId)
    .eq("sender_id", user.id);
  revalidatePath(`/sesion/${sessionId}`);
}

export async function borrarSesion(sessionId: string): Promise<void> {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  // Solo el creador puede borrar la conversación entera.
  const admin = getSupabaseAdmin();
  const { data: s } = await admin
    .from("sessions")
    .select("creator_id")
    .eq("id", sessionId)
    .maybeSingle();
  if (!s || s.creator_id !== user.id) return;

  // Borrado real: al borrar la sesión, la base borra en cascada participantes,
  // invitaciones, mensajes y resúmenes (ON DELETE CASCADE).
  await admin.from("sessions").delete().eq("id", sessionId);
  redirect("/");
}
