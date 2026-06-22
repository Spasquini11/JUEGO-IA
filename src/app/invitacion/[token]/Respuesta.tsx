"use client";

import { useState, useTransition } from "react";
import {
  aceptarInvitacion,
  declinarInvitacion,
  proponerAjuste,
} from "./actions";

/*
  Botonera de respuesta a una invitación (Épica 4):
  confirmar nombre, aceptar, proponer un ajuste al objetivo, o declinar.
*/
export default function Respuesta({
  token,
  nombreInicial,
}: {
  token: string;
  nombreInicial: string;
}) {
  const [nombre, setNombre] = useState(nombreInicial);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [modo, setModo] = useState<"acciones" | "proponer" | "enviada">(
    "acciones",
  );
  const [pending, startTransition] = useTransition();

  function aceptar() {
    setError("");
    startTransition(async () => {
      const r = await aceptarInvitacion(token, nombre);
      if (r?.error) setError(r.error);
    });
  }

  function declinar() {
    setError("");
    startTransition(async () => {
      const r = await declinarInvitacion(token);
      if (r?.error) setError(r.error);
    });
  }

  function enviarPropuesta() {
    setError("");
    startTransition(async () => {
      const r = await proponerAjuste(token, mensaje);
      if (r?.error) setError(r.error);
      else setModo("enviada");
    });
  }

  if (modo === "enviada") {
    return (
      <div className="mt-6 rounded-xl bg-blush px-4 py-3 text-sm leading-relaxed text-ink">
        Listo: le enviamos tu propuesta a quien te invitó. Cuando ajuste el
        objetivo, vas a poder aceptar desde este mismo link.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <label htmlFor="nombre" className="campo-label">
        Confirmá tu nombre
      </label>
      <input
        id="nombre"
        type="text"
        className="campo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre…"
      />
      <p className="nota">Es el nombre con el que te van a ver los demás.</p>

      {error && (
        <p className="mt-3 rounded-lg bg-blush px-3 py-2 text-[13px] text-brand">
          {error}
        </p>
      )}

      {modo === "proponer" ? (
        <div className="mt-4">
          <label htmlFor="propuesta" className="campo-label">
            ¿Qué ajustarías del objetivo?
          </label>
          <textarea
            id="propuesta"
            rows={3}
            className="campo resize-y"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Contale a quien te invitó qué cambiarías…"
          />
          <div className="mt-3 flex flex-col gap-2.5">
            <button
              type="button"
              className="btn-primary"
              onClick={enviarPropuesta}
              disabled={pending}
            >
              {pending ? "Enviando…" : "Enviar propuesta"}
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setModo("acciones")}
              disabled={pending}
            >
              Volver
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-2.5">
          <button
            type="button"
            className="btn-primary"
            onClick={aceptar}
            disabled={pending}
          >
            {pending ? "Un momento…" : "Aceptar"}
          </button>
          <button
            type="button"
            className="btn-outline"
            onClick={() => {
              setError("");
              setModo("proponer");
            }}
            disabled={pending}
          >
            Proponer un ajuste al objetivo
          </button>
          <button
            type="button"
            className="btn-ghost"
            onClick={declinar}
            disabled={pending}
          >
            Declinar
          </button>
        </div>
      )}
    </div>
  );
}
