/** Pastas por remetente / setor (Cabo Verde e serviços). */
export type EntityFolder =
  | "governo"
  | "edec"
  | "ads"
  | "tme"
  | "pagamentos"
  | "outros"

export type CitizenNotification = {
  id: string
  title: string
  body: string
  entity: string
  receivedAt: string
  folder: EntityFolder
  read: boolean
  requiresSignature: boolean
  hasOpenInvoice: boolean
  /** Valor em escudos cabo-verdianos (para fatura / pagamento com cartão). */
  invoiceAmountCve?: number
  invoiceRef?: string
}
