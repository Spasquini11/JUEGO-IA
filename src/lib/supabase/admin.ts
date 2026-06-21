import "server-only";
import { createClient } from "@supabase/supabase-js";

/*
  Cliente "admin" de Supabase: SOLO para usar en el servidor.
  Usa la clave service_role, que salta las reglas de acceso (RLS), así que
  NUNCA debe importarse desde código que corre en el navegador.
  Se crea de forma perezosa para dar un error claro si faltan las variables.
*/
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Faltan variables de Supabase (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY). Revisá tu archivo .env.local.",
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
