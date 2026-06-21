"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

/*
  Pantalla de ingreso (Épica 2): login por link mágico, sin contraseña.
  La persona pone su email y le mandamos un link para entrar.
*/
export default function IngresarPage() {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"idle" | "enviando" | "enviado" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setEstado("enviando");
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setErrorMsg(error.message);
      setEstado("error");
    } else {
      setEstado("enviado");
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col justify-center px-5 py-10">
      <p className="text-center text-lg font-bold tracking-tight">
        <span className="text-brand">Entre</span>{" "}
        <span className="text-ink">Nosotros</span>
      </p>

      {estado === "enviado" ? (
        <div className="mt-8 text-center">
          <h1 className="text-xl font-bold text-ink">Revisá tu correo</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Te enviamos un link a{" "}
            <span className="font-semibold text-ink">{email}</span>. Abrilo desde
            este mismo dispositivo para entrar. Podés cerrar esta pestaña.
          </p>
        </div>
      ) : (
        <>
          <h1 className="mt-8 text-center text-xl font-bold text-ink">
            Entrá con tu email
          </h1>
          <p className="mt-2 text-center text-sm text-muted">
            Sin contraseñas: te mandamos un link mágico para entrar.
          </p>

          <form onSubmit={enviar} className="mt-6">
            <label htmlFor="email" className="campo-label">
              Tu email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              className="campo"
              placeholder="vos@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {estado === "error" && (
              <p className="nota" style={{ color: "var(--brand)" }}>
                No se pudo enviar: {errorMsg}
              </p>
            )}
            <button
              type="submit"
              className="btn-primary mt-4"
              disabled={estado === "enviando"}
            >
              {estado === "enviando" ? "Enviando…" : "Enviame el link"}
            </button>
          </form>

          <p className="nota text-center">Solo para mayores de 18 años.</p>
        </>
      )}
    </main>
  );
}
