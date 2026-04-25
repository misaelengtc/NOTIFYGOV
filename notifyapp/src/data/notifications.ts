import type { CitizenNotification } from "../types/notification"

export const FOLDER_LABELS: Record<
  CitizenNotification["folder"],
  { label: string; short: string }
> = {
  urgente: { label: "Urgente", short: "Urgente" },
  administrativo: { label: "Administrativo", short: "Admin." },
  pagamentos: { label: "Pagamentos e faturas", short: "Pagamentos" },
  geral: { label: "Geral", short: "Geral" },
}

export const MOCK_NOTIFICATIONS: CitizenNotification[] = [
  {
    id: "1",
    title: "Prazo de resposta — licença de obras",
    body: "Tem até 15 dias úteis para submeter a documentação em falta através desta app ou presencialmente.",
    entity: "Câmara Municipal",
    receivedAt: "2026-04-24T09:12:00",
    folder: "urgente",
    read: false,
    requiresSignature: true,
    hasOpenInvoice: false,
  },
  {
    id: "2",
    title: "Fatura de serviços municipais",
    body: "A sua fatura está disponível. Pode consultar o detalhe e pagar com cartão de forma segura.",
    entity: "Finanças Municipais",
    receivedAt: "2026-04-23T14:00:00",
    folder: "pagamentos",
    read: false,
    requiresSignature: false,
    hasOpenInvoice: true,
    invoiceAmount: "42,80 €",
    invoiceRef: "FT 2026/88421",
  },
  {
    id: "3",
    title: "Atualização de dados cadastrais",
    body: "Solicitamos confirmação dos seus contactos para continuar a receber avisos oficiais.",
    entity: "Identificação Civil",
    receivedAt: "2026-04-22T11:30:00",
    folder: "administrativo",
    read: true,
    requiresSignature: true,
    hasOpenInvoice: false,
  },
  {
    id: "4",
    title: "Lembrete: recolha de documento",
    body: "O seu título está disponível para levantamento no balcão indicado na mensagem original.",
    entity: "Serviço de Atendimento",
    receivedAt: "2026-04-20T08:00:00",
    folder: "geral",
    read: true,
    requiresSignature: false,
    hasOpenInvoice: false,
  },
]
