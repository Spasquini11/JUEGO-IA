import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

/*
  Vuelta del link mágico: Supabase manda al usuario acá con un "code".
  Lo canjeamos por una sesión y lo mandamos al Home.
*/
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createSupabaseServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Si algo falló (link vencido o ya usado), volvemos al ingreso.
  return NextResponse.redirect(`${origin}/ingresar?error=link`);
}
