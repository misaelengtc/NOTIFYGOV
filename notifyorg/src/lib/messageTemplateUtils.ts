/** Extrai nomes de variáveis no formato `{{ nome }}` a partir do texto. */
export function extractTemplateVariables(...parts: string[]): string[] {
  const seen = new Set<string>()
  for (const text of parts) {
    const re = /\{\{\s*([^}]+?)\s*\}\}/g
    let m: RegExpExecArray | null
    while ((m = re.exec(text)) !== null) {
      const key = m[1].trim()
      if (key) seen.add(key)
    }
  }
  return [...seen]
}

export const templateVariablePresets = [
  "nome_cidadao",
  "numero_processo",
  "data_limite",
  "municipio",
  "link_acao",
  "orgao_sigla",
] as const
