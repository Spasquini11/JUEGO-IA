"use client";

import { useState } from "react";

/*
  Pantalla 1 del boceto: "Crear la conversación".
  Por ahora es ESTÁTICA: el formulario todavía no guarda nada en base de datos
  y los botones de IA / crear aún no hacen nada. Lo único que ya funciona es
  agregar y quitar personas a invitar, para que la pantalla se pueda probar.
*/

type Invitado = { id: number; nombre: string; email: string };

const MAX_INVITADOS = 4; // 1 a 4 invitados → entre 2 y 5 personas en total

export default function CrearConversacionPage() {
  const [invitados, setInvitados] = useState<Invitado[]>([
    { id: 1, nombre: "", email: "" },
  ]);

  function agregarPersona() {
    setInvitados((prev) =>
      prev.length >= MAX_INVITADOS
        ? prev
        : [...prev, { id: Date.now(), nombre: "", email: "" }],
    );
  }

  function quitarPersona(id: number) {
    setInvitados((prev) =>
      prev.length <= 1 ? prev : prev.filter((p) => p.id !== id),
    );
  }

  function actualizar(id: number, campo: "nombre" | "email", valor: string) {
    setInvitados((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [campo]: valor } : p)),
    );
  }

  return (
    <main className="mx-auto w-full max-w-[460px] px-5 py-8 sm:py-12">
      <h1 className="text-2xl font-bold tracking-tight text-brand">
        Nueva conversación
      </h1>

      <form className="mt-7" onSubmit={(e) => e.preventDefault()}>
        {/* Tema */}
        <label htmlFor="tema" className="campo-label">
          Tema
        </label>
        <input
          id="tema"
          type="text"
          className="campo"
          placeholder="Ej.: Nuestra relación con la plata"
        />

        {/* Objetivo */}
        <label htmlFor="objetivo" className="campo-label mt-5">
          ¿Qué querés lograr?
        </label>
        <textarea
          id="objetivo"
          rows={4}
          className="campo resize-y"
          placeholder="Escribí el objetivo en tus palabras…"
        />
        <button type="button" className="btn-outline mt-3">
          ✦ Ayudame a clarificar el objetivo
        </button>
        <p className="nota">Opcional · la IA te ayuda a redactarlo</p>

        {/* A quién invita */}
        <fieldset className="mt-6 border-0 p-0">
          <legend className="campo-label">¿A quién invitás?</legend>

          <div className="flex flex-col gap-2">
            {invitados.map((inv, i) => (
              <div key={inv.id} className="flex items-center gap-2">
                <input
                  type="text"
                  className="campo flex-1"
                  placeholder="Nombre"
                  aria-label={`Nombre de la persona ${i + 1}`}
                  value={inv.nombre}
                  onChange={(e) => actualizar(inv.id, "nombre", e.target.value)}
                />
                <input
                  type="email"
                  className="campo flex-1"
                  placeholder="Email"
                  aria-label={`Email de la persona ${i + 1}`}
                  value={inv.email}
                  onChange={(e) => actualizar(inv.id, "email", e.target.value)}
                />
                {invitados.length > 1 && (
                  <button
                    type="button"
                    className="quitar"
                    aria-label={`Quitar persona ${i + 1}`}
                    onClick={() => quitarPersona(inv.id)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {invitados.length < MAX_INVITADOS && (
            <button type="button" className="agregar" onClick={agregarPersona}>
              + Agregar persona
            </button>
          )}
          <p className="nota">Entre 2 y 5 personas en total</p>
        </fieldset>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-[12px] italic text-muted">
          Esto no es terapia ni la reemplaza.
        </p>

        {/* Acción principal */}
        <button type="submit" className="btn-primary mt-2">
          Crear e invitar
        </button>
      </form>
    </main>
  );
}
