import Link from "next/link";
import { redirect } from "next/navigation";
import Avatar from "@/components/Avatar";
import { createSupabaseServer } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import Invitaciones, { type InvitacionVista } from "./Invitaciones";
import Escribir from "./Escribir";
import Cierre from "./Cierre";
import Borrar from "./Borrar";

/*
  Vista de una sesión (Épicas 4, 5 y 10).
  - Hilo de mensajes (escribir/leer).
  - Participantes y ajustes (desplegable), con reinvitación para el creador.
  - Cierre: proponer cerrar, confirmar/seguir, y autocierre a los 7 días.
  El resumen del cierre (con IA) queda para el final.
*/

type Participante = {
  id: string;
  user_id: string | null;
  display_name: string;
  role: string;
  status: string;
};

type Mensaje = { id: string; body: string; sender_id: string };

function estadoParticipante(p: Participante) {
  if (p.role === "creator") return "Creó la conversación";
  if (p.status === "accepted") return "Aceptó";
  if (p.status === "declined") return "Declinó";
  return "Invitado/a";
}

export default async function SesionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/ingresar");

  const { data: sesion } = await supabase
    .from("sessions")
    .select(
      "id, topic, objective, status, creator_id, close_proposed_at, close_proposed_by, closed_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (!sesion) {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-[460px] flex-col justify-center px-5 py-10 text-center">
        <h1 className="text-xl font-bold text-ink">Conversación no encontrada</h1>
        <p className="mt-2 text-sm text-muted">No existe o no tenés acceso.</p>
        <Link href="/" className="btn-primary mt-6 block">
          Volver al inicio
        </Link>
      </main>
    );
  }

  // Autocierre: si se propuso cerrar y pasaron 7 días sin objeción, se cierra sola.
  let status = sesion.status as string;
  if (status !== "cerrada" && sesion.close_proposed_at) {
    const dias =
      (Date.now() - new Date(sesion.close_proposed_at).getTime()) / 86_400_000;
    if (dias >= 7) {
      await getSupabaseAdmin()
        .from("sessions")
        .update({ status: "cerrada", closed_at: new Date().toISOString() })
        .eq("id", sesion.id);
      status = "cerrada";
    }
  }

  const esCreador = sesion.creator_id === user.id;
  const cerrada = status === "cerrada";
  const propuestaCierre = !cerrada && !!sesion.close_proposed_at;

  const { data: parts } = await supabase
    .from("participants")
    .select("id, user_id, display_name, role, status")
    .eq("session_id", id);
  const participantes = (parts ?? []) as Participante[];

  const { data: msgs } = await supabase
    .from("messages")
    .select("id, body, sender_id")
    .eq("session_id", id)
    .order("created_at", { ascending: true });
  const mensajes = (msgs ?? []) as Mensaje[];

  const nombrePorUsuario = new Map(
    participantes
      .filter((p) => p.user_id)
      .map((p) => [p.user_id as string, p.display_name]),
  );

  const proponente = sesion.close_proposed_by
    ? nombrePorUsuario.get(sesion.close_proposed_by) ?? "Alguien"
    : "Alguien";

  // Datos de reinvitación (solo para el creador)
  let declinaron: InvitacionVista[] = [];
  if (esCreador) {
    const { data: invs } = await supabase
      .from("invitations")
      .select("id, email, status, reinvite_count, last_sent_at, participant_id")
      .eq("session_id", id);

    const nombrePorParticipante = new Map(
      participantes.map((p) => [p.id, p.display_name]),
    );

    declinaron = (invs ?? [])
      .filter((iv) => iv.status === "declined")
      .map((iv) => {
        let puede = false;
        let desde: string | null = null;
        if ((iv.reinvite_count ?? 0) < 1) {
          if (!iv.last_sent_at) {
            puede = true;
          } else {
            const dias =
              (Date.now() - new Date(iv.last_sent_at).getTime()) / 86_400_000;
            if (dias >= 14) {
              puede = true;
            } else {
              const fecha = new Date(
                new Date(iv.last_sent_at).getTime() + 14 * 86_400_000,
              );
              desde = fecha.toLocaleDateString("es-AR", {
                day: "numeric",
                month: "short",
              });
            }
          }
        }
        return {
          id: iv.id,
          nombre: nombrePorParticipante.get(iv.participant_id) ?? iv.email,
          email: iv.email,
          status: iv.status,
          puedeReinvitar: puede,
          disponibleDesde: desde,
        };
      });
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[460px] flex-col px-5 py-6">
      <header>
        <Link href="/" className="text-sm text-muted transition hover:text-ink">
          ‹ Volver
        </Link>
        <p className="eyebrow mt-3">
          {participantes.length} personas{cerrada ? " · cerrada" : ""}
        </p>
        <h1 className="mt-1 text-xl font-bold tracking-tight text-brand">
          {sesion.topic}
        </h1>

        <details className="mt-3 border-b border-line pb-3">
          <summary className="cursor-pointer text-[13px] text-muted">
            Participantes y ajustes
          </summary>
          <div className="mt-3">
            {sesion.objective && (
              <p className="mb-3 text-[13px] leading-relaxed text-muted">
                “{sesion.objective}”
              </p>
            )}
            <ul className="flex flex-col gap-2.5">
              {participantes.map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  <Avatar nombre={p.display_name} size={28} />
                  <span className="text-sm font-medium text-ink">
                    {p.display_name}
                  </span>
                  <span className="ml-auto text-[11px] text-muted">
                    {estadoParticipante(p)}
                  </span>
                </li>
              ))}
            </ul>
            {esCreador && declinaron.length > 0 && (
              <Invitaciones invitaciones={declinaron} />
            )}
            {!cerrada && !propuestaCierre && (
              <Cierre sessionId={id} vista="proponer" />
            )}

            <Borrar sessionId={id} esCreador={esCreador} />
          </div>
        </details>
      </header>

      {/* Hilo de mensajes */}
      <div className="mt-6 flex flex-1 flex-col gap-3">
        {propuestaCierre && (
          <Cierre sessionId={id} vista="banner" proponente={proponente} />
        )}

        {mensajes.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted">
            Todavía no hay mensajes. Escribí el primero.
          </p>
        ) : (
          mensajes.map((m) => {
            const propio = m.sender_id === user.id;
            const de = nombrePorUsuario.get(m.sender_id) ?? "Alguien";
            return propio ? (
              <div key={m.id} className="flex flex-col items-end">
                <span className="msg-who pr-1">{de}</span>
                <div className="msg msg-me">{m.body}</div>
              </div>
            ) : (
              <div key={m.id} className="flex max-w-[88%] items-start gap-2">
                <Avatar nombre={de} size={28} />
                <div className="min-w-0">
                  <span className="msg-who">{de}</span>
                  <div className="msg msg-them">{m.body}</div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {cerrada ? (
        <div className="mt-4 rounded-xl border border-line bg-surface p-4 text-center">
          <p className="text-sm font-semibold text-ink">Conversación cerrada</p>
          <p className="mt-1 text-[13px] text-muted">
            Queda para leer. El resumen llega cuando conectemos la IA.
          </p>
        </div>
      ) : (
        <Escribir sessionId={id} />
      )}
    </main>
  );
}
