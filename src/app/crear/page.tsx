"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { crearSesion, type CrearResultado } from "./actions";

/*
  Pantalla 1: "Crear la conversación" (Épica 3, F1 real).
  Ahora SÍ guarda en la base (vía la acción de servidor crearSesion).
  Agregar/quitar personas sigue siendo del lado del navegador. La ayuda de IA
  para el objetivo todavía no hace nada (llega en la Épica 6).
*/

const MAX_INVITADOS = 4; // 1 a 4 invitados → entre 2 y 5 personas en total

export default function CrearConversacionPage() {
  const [filas, setFilas] = useState<number[]>([1]);
  const [estado, formAction, pending] = useActionState<CrearResultado, FormData>(
    crearSesion,
    {},
  );

  function agregar() {
    setFilas((f) => (f.length >= MAX_INVITADOS ? f : [...f, Date.now()]));
  }
  function quitar(id: number) {
    setFilas((f) => (f.length <= 1 ? f : f.filter((x) => x !== id)));
  }

  return (
    <main className="mx-auto w-full max-w-[460px] px-5 py-8 sm:py-12">
      <Link href="/" className="text-sm text-muted transition hover:text-ink">
        ‹ Volver
      </Link>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-brand">
        Nueva conversación
      </h1>

      <form action={formAction} className="mt-6">
        {/* Tu nombre (cómo te ven los demás) */}
        <label htmlFor="creador_nombre" className="campo-label">
          Tu nombre
        </label>
        <input
          id="creador_nombre"
          name="creador_nombre"
          type="text"
          required
          className="campo"
          placeholder="¿Cómo te van a ver los demás?"
        />

        {/* Tema */}
        <label htmlFor="tema" className="campo-label mt-5">
          Tema
        </label>
        <input
          id="tema"
          name="tema"
          type="text"
          required
          className="campo"
          placeholder="Ej.: Nuestra relación con la plata"
        />

        {/* Objetivo */}
        <label htmlFor="objetivo" className="campo-label mt-5">
          ¿Qué querés lograr?
        </label>
        <textarea
          id="objetivo"
          name="objetivo"
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
            {filas.map((id, i) => (
              <div key={id} className="flex items-center gap-2">
                <input
                  type="text"
                  name="inv_nombre"
                  className="campo flex-1"
                  placeholder="Nombre"
                  aria-label={`Nombre de la persona ${i + 1}`}
                />
                <input
                  type="email"
                  name="inv_email"
                  className="campo flex-1"
                  placeholder="Email"
                  aria-label={`Email de la persona ${i + 1}`}
                />
                {filas.length > 1 && (
                  <button
                    type="button"
                    className="quitar"
                    aria-label={`Quitar persona ${i + 1}`}
                    onClick={() => quitar(id)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {filas.length < MAX_INVITADOS && (
            <button type="button" className="agregar" onClick={agregar}>
              + Agregar persona
            </button>
          )}
          <p className="nota">Entre 2 y 5 personas en total</p>
        </fieldset>

        {/* Error (si lo hay) */}
        {estado?.error && (
          <p className="mt-4 rounded-lg bg-blush px-3 py-2 text-[13px] text-brand">
            {estado.error}
          </p>
        )}

        {/* Disclaimer */}
        <p className="mt-6 text-center text-[12px] italic text-muted">
          Esto no es terapia ni la reemplaza.
        </p>

        {/* Acción principal */}
        <button type="submit" className="btn-primary mt-2" disabled={pending}>
          {pending ? "Creando…" : "Crear e invitar"}
        </button>
      </form>
    </main>
  );
}
