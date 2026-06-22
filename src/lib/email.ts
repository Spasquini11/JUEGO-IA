import { Resend } from "resend";

/*
  Envío de emails con Resend (Épica 4).
  Mientras no tengamos un dominio propio verificado, Resend solo entrega al email
  de la cuenta; alcanza para probar. El remitente "onboarding@resend.dev" es el de
  prueba de Resend.
*/

const FROM = "Entre Nosotros <onboarding@resend.dev>";

function escaparHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function enviarInvitacion(opts: {
  para: string;
  creadorNombre: string;
  tema: string;
  link: string;
}): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY no configurada; no se envió la invitación.");
    return { ok: false };
  }

  const resend = new Resend(apiKey);
  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:480px;margin:0 auto;color:#2a2326">
    <p style="font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#8a3550;font-weight:600;margin:0 0 8px">Te invitaron</p>
    <h1 style="font-size:20px;color:#641c34;margin:0 0 12px">${escaparHtml(opts.creadorNombre)} te invitó a conversar</h1>
    <p style="font-size:14px;line-height:1.5;margin:0 0 6px">Tema: <strong>${escaparHtml(opts.tema)}</strong></p>
    <p style="font-size:14px;line-height:1.5;color:#6b6168;margin:0 0 20px">Un espacio para tener una charla importante, con calma.</p>
    <a href="${opts.link}" style="display:inline-block;background:#641c34;color:#fff;text-decoration:none;padding:12px 20px;border-radius:11px;font-weight:600;font-size:14px">Ver la invitación</a>
    <p style="font-size:12px;color:#8c8085;margin:20px 0 0">Entrás con este link, sin crear contraseña. Solo para mayores de 18 años.</p>
  </div>`;

  const { error } = await resend.emails.send({
    from: FROM,
    to: opts.para,
    subject: `${opts.creadorNombre} te invitó a conversar`,
    html,
  });

  if (error) {
    console.warn("[email] No se pudo enviar la invitación:", error.message);
    return { ok: false };
  }
  return { ok: true };
}

export async function enviarPropuesta(opts: {
  para: string; // email del creador
  invitadoNombre: string;
  tema: string;
  mensaje: string;
}): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY no configurada; no se envió la propuesta.");
    return { ok: false };
  }

  const resend = new Resend(apiKey);
  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:480px;margin:0 auto;color:#2a2326">
    <p style="font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#8a3550;font-weight:600;margin:0 0 8px">Propuesta de ajuste</p>
    <h1 style="font-size:20px;color:#641c34;margin:0 0 12px">${escaparHtml(opts.invitadoNombre)} propuso un ajuste al objetivo</h1>
    <p style="font-size:14px;line-height:1.5;margin:0 0 6px">Conversación: <strong>${escaparHtml(opts.tema)}</strong></p>
    <p style="font-size:14px;line-height:1.6;color:#2a2326;background:#f6ebee;border-radius:11px;padding:12px 14px;margin:0 0 16px">${escaparHtml(opts.mensaje)}</p>
    <p style="font-size:13px;line-height:1.5;color:#6b6168;margin:0">Podés ajustar el objetivo si te parece. Cuando lo hagas, esa persona va a poder aceptar.</p>
  </div>`;

  const { error } = await resend.emails.send({
    from: FROM,
    to: opts.para,
    subject: `${opts.invitadoNombre} propuso un ajuste al objetivo`,
    html,
  });

  if (error) {
    console.warn("[email] No se pudo enviar la propuesta:", error.message);
    return { ok: false };
  }
  return { ok: true };
}
