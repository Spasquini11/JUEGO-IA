"use client";

import { useTransition } from "react";
import {
  proponerCierre,
  confirmarCierre,
  seguirConversando,
} from "./actions";

/*
  Controles de cierre de la conversación (Épica 10).
  - vista "proponer": botón para proponer cerrar (cualquier participante).
  - vista "banner": aviso de que alguien propuso cerrar + confirmar / seguir.
*/
export default function Cierre({
  sessionId,
  vista,
  proponente,
}: {
  sessionId: string;
  vista: "proponer" | "banner";
  proponente?: string;
}) {
  const [pending, start] = useTransition();

  if (vista === "proponer") {
    return (
      <button
        type="button"
        className="mt-4 text-[13px] font-semibold text-brand disabled:opacity-50"
        onClick={() => start(() => proponerCierre(sessionId))}
        disabled={pending}
      >
        Proponer cerrar la conversación
      </button>
    );
  }

  return (
    <div className="mb-4 rounded-xl bg-blush px-4 py-3">
      <p className="text-sm leading-relaxed text-ink">
        <span className="font-semibold text-brand">{proponente}</span> propuso
        cerrar. Si nadie objeta, se cierra sola en 7 días.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="rounded-lg bg-accent px-3 py-2 text-[13px] font-semibold text-on-accent disabled:opacity-50"
          onClick={() => start(() => confirmarCierre(sessionId))}
          disabled={pending}
        >
          Confirmar cierre
        </button>
        <button
          type="button"
          className="rounded-lg px-3 py-2 text-[13px] font-semibold text-muted disabled:opacity-50"
          onClick={() => start(() => seguirConversando(sessionId))}
          disabled={pending}
        >
          Seguir conversando
        </button>
      </div>
    </div>
  );
}
