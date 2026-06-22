import Link from "next/link";
import { redirect } from "next/navigation";
import Avatar from "@/components/Avatar";
import { createSupabaseServer } from "@/lib/supabase/server";
import Invitaciones, { type InvitacionVista } from "./Invitaciones";

/*
  Vista de una sesión (Épica 4 + base de la Épica 5).
  Muestra el tema, el objetivo y los participantes con su estado. Si quien mira es
  el creador, ve a quién declinó y puede reinvitar (con la regla de 14 días).
  El hilo de mensajes (escribir/leer) llega en la Épica 5.
*/

type Participante = {
  id: string;
  display_name: string;
  role: string;
  status: string;
};

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
    .select("id, topic, objective, status, creator_id")
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

  const esCreador = sesion.creator_id === user.id;

  const { data: parts } = await supabase
    .from("participants")
    .select("id, display_name, role, status")
    .eq("session_id", id);
  const participantes = (parts ?? []) as Participante[];

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
    <main className="mx-auto w-full max-w-[460px] px-5 py-8 sm:py-12">
      <Link href="/" className="text-sm text-muted transition hover:text-ink">
        ‹ Volver
      </Link>

      <p className="eyebrow mt-3">{participantes.length} personas</p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight text-brand">
        {sesion.topic}
      </h1>
      {sesion.objective && (
        <p className="mt-2 text-sm leading-relaxed text-muted">
          “{sesion.objective}”
        </p>
      )}

      <h2 className="mt-7 text-xs font-bold uppercase tracking-wider text-muted">
        Participantes
      </h2>
      <ul className="mt-3 flex flex-col gap-2.5">
        {participantes.map((p) => (
          <li key={p.id} className="flex items-center gap-3">
            <Avatar nombre={p.display_name} />
            <span className="text-sm font-medium text-ink">{p.display_name}</span>
            <span className="ml-auto text-[11px] text-muted">
              {estadoParticipante(p)}
            </span>
          </li>
        ))}
      </ul>

      {esCreador && declinaron.length > 0 && (
        <Invitaciones invitaciones={declinaron} />
      )}

      <div className="mt-8 rounded-2xl border border-dashed border-blush-2 bg-surface p-6 text-center">
        <p className="text-sm font-semibold text-ink">
          El hilo de la conversación llega en el próximo paso
        </p>
        <p className="mt-1 text-[13px] text-muted">
          Acá vas a poder escribir y leer los mensajes.
        </p>
      </div>
    </main>
  );
}
