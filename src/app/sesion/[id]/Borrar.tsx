"use client";

import { useState, useTransition } from "react";
import { borrarMisMensajes, borrarSesion } from "./actions";

/*
  Borrado real (Épica 11): borrar tus mensajes, o (si sos el creador) la
  conversación entera. Siempre con un paso de confirmación, porque no se deshace.
*/
export default function Borrar({
  sessionId,
  esCreador,
}: {
  sessionId: string;
  esCreador: boolean;
}) {
  const [pending, start] = useTransition();
  const [confirmar, setConfirmar] = useState<null | "mensajes" | "sesion">(null);

  return (
    <div className="mt-5 border-t border-line pt-4">
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
        Privacidad
      </p>

      <div className="mt-2 flex flex-col items-start gap-3">
        {confirmar === "mensajes" ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[12px] text-ink">
              ¿Borrar tus mensajes? No se puede deshacer.
            </span>
            <button
              type="button"
              className="text-[12px] font-semibold text-brand disabled:opacity-50"
              onClick={() => start(() => borrarMisMensajes(sessionId))}
              disabled={pending}
            >
              Sí, borrar
            </button>
            <button
              type="button"
              className="text-[12px] text-muted"
              onClick={() => setConfirmar(null)}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="text-[12px] font-semibold text-brand"
            onClick={() => setConfirmar("mensajes")}
          >
            Borrar mis mensajes
          </button>
        )}

        {esCreador &&
          (confirmar === "sesion" ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] text-ink">
                ¿Borrar toda la conversación? No se puede deshacer.
              </span>
              <button
                type="button"
                className="text-[12px] font-semibold text-brand disabled:opacity-50"
                onClick={() => start(() => borrarSesion(sessionId))}
                disabled={pending}
              >
                Sí, borrar todo
              </button>
              <button
                type="button"
                className="text-[12px] text-muted"
                onClick={() => setConfirmar(null)}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="text-[12px] font-semibold text-brand"
              onClick={() => setConfirmar("sesion")}
            >
              Borrar la conversación entera
            </button>
          ))}
      </div>
    </div>
  );
}
