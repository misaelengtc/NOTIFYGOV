export type RelevanceFolder = "urgente" | "administrativo" | "pagamentos" | "geral"

export type CitizenNotification = {
  id: string
  title: string
  body: string
  entity: string
  receivedAt: string
  folder: RelevanceFolder
  read: boolean
  requiresSignature: boolean
  hasOpenInvoice: boolean
  invoiceAmount?: string
  invoiceRef?: string
}
