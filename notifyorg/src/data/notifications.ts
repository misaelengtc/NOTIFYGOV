import type { NotificationListItem, NotificationStat } from "../types/notifications"

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

export const notificationFeed: NotificationListItem[] = [
  {
    id: "n1",
    mode: "automatic",
    title: "Lembrete de prazo — Declaração IR",
    preview:
      "Mensagem personalizada por segmento; tom ajustado conforme histórico de abertura.",
    channels: ["email", "sms", "push"],
    status: "sent",
    timeLabel: "Há 18 min",
    recipientsLabel: "42.800 destinatários",
    aiContext:
      "IA selecionou canal SMS+Push para usuários sem abertura de e-mail nas últimas 72h.",
  },
  {
    id: "n2",
    mode: "manual",
    title: "Comunicado: manutenção do portal",
    preview: "Texto fixo aprovado pela equipe jurídica; sem variação por segmento.",
    channels: ["email"],
    status: "scheduled",
    timeLabel: "Amanhã, 08:00",
    recipientsLabel: "Lista: servidores ativos",
  },
  {
    id: "n3",
    mode: "automatic",
    title: "Alerta de inadimplência — IPTU",
    preview: "Sequência em 3 toques com escalonamento automático de urgência.",
    channels: ["email", "push"],
    status: "processing",
    timeLabel: "Em fila",
    recipientsLabel: "12.400 (segmento inadimplentes)",
    aiContext: "Modelo priorizou horário comercial e evitou fins de semana.",
  },
  {
    id: "n4",
    mode: "manual",
    title: "Convocação assembleia ordinária",
    preview: "Anexo PDF e link para confirmação de presença.",
    channels: ["email", "sms"],
    status: "draft",
    timeLabel: "Rascunho",
    recipientsLabel: "Conselho consultivo",
  },
  {
    id: "n5",
    mode: "automatic",
    title: "Onboarding — novo cadastro gov.br",
    preview: "Boas-vindas dinâmicas com próximos passos conforme perfil declarado.",
    channels: ["email", "push"],
    status: "sent",
    timeLabel: "Ontem, 14:22",
    recipientsLabel: "1.902 novos usuários",
    aiContext: "IA reduziu push em 30% para perfis com opt-out parcial.",
  },
]
