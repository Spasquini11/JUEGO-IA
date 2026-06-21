// Muestra cuánto hace que pasó algo, en lenguaje simple (es-AR).
export function tiempoRelativo(iso: string): string {
  const fecha = new Date(iso);
  const dias = Math.floor((Date.now() - fecha.getTime()) / 86_400_000);

  if (dias <= 0) return "hoy";
  if (dias === 1) return "ayer";
  if (dias < 7) return `hace ${dias} días`;
  if (dias < 30) {
    const semanas = Math.floor(dias / 7);
    return `hace ${semanas} semana${semanas > 1 ? "s" : ""}`;
  }
  return fecha.toLocaleDateString("es-AR", { day: "numeric", month: "short" });
}
