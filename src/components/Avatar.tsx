/*
  Avatar con iniciales y un color propio por persona. Sirve para distinguir de un
  vistazo quién es quién (en la lista de conversaciones y en el hilo de mensajes).
  El color se elige de forma estable a partir del nombre: la misma persona tiene
  siempre el mismo color.
*/

// Paleta de colores suaves para los avatares (distintos del burdeos, pero amables).
const COLORES = [
  { bg: "#E9D5DA", fg: "#7A2942" },
  { bg: "#D6E4E5", fg: "#235559" },
  { bg: "#E5DBF0", fg: "#4A3470" },
  { bg: "#F2E2CE", fg: "#7A5320" },
  { bg: "#D9E3F0", fg: "#2F4B7A" },
  { bg: "#E0E8D4", fg: "#465A2C" },
  { bg: "#F2D9D9", fg: "#8A3030" },
];

function iniciales(nombre: string) {
  const partes = nombre.trim().split(/\s+/);
  const primera = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primera + ultima).toUpperCase();
}

function colorDe(nombre: string) {
  let h = 0;
  for (let i = 0; i < nombre.length; i++) {
    h = (h * 31 + nombre.charCodeAt(i)) >>> 0;
  }
  return COLORES[h % COLORES.length];
}

export default function Avatar({
  nombre,
  size = 32,
}: {
  nombre: string;
  size?: number;
}) {
  const c = colorDe(nombre);
  return (
    <span
      title={nombre}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        background: c.bg,
        color: c.fg,
        fontSize: Math.round(size * 0.4),
      }}
      className="inline-flex shrink-0 items-center justify-center rounded-full font-bold ring-2 ring-surface"
    >
      {iniciales(nombre)}
    </span>
  );
}
