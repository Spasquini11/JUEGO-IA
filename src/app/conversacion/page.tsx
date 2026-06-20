"use client";

import { useState } from "react";
import Link from "next/link";
import Avatar from "@/components/Avatar";

/*
  Pantalla 3 del boceto: "La conversación + el coach privado".
  Estática por ahora: los mensajes son de ejemplo. Lo único que funciona es
  abrir/cerrar el panel del coach con el botón "🔒 Coach".

  Cada mensaje de otra persona muestra su avatar con color e iniciales propias,
  para distinguir de un vistazo quién habla (aunque haya varias personas). Los
  mensajes propios van a la derecha.

  Decisión de diseño (era una duda abierta del boceto): el panel del coach NO está
  fijo abajo; se abre con el botón cuando la persona lo necesita y se cierra igual.
*/

type Mensaje = { de: string; texto: string; propio: boolean };

// Mensajes de ejemplo (después vendrán del hilo real de la sesión)
const MENSAJES: Mensaje[] = [
  {
    de: "Tania",
    texto: "Para mí lo más difícil es que nunca sé cuánto nos queda a fin de mes.",
    propio: false,
  },
  {
    de: "Vos",
    texto: "Te entiendo. A mí me pasa que evito mirar la cuenta…",
    propio: true,
  },
  {
    de: "Mamá",
    texto: "Yo crecí sin nada, por eso me cuesta gastar.",
    propio: false,
  },
];

const ACCIONES_COACH = [
  "Ayudame a responder",
  "Suavizar",
  "Más directo",
  "Profundizar",
  "Entender al otro",
  "Ver temas sin explorar",
];

export default function ConversacionPage() {
  const [coachAbierto, setCoachAbierto] = useState(false);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[460px] flex-col px-5 py-6">
      {/* Volver al Home */}
      <Link href="/" className="text-sm text-muted transition hover:text-ink">
        ‹ Volver
      </Link>

      {/* Encabezado: cantidad de personas + tema */}
      <header className="mt-3">
        <p className="eyebrow">3 personas</p>
        <h1 className="mt-1 text-xl font-bold tracking-tight text-ink">
          Nuestra relación con la plata
        </h1>
      </header>

      {/* Hilo de mensajes (ocupa el espacio del medio) */}
      <div className="mt-6 flex flex-1 flex-col gap-3">
        {MENSAJES.map((m, i) =>
          m.propio ? (
            <div key={i} className="flex flex-col items-end">
              <span className="msg-who pr-1">{m.de}</span>
              <div className="msg msg-me">{m.texto}</div>
            </div>
          ) : (
            <div key={i} className="flex max-w-[88%] items-start gap-2">
              <Avatar nombre={m.de} size={28} />
              <div className="min-w-0">
                <span className="msg-who">{m.de}</span>
                <div className="msg msg-them">{m.texto}</div>
              </div>
            </div>
          ),
        )}
      </div>

      {/* Barra para escribir */}
      <div className="writebar mt-5">
        <input
          type="text"
          className="campo"
          placeholder="Escribí tu mensaje…"
          aria-label="Escribí tu mensaje"
        />
        <button
          type="button"
          className="coach-btn"
          aria-expanded={coachAbierto}
          onClick={() => setCoachAbierto((v) => !v)}
        >
          🔒 Coach
        </button>
      </div>

      {/* Panel del coach, privado: aparece solo al apretar el botón */}
      {coachAbierto && (
        <section className="coach mt-3" aria-label="Coach privado">
          <p className="coach-ct">🔒 Coach privado — solo vos</p>
          <div className="chips">
            {ACCIONES_COACH.map((accion) => (
              <button key={accion} type="button" className="chip">
                {accion}
              </button>
            ))}
          </div>
          <p className="coach-priv">
            Solo vos ves esto. No se marca en la conversación.
          </p>
        </section>
      )}
    </main>
  );
}
