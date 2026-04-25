export type NotificationStat = {
  id: string
  label: string
  value: string
  hint: string
  icon: string
  iconWrapClass: string
}

/** Linha do painel ao vivo: apenas envios orquestrados pela IA (visão administrativa). */
export type AIRealtimeStatus = "queued" | "dispatching" | "sent"

export type AIRealtimeLine = {
  id: string
  title: string
  preview: string
  channels: ("email" | "sms" | "push" | "whatsapp")[]
  status: AIRealtimeStatus
  sent: number
  total: number
  aiContext: string
}
