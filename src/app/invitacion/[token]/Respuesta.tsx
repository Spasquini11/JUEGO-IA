"use client";

import { useState, useTransition } from "react";
import { aceptarInvitacion, declinarInvitacion } from "./actions";

/*
  Botonera de respuesta a una invitación: confirmar nombre, aceptar o declinar.
  (Proponer un ajuste al objetivo se suma en el próximo paso.)
*/
export default function Respuesta({
  token,
  nombreInicial,
}: {
  token: string;
  nombreInicial: string;
}) {
  const [nombre, setNombre] = useState(nombreInicial);
  const [error, setError] = useState("");
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
          className="btn-ghost"
          onClick={declinar}
          disabled={pending}
        >
          Declinar
        </button>
      </div>
    </div>
  );
}
