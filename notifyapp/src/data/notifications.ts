import { formatEscudosCv } from "../lib/currency"
import type { CitizenNotification, EntityFolder } from "../types/notification"

export const FOLDER_LABELS: Record<
  CitizenNotification["folder"],
  { label: string; short: string; subtitle?: string }
> = {
  governo: { label: "Governo", short: "Governo", subtitle: "Estado e serviços públicos" },
  edec: {
    label: "EDEC",
    short: "EDEC",
    subtitle: "Eletricidade de Cabo Verde",
  },
  ads: {
    label: "ADS",
    short: "ADS",
    subtitle: "Águas de Santiago",
  },
  tme: {
    label: "TME",
    short: "TME",
    subtitle: "Telecomunicações (exemplo)",
  },
  pagamentos: {
    label: "Pagamentos",
    short: "Pagamentos",
    subtitle: "Faturas e avisos de cobrança",
  },
  outros: { label: "Outros", short: "Outros", subtitle: "Entidades diversas" },
}

/** Evita crash se `folder` vier desatualizado (cache) ou da API com valor desconhecido. */
export function getFolderMeta(folder: string): (typeof FOLDER_LABELS)[EntityFolder] {
  if (Object.prototype.hasOwnProperty.call(FOLDER_LABELS, folder)) {
    return FOLDER_LABELS[folder as EntityFolder]
  }
  return FOLDER_LABELS.outros
}

export function normalizeEntityFolder(folder: string): EntityFolder {
  if (Object.prototype.hasOwnProperty.call(FOLDER_LABELS, folder)) {
    return folder as EntityFolder
  }
  return "outros"
}

export const MOCK_NOTIFICATIONS: CitizenNotification[] = [
  {
    id: "1",
    title: "Prazo — licença de construção",
    body: "Tem 15 dias úteis para completar o processo na plataforma digital ou nos balcões do Ministério.",
    entity: "Ministério das Infraestruturas",
    receivedAt: "2026-04-24T09:12:00",
    folder: "governo",
    read: false,
    requiresSignature: true,
    hasOpenInvoice: false,
  },
  {
    id: "2",
    title: "Fatura de energia — ciclo de abril",
    body: "A sua fatura da EDEC está disponível. Pode pagar com cartão bancário em escudos cabo-verdianos (ECV).",
    entity: "EDEC — Eletricidade de Cabo Verde",
    receivedAt: "2026-04-23T14:00:00",
    folder: "edec",
    read: false,
    requiresSignature: false,
    hasOpenInvoice: true,
    invoiceAmountCve: 18_450.75,
    invoiceRef: "EDEC 2026/04-88912",
  },
  {
    id: "3",
    title: "Leitura de contador — água",
    body: "Regámos a nova leitura no sistema ADS. Em caso de divergência, contacte o apoio ao cliente.",
    entity: "ADS — Águas de Santiago",
    receivedAt: "2026-04-22T11:30:00",
    folder: "ads",
    read: true,
    requiresSignature: false,
    hasOpenInvoice: true,
    invoiceAmountCve: 3_280.0,
    invoiceRef: "ADS FT 2026-1120",
  },
  {
    id: "4",
    title: "DUC — imposto devido",
    body: "Consta documento único de cobrança na sua área reservada. Liquidação disponível por cartão em ECV.",
    entity: "DGCI — Receita Nacional",
    receivedAt: "2026-04-21T08:00:00",
    folder: "pagamentos",
    read: false,
    requiresSignature: true,
    hasOpenInvoice: true,
    invoiceAmountCve: 12_100.0,
    invoiceRef: "DUC 2026/441902",
  },
  {
    id: "5",
    title: "Renovação de pacote móvel",
    body: "O seu pacote foi renovado automaticamente. Consulte o detalhe no portal TME.",
    entity: "TME Cabo Verde",
    receivedAt: "2026-04-20T16:20:00",
    folder: "tme",
    read: true,
    requiresSignature: false,
    hasOpenInvoice: false,
  },
  {
    id: "6",
    title: "Convocatória assembleia de condóminos",
    body: "A administração do condomínio convoca assembleia para o próximo sábado, 10h00.",
    entity: "Condomínio Residencial Horizonte",
    receivedAt: "2026-04-19T10:00:00",
    folder: "outros",
    read: true,
    requiresSignature: false,
    hasOpenInvoice: false,
  },
]

/** Texto de valor para ecrãs de pagamento e botões. */
export function invoiceDisplayAmount(n: CitizenNotification): string | undefined {
  if (n.invoiceAmountCve == null) return undefined
  return formatEscudosCv(n.invoiceAmountCve)
}
