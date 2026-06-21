import Link from "next/link";
import { redirect } from "next/navigation";
import Avatar from "@/components/Avatar";
import { createSupabaseServer } from "@/lib/supabase/server";

/*
  Home: "Tus conversaciones".
  Pantalla principal de la app. Requiere estar logueado (si no, manda a /ingresar).
  Por ahora la lista es de ejemplo; los datos reales llegan en la épica F10.
*/

type Estado = "activa" | "cerrada";

type Conversacion = {
  id: string;
  tema: string;
  estado: Estado;
  cuando: string;
  personas: string[];
  novedad?: boolean;
};

const CONVERSACIONES: Conversacion[] = [
  {
    id: "1",
    tema: "Nuestra relación con la plata",
    estado: "activa",
    cuando: "hace 2 días",
    personas: ["Tania", "Vos", "Mamá"],
    novedad: true,
  },
  {
    id: "2",
    tema: "Cómo nos repartimos las cosas de la casa",
    estado: "activa",
    cuando: "hace 1 semana",
    personas: ["Javier", "Vos"],
  },
  {
    id: "3",
    tema: "La herencia de la abuela",
    estado: "cerrada",
    cuando: "en marzo",
    personas: ["Vos", "Lucía", "Mamá", "Tío Beto"],
  },
];

function TarjetaConversacion({ c }: { c: Conversacion }) {
  return (
    <Link
      href="/conversacion"
      aria-label={`Conversación: ${c.tema}. ${
        c.estado === "activa" ? "Activa" : "Cerrada"
      }. Con ${c.personas.join(", ")}.`}
      className="group block rounded-2xl border border-line bg-surface p-4 shadow-[0_2px_12px_rgba(100,28,52,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(100,28,52,0.10)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold leading-snug text-ink">{c.tema}</h3>
        {c.novedad && (
          <span className="mt-0.5 shrink-0 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-on-accent">
            Nuevo
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex -space-x-2" aria-hidden="true">
          {c.personas.map((p) => (
            <Avatar key={p} nombre={p} />
          ))}
        </div>
        <span className="flex shrink-0 items-center gap-2 text-[11px] text-muted">
          <span
            className={
              c.estado === "activa"
                ? "rounded-full bg-blush px-2 py-0.5 font-semibold text-brand"
                : "rounded-full bg-field px-2 py-0.5 font-semibold text-muted"
            }
          >
            {c.estado === "activa" ? "Activa" : "Cerrada"}
          </span>
          {c.cuando}
        </span>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  // Requiere sesión: si no hay usuario, va a la pantalla de ingreso.
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/ingresar");

  const activas = CONVERSACIONES.filter((c) => c.estado === "activa");
  const cerradas = CONVERSACIONES.filter((c) => c.estado === "cerrada");
  const vacio = CONVERSACIONES.length === 0;

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
          {activas.length > 0 && (
            <section>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">
                Activas
              </h2>
              <div className="flex flex-col gap-3">
                {activas.map((c) => (
                  <TarjetaConversacion key={c.id} c={c} />
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
                {cerradas.map((c) => (
                  <TarjetaConversacion key={c.id} c={c} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
