"use client";

import { useState, useTransition } from "react";
import { enviarMensaje } from "./actions";

/*
  Barra para escribir un mensaje en el hilo (Épica 5).
  (El botón del coach privado se suma en la Épica 6.)
*/
export default function Escribir({ sessionId }: { sessionId: string }) {
  const [texto, setTexto] = useState("");
  const [pending, startTransition] = useTransition();

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const t = texto.trim();
    if (!t) return;
    startTransition(async () => {
      const r = await enviarMensaje(sessionId, t);
      if (!r?.error) setTexto("");
    });
  }

  return (
    <form onSubmit={enviar} className="writebar mt-4">
      <input
        type="text"
        className="campo"
        placeholder="Escribí tu mensaje…"
        aria-label="Escribí tu mensaje"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button type="submit" className="coach-btn" disabled={pending}>
        {pending ? "…" : "Enviar"}
      </button>
    </form>
  );
}
