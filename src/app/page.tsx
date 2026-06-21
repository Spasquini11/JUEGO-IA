import Link from "next/link";
import { redirect } from "next/navigation";
import Avatar from "@/components/Avatar";
import { createSupabaseServer } from "@/lib/supabase/server";
import { tiempoRelativo } from "@/lib/fecha";

/*
  Home: "Tus conversaciones".
  Pantalla principal. Requiere estar logueado. Muestra las conversaciones reales
  de la persona (las que creó o donde participa), traídas de la base de datos.
*/

type SesionRow = {
  id: string;
  topic: string;
  status: string;
  created_at: string;
  participants: { display_name: string }[];
};

function etiquetaEstado(status: string) {
  if (status === "activa") return { label: "Activa", cls: "bg-blush text-brand" };
  if (status === "no_iniciada")
    return { label: "Sin iniciar", cls: "bg-field text-muted" };
  if (status === "cerrada") return { label: "Cerrada", cls: "bg-field text-muted" };
  return { label: status, cls: "bg-field text-muted" };
}

function TarjetaConversacion({ s }: { s: SesionRow }) {
  const estado = etiquetaEstado(s.status);
  const nombres = s.participants?.map((p) => p.display_name) ?? [];

  return (
    <Link
      href="/conversacion"
      aria-label={`Conversación: ${s.topic}. ${estado.label}. Con ${nombres.join(", ")}.`}
      className="group block rounded-2xl border border-line bg-surface p-4 shadow-[0_2px_12px_rgba(100,28,52,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(100,28,52,0.10)]"
    >
      <h3 className="font-semibold leading-snug text-ink">{s.topic}</h3>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex -space-x-2" aria-hidden="true">
          {nombres.map((n, i) => (
            <Avatar key={`${n}-${i}`} nombre={n} />
          ))}
        </div>
        <span className="flex shrink-0 items-center gap-2 text-[11px] text-muted">
          <span className={`rounded-full px-2 py-0.5 font-semibold ${estado.cls}`}>
            {estado.label}
          </span>
          {tiempoRelativo(s.created_at)}
        </span>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/ingresar");

  const { data } = await supabase
    .from("sessions")
    .select("id, topic, status, created_at, participants(display_name)")
    .order("created_at", { ascending: false });

  const sesiones = (data ?? []) as SesionRow[];
  const enCurso = sesiones.filter(
    (s) => s.status === "activa" || s.status === "no_iniciada",
  );
  const cerradas = sesiones.filter((s) => s.status === "cerrada");
  const vacio = sesiones.length === 0;

  return (
    <main className="mx-auto w-full max-w-[560px] px-5 py-8 sm:py-12">
      {/* Barra superior: marca + salir */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold tracking-tight">
          <span className="text-brand">Entre</span>{" "}
          <span className="text-ink">Nosotros</span>
        </p>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="text-xs text-muted transition hover:text-ink"
          >
            Salir
          </button>
        </form>
      </div>

      {/* Encabezado + acción principal */}
      <div className="mt-6 flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">
            Tus conversaciones
          </h1>
          <p className="mt-1 text-sm text-muted">
            Las charlas importantes, en un solo lugar.
          </p>
        </div>
        <Link
          href="/crear"
          className="shrink-0 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent shadow-[0_2px_10px_rgba(100,28,52,0.18)] transition hover:opacity-90"
        >
          + Nueva
        </Link>
      </div>

      {vacio ? (
        <div className="mt-12 rounded-2xl border border-dashed border-blush-2 bg-surface p-8 text-center">
          <p className="text-base font-semibold text-ink">
            Todavía no tenés conversaciones
          </p>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
            Cuando quieras tener una charla importante con calma, empezás acá.
          </p>
          <Link
            href="/crear"
            className="mt-5 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent"
          >
            Crear la primera
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-7">
          {enCurso.length > 0 && (
            <section>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">
                En curso
              </h2>
              <div className="flex flex-col gap-3">
                {enCurso.map((s) => (
                  <TarjetaConversacion key={s.id} s={s} />
                ))}
              </div>
            </section>
          )}

          {cerradas.length > 0 && (
            <section>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">
                Cerradas
              </h2>
              <div className="flex flex-col gap-3">
                {cerradas.map((s) => (
                  <TarjetaConversacion key={s.id} s={s} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
