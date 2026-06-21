import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

/*
  Cerrar sesión: borra la sesión y vuelve a la pantalla de ingreso.
*/
export async function POST(request: Request) {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/ingresar", request.url), {
    status: 303,
  });
}
