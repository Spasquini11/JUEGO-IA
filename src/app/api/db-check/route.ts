import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/*
  Chequeo temporal de salud: confirma que la app se conecta a la base de datos
  y que la tabla "sessions" existe. Devuelve cuántas sesiones hay (debería ser 0
  al principio). Se puede borrar más adelante.
*/
export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { count, error } = await supabase
      .from("sessions")
      .select("*", { count: "exact", head: true });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, sesiones: count ?? 0 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "error desconocido" },
      { status: 500 },
    );
  }
}
