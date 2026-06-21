import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import Respuesta from "./Respuesta";

/*
  Pantalla 2 real: "La invitación" (Épica 4).
  Trae los datos reales de la invitación a partir de su token (link del email).
  Usa el cliente admin porque el invitado puede no estar logueado todavía.
*/

function Centrado({
  titulo,
  texto,
  children,
}: {
  titulo: string;
  texto: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[460px] flex-col justify-center px-5 py-10 text-center">
      <h1 className="text-xl font-bold text-ink">{titulo}</h1>
      <p className="mt-2 text-sm text-muted">{texto}</p>
      {children}
    </main>
  );
}

export default async function InvitacionTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const admin = getSupabaseAdmin();

  const { data: inv } = await admin
    .from("invitations")
    .select("id, status, email, session_id, participant_id")
    .eq("token", token)
    .maybeSingle();

  if (!inv) {
    return (
      <Centrado
        titulo="Invitación no encontrada"
        texto="El link no es válido o ya no existe."
      />
    );
  }

  const { data: sesion } = await admin
    .from("sessions")
    .select("topic, objective, creator_id")
    .eq("id", inv.session_id)
    .single();
  const { data: parti } = await admin
    .from("participants")
    .select("display_name")
    .eq("id", inv.participant_id)
    .maybeSingle();
  const { data: creador } = await admin
    .from("profiles")
    .select("display_name")
    .eq("id", sesion?.creator_id ?? "")
    .maybeSingle();

  const creadorNombre = creador?.display_name ?? "Alguien";
  const tema = sesion?.topic ?? "";
  const objetivo = sesion?.objective ?? "";

  if (inv.status === "accepted") {
    return (
      <Centrado
        titulo="Ya estás en esta conversación"
        texto={`Aceptaste la invitación de ${creadorNombre}.`}
      >
        <Link href="/" className="btn-primary mt-6 block">
          Ir a tus conversaciones
        </Link>
      </Centrado>
    );
  }

  if (inv.status === "declined") {
    return (
      <Centrado
        titulo="Declinaste esta invitación"
        texto="Gracias por avisar. Está todo bien."
      />
    );
  }

  return (
    <main className="mx-auto w-full max-w-[460px] px-5 py-8 sm:py-12">
      <p className="eyebrow">Te invitaron</p>
      <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-brand">
        {creadorNombre} te invitó a conversar
      </h1>

      <div className="card mt-5">
        <p className="card-tema">{tema}</p>
        {objetivo && <p className="card-obj">“{objetivo}”</p>}
      </div>
      <p className="nota">Un espacio para tener una charla importante, con calma.</p>

      <Respuesta token={token} nombreInicial={parti?.display_name ?? ""} />

      <p className="nota">
        Entrás con un link, sin crear contraseña · Solo mayores de 18
      </p>
    </main>
  );
}
