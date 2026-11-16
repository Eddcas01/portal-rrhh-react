import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const meses = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

/** 2026-11-04 -> "4 nov 2026" */
export function formatearFecha(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}`;
}

/** 2026-12-15 -> "15/12/2026" */
export function fechaCorta(iso: string): string {
  const [a, m, d] = iso.split("-");
  if (!a || !m || !d) return iso;
  return `${d}/${m}/${a}`;
}

/** Días de calendario entre dos fechas ISO, inclusivo. */
export function diasEntre(desde: string, hasta: string): number {
  const d1 = new Date(desde + "T00:00:00");
  const d2 = new Date(hasta + "T00:00:00");
  if (Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) return 0;
  const ms = d2.getTime() - d1.getTime();
  if (ms < 0) return 0;
  return Math.round(ms / 86400000) + 1;
}

/** "María José Castillo" -> "MC" */
export function iniciales(nombre: string): string {
  const partes = nombre.trim().split(/\s+/);
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

const paletaAvatar = [
  "bg-brand-100 text-brand-700",
  "bg-accent-100 text-accent-700",
  "bg-success-100 text-success-700",
  "bg-ink-200 text-ink-700",
];

/** Color estable derivado del nombre, para avatares con iniciales. */
export function colorAvatar(semilla: string | number): string {
  const s = String(semilla);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return paletaAvatar[h % paletaAvatar.length];
}
