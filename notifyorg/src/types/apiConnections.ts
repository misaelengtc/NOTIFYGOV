export type ApiConnectionStatus = "active" | "degraded" | "paused" | "error"

export type ApiIngestMode = "webhook" | "polling" | "import"

export type ApiConnection = {
  id: string
  name: string
  description: string
  /** URL base ou endpoint principal (pode estar mascarada na UI) */
  endpoint: string
  ingestMode: ApiIngestMode
  status: ApiConnectionStatus
  lastSuccessAt: string
  icon: string
}
