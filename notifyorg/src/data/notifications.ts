import type { AIRealtimeLine, NotificationStat } from "../types/notifications"

export const notificationStats: NotificationStat[] = [
  {
    id: "s1",
    label: "Fluxos automáticos (IA)",
    value: "24 ativos",
    hint: "Disparos por contexto, público-alvo e janela ideal",
    icon: "smart_toy",
    iconWrapClass: "bg-violet-50 text-violet-700",
  },
  {
    id: "s2",
    label: "Envios manuais (30 dias)",
    value: "186",
    hint: "Criados por administradores no painel",
    icon: "edit_note",
    iconWrapClass: "bg-slate-100 text-slate-700",
  },
  {
    id: "s3",
    label: "Próximos agendados",
    value: "12",
    hint: "Inclui rascunhos em revisão pela IA",
    icon: "schedule",
    iconWrapClass: "bg-blue-50 text-[#2C508C]",
  },
]

/** Estado inicial do feed ao vivo (IA); o componente simula progressão em tempo real. */
export const aiRealtimeSeed: AIRealtimeLine[] = [
  {
    id: "live-1",
    title: "Lembrete de prazo — Declaração IR",
    preview: "Personalização por segmento; tom conforme histórico de abertura.",
    channels: ["email", "sms", "whatsapp", "push"],
    status: "dispatching",
    sent: 18_400,
    total: 42_800,
    aiContext:
      "IA priorizou SMS, WhatsApp e Push para destinatários sem abertura de e-mail nas últimas 72h.",
  },
  {
    id: "live-2",
    title: "Alerta de inadimplência — IPTU",
    preview: "Sequência em 3 toques com escalonamento automático de urgência.",
    channels: ["email", "push"],
    status: "queued",
    sent: 0,
    total: 12_400,
    aiContext: "Janela comercial; fins de semana excluídos pelo modelo.",
  },
  {
    id: "live-3",
    title: "Onboarding — novo cadastro gov.br",
    preview: "Boas-vindas dinâmicas conforme perfil declarado no cadastro.",
    channels: ["email", "push"],
    status: "sent",
    sent: 1_902,
    total: 1_902,
    aiContext: "Push reduzido em 30% para perfis com opt-out parcial.",
  },
]

export const aiRealtimeTemplates: Omit<AIRealtimeLine, "id" | "sent">[] = [
  {
    title: "Convite — audiência pública digital",
    preview: "Convocação segmentada por município e interesse declarado.",
    channels: ["email", "sms", "whatsapp"],
    status: "queued",
    total: 8_200,
    aiContext:
      "IA limitou SMS e WhatsApp ao horário permitido por política municipal; modelo de mensagem homologado.",
  },
  {
    title: "Renovação de consentimento LGPD",
    preview: "Reenvio apenas a quem não confirmou nos últimos 90 dias.",
    channels: ["email"],
    status: "queued",
    total: 3_450,
    aiContext: "Lista derivada do CRM; exclusões automáticas de contatos inválidos.",
  },
  {
    title: "Lembrete — documentação pendente",
    preview: "Gatilho após prazo configurável no fluxo automático.",
    channels: ["email", "push"],
    status: "queued",
    total: 6_100,
    aiContext: "Canal push apenas para usuários com app instalado e token ativo.",
  },
]

let aiRealtimeIdSeq = 100

export function nextAIRealtimeId() {
  aiRealtimeIdSeq += 1
  return `live-${aiRealtimeIdSeq}`
}
