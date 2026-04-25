export type DeliveryChannel = "email" | "sms" | "push" | "whatsapp"

export type WorkflowTrigger = "manual" | "scheduled" | "api_event"

/** Condição para executar o passo relativamente ao passo anterior. */
export type StepCondition = "always" | "if_not_delivered" | "if_not_read"

/** Atraso após conclusão (ou falha) do passo anterior, antes de tentar este canal. */
export type StepDelay = "0" | "15m" | "1h" | "24h" | "72h"

export type DeliveryStep = {
  id: string
  channel: DeliveryChannel
  delayAfterPrevious: StepDelay
  condition: StepCondition
}

export type WorkflowStatus = "draft" | "active" | "paused"

export type DeliveryWorkflow = {
  id: string
  name: string
  description: string
  trigger: WorkflowTrigger
  steps: DeliveryStep[]
  status: WorkflowStatus
  updatedAtLabel: string
}
