export type NotificationMode = "automatic" | "manual"

export type NotificationStatus = "sent" | "scheduled" | "draft" | "processing"

export type NotificationListItem = {
  id: string
  mode: NotificationMode
  title: string
  preview: string
  channels: ("email" | "sms" | "push")[]
  status: NotificationStatus
  timeLabel: string
  recipientsLabel: string
  /** Motivo ou regra explicada pela IA (apenas modo automático) */
  aiContext?: string
}

export type NotificationStat = {
  id: string
  label: string
  value: string
  hint: string
  icon: string
  iconWrapClass: string
}
