/** Escudo cabo-verdiano — ISO 4217: CVE; apresentação pedida: ECV. */
export function formatEscudosCv(value: number): string {
  const formatted = new Intl.NumberFormat("pt-CV", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
  return `${formatted} ECV`
}
