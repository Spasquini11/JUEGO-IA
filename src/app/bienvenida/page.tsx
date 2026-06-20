import Link from "next/link";

/*
  Pantalla de bienvenida / entrada (F11: bienvenida + consentimiento mínimo).
  Es lo primero que ve alguien: explica en simple qué es y qué pasa con lo que
  escribe, y entra al Home con un botón. El texto sale de PRIVACIDAD.md.
  Por ahora vive en /bienvenida; cuando haya login, será la puerta antes del Home.
*/

const PUNTOS = [
  "No es terapia ni la reemplaza.",
  "Cada persona tiene un asistente privado que la ayuda a expresarse. Eso es solo tuyo: nadie más ve esa ayuda.",
  "Los mensajes que publicás en la conversación los ven las otras personas de esa sesión.",
  "Guardamos tus conversaciones para que puedas volver. Podés borrar lo tuyo cuando quieras.",
  "No usamos tus conversaciones para entrenar inteligencia artificial.",
];

export default function BienvenidaPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[460px] flex-col justify-center px-5 py-10">
      {/* Marca */}
      <p className="text-center text-lg font-bold tracking-tight">
        <span className="text-brand">Entre</span>{" "}
        <span className="text-ink">Nosotros</span>
      </p>
      <h1 className="mt-3 text-center text-2xl font-bold leading-snug tracking-tight text-ink">
        Una conversación importante, con calma.
      </h1>

      {/* Puntos clave (consentimiento en simple) */}
      <ul className="mt-8 flex flex-col gap-3">
        {PUNTOS.map((p) => (
          <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
            />
            {p}
          </li>
        ))}
      </ul>

      {/* Edad */}
      <p className="mt-5 text-sm font-semibold text-ink">
        Solo para mayores de 18 años.
      </p>

      {/* Aviso de emergencia */}
      <p className="mt-4 rounded-xl bg-blush px-4 py-3 text-[12px] leading-relaxed text-brand">
        Si vos o alguien está en peligro, esto no es un servicio de emergencia: buscá
        ayuda profesional o comunicate con los servicios de emergencia de tu zona.
      </p>

      {/* Entrar */}
      <Link href="/" className="btn-primary mt-6 block">
        Entiendo y quiero entrar
      </Link>
    </main>
  );
}
