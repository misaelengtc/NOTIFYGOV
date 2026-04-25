import type { DeliveryChannel } from "./workflows"

/** Canais em que o modelo pode ser aplicado (alinhado a workflows / envio manual). */
export type TemplateChannel = DeliveryChannel

export type MessageTemplateStatus = "draft" | "published"

export type MessageTemplate = {
  id: string
  name: string
  category: string
  channels: TemplateChannel[]
  title: string
  body: string
  /** Rodapé legal opcional (ex.: consentimento em e-mail). */
  legalFooter: string
  status: MessageTemplateStatus
  updatedAtLabel: string
}
