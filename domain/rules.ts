export function diffDaysInclusive(start: Date, end: Date) {
  const ms = end.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
  if (days <= 0) throw new Error("Rango de fechas inválido");
  return days;
}
export function calcularTotal(
  precioPorDia: number,
  inicioISO: string,
  finISO: string
) {
  const days = diffDaysInclusive(new Date(inicioISO), new Date(finISO));
  return days * precioPorDia;
}
