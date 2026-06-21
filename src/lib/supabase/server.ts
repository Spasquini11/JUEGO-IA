import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/*
  Cliente de Supabase para el SERVIDOR (server components, rutas, acciones).
  Lee y escribe la sesión del usuario en cookies. Usa la clave pública (anon),
  así que respeta las reglas de acceso (RLS): el usuario ve solo lo suyo.
*/
export async function createSupabaseServer() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // En Server Components no se pueden escribir cookies; lo resuelve el middleware.
          }
        },
      },
    },
  );
}
