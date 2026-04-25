import type { ApiConnectionStatus } from "./apiConnections"

export type ApiExposureAuth = "oauth2" | "api_key" | "mtls"

export type ExposedApiSurface = {
  id: string
  name: string
  description: string
  baseUrl: string
  auth: ApiExposureAuth
  status: ApiConnectionStatus
  lastRotatedAt: string
  icon: string
}
