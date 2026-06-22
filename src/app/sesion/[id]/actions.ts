"use server";

import { randomUUID } from "crypto";
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
