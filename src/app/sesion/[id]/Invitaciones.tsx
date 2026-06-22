"use client";

import { useState, useTransition } from "react";
import { reinvitar } from "./actions";

export type InvitacionVista = {
  id: string;
  nombre: string;
  email: string;
  status: string;
  puedeReinvitar: boolean;
  disponibleDesde: string | null;
};

/*
  Lista de personas que declinaron, con el botón de reinvitar cuando corresponde.
  (La regla 1-vez-tras-14-días la valida el servidor en reinvitar().)
*/
export default function Invitaciones({
  invitaciones,
}: {
  invitaciones: InvitacionVista[];
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [reinvitados, setReinvitados] = useState<string[]>([]);

  function hacer(id: string) {
    setError("");
    startTransition(async () => {
      const r = await reinvitar(id);
      if (r?.error) setError(r.error);
      else setReinvitados((x) => [...x, id]);
    });
  }

  return (
    <div className="mt-7">
      <h2 className="text-xs font-bold uppercase tracking-wider text-muted">
        Declinaron
      </h2>
      {error && (
        <p className="mt-2 rounded-lg bg-blush px-3 py-2 text-[13px] text-brand">
          {error}
        </p>
      )}
      <ul className="mt-3 flex flex-col gap-2.5">
        {invitaciones.map((iv) => (
          <li key={iv.id} className="flex items-center gap-3">
            <span className="text-sm text-ink">{iv.nombre}</span>
            <span className="ml-auto">
              {reinvitados.includes(iv.id) ? (
                <span className="text-[11px] text-muted">Reinvitado/a</span>
              ) : iv.puedeReinvitar ? (
                <button
                  type="button"
                  className="text-[12px] font-semibold text-brand disabled:opacity-50"
                  onClick={() => hacer(iv.id)}
                  disabled={pending}
                >
                  Reinvitar
                </button>
              ) : (
                <span className="text-[11px] text-muted">
                  {iv.disponibleDesde
                    ? `Podés reinvitar desde el ${iv.disponibleDesde}`
                    : "Ya reinvitado/a"}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
