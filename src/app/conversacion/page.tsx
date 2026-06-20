"use client";

import { useState } from "react";

/*
  Pantalla 3 del boceto: "La conversación + el coach privado".
  Estática por ahora: los mensajes son de ejemplo. Lo único que funciona es
  abrir/cerrar el panel del coach con el botón "🔒 Coach". Los chips del coach y
  el envío de mensajes todavía no hacen nada.

  Decisión de diseño (era una duda abierta del boceto): el panel del coach NO está
  fijo abajo; se abre con el botón cuando la persona lo necesita y se cierra igual.
  Es lo más simple y refuerza que el coach es algo opcional que invocás vos.
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
      {/* Encabezado: cantidad de personas + tema */}
      <header>
        <p className="eyebrow">3 personas</p>
        <h1 className="mt-1 text-xl font-bold tracking-tight text-brand">
          Nuestra relación con la plata
        </h1>
      </header>

      {/* Hilo de mensajes (ocupa el espacio del medio) */}
      <div className="mt-6 flex flex-1 flex-col gap-2.5">
        {MENSAJES.map((m, i) => (
          <div key={i} className={m.propio ? "msg msg-me" : "msg msg-them"}>
            <p className="msg-who">{m.de}</p>
            {m.texto}
          </div>
        ))}
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
