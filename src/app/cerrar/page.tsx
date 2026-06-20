"use client";

import { useState } from "react";
import Link from "next/link";

/*
  Pantalla 4 del boceto: "Cerrar y resumen".
  Estática por ahora, pero con el flujo real: primero se ve que alguien propuso
  cerrar; al "Confirmar cierre" aparece el resumen (un borrador opcional).

  Regla clave del producto: el resumen DESCRIBE lo que se dijo, no interpreta ni
  saca conclusiones. Es un borrador que una persona aprueba antes de compartir.
*/

const RESUMEN = [
  {
    titulo: "De qué se habló",
    detalle:
      "Cómo manejan la plata en casa y lo difícil de no saber cuánto queda a fin de mes.",
  },
  {
    titulo: "Qué quedó pendiente",
    detalle: "Definir quién mira las cuentas cada mes.",
  },
  {
    titulo: "Qué planteó cada uno",
    detalle:
      "Tania: la falta de previsibilidad. Vos: que evitás mirar la cuenta. Mamá: que creció sin nada y por eso le cuesta gastar.",
  },
];

export default function CerrarPage() {
  const [cerrada, setCerrada] = useState(false);

  return (
    <main className="mx-auto w-full max-w-[460px] px-5 py-8 sm:py-12">
      <Link
        href="/conversacion"
        className="text-sm text-muted transition hover:text-ink"
      >
        ‹ Volver
      </Link>

      <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink">
        Cerrar la conversación
      </h1>

      {!cerrada ? (
        <div className="mt-6">
          <div className="card">
            <p className="text-sm leading-relaxed text-ink">
              <span className="font-semibold text-brand">Tania</span> propuso
              cerrar. Esperando que confirmen los demás.
            </p>
          </div>
          <p className="nota">Si nadie objeta, se cierra sola en 7 días.</p>

          <button
            type="button"
            className="btn-primary mt-4"
            onClick={() => setCerrada(true)}
          >
            Confirmar cierre
          </button>
          <Link href="/conversacion" className="btn-outline mt-2 block">
            Seguir conversando
          </Link>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-sm text-muted">
            La conversación quedó cerrada. Si querés, generá un resumen.
          </p>

          <div className="mt-4 rounded-2xl border border-line bg-surface p-4 shadow-[0_2px_12px_rgba(100,28,52,0.05)]">
            <p className="text-[15px] font-bold text-brand">Resumen</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
              Ordena y condensa lo que se dijo. No interpreta ni saca conclusiones.
            </p>

            <ul className="mt-3 flex flex-col gap-3">
              {RESUMEN.map((r) => (
                <li key={r.titulo}>
                  <p className="text-[12px] font-semibold text-ink">
                    {r.titulo}
                  </p>
                  <p className="text-[13px] leading-relaxed text-muted">
                    {r.detalle}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-4 rounded-lg border border-blush-2 bg-blush px-3 py-2 text-[11px] italic text-brand-2">
              Borrador. Puede tener errores. Revisalo antes de compartir.
            </p>
          </div>

          <button type="button" className="btn-primary mt-4">
            Compartir resumen
          </button>
          {/* Para la demo, "Descartar" vuelve al estado anterior */}
          <button
            type="button"
            className="btn-ghost mt-1"
            onClick={() => setCerrada(false)}
          >
            Descartar
          </button>
        </div>
      )}
    </main>
  );
}
