/** Eventos da trilha de uma notificação (auditoria operacional). */
export type NotificationHistoryEventType =
  | "queued"
  | "sent"
  | "delivered"
  | "opened"
  | "link_clicked"
  | "attachment_viewed"
  | "attachment_downloaded"
  | "reply_received"
  | "confirmation_cmd"
  | "confirmation_declined"
  | "failed"

export type NotificationHistoryEvent = {
  id: string
  /** Data/hora legível (protótipo). */
  at: string
  type: NotificationHistoryEventType
  title: string
  detail?: string
}

export type TrackedNotification = {
  protocol: string
  title: string
  summary: string
  mode: "manual" | "automatic"
  channels: string[]
  sentAt: string
  /** Destinatário mascarado (privacidade). */
  recipientMasked: string
  subjectRef: string
  opened: boolean
  linkClicksCount: number
  /** Confirmação institucional via Chave Móvel Digital; null se canal não aplicável. */
  cmdConfirmed: boolean | null
  hasAttachments: boolean
  attachmentNames?: string[]
  /** Resposta livre do cidadão, se existir. */
  replySnippet?: string
  timeline: NotificationHistoryEvent[]
}
