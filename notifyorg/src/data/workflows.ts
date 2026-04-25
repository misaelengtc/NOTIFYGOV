import type { DeliveryWorkflow } from "../types/workflows"

export const initialDeliveryWorkflows: DeliveryWorkflow[] = [
  {
    id: "wf-seed-1",
    name: "Prazo processual — escada e-mail → SMS",
    description:
      "Notificação de prazo: primeiro e-mail; se não lido em 24 h, reforço por SMS.",
    trigger: "api_event",
    status: "active",
    updatedAtLabel: "Há 3 dias",
    steps: [
      {
        id: "s1",
        channel: "email",
        delayAfterPrevious: "0",
        condition: "always",
      },
      {
        id: "s2",
        channel: "sms",
        delayAfterPrevious: "24h",
        condition: "if_not_read",
      },
    ],
  },
  {
    id: "wf-seed-2",
    name: "Convocatória — WhatsApp imediato",
    description: "Canal único via API oficial para avisos urgentes com opt-in.",
    trigger: "manual",
    status: "draft",
    updatedAtLabel: "Há 1 semana",
    steps: [
      {
        id: "s1",
        channel: "whatsapp",
        delayAfterPrevious: "0",
        condition: "always",
      },
    ],
  },
]
