import type { ExposedApiSurface } from "../types/apiExposure"

export const exposedApiSurfaces: ExposedApiSurface[] = [
  {
    id: "e1",
    name: "API REST — envio e estado",
    description:
      "Endpoints para parceiros submeterem notificações, consultarem recibo e estado de entrega.",
    baseUrl: "https://api.notifyorg.example.gov/v1",
    auth: "oauth2",
    status: "active",
    lastRotatedAt: "Credenciais: há 45 dias",
    icon: "hub",
  },
  {
    id: "e2",
    name: "Webhooks de eventos",
    description:
      "Notificação em tempo real para URLs registadas (entrega, leitura, falha, consentimento).",
    baseUrl: "https://api.notifyorg.example.gov/v1/webhooks",
    auth: "api_key",
    status: "active",
    lastRotatedAt: "Segredo HMAC: há 12 dias",
    icon: "webhook",
  },
  {
    id: "e3",
    name: "Ambiente de testes (sandbox)",
    description:
      "Mesmo contrato que produção, com dados fictícios e limites de débito para integração segura.",
    baseUrl: "https://sandbox-api.notifyorg.example.gov/v1",
    auth: "oauth2",
    status: "active",
    lastRotatedAt: "Chaves de teste: sem rotação",
    icon: "science",
  },
  {
    id: "e4",
    name: "Integração mTLS — grandes operadores",
    description:
      "Canal dedicado para operadores com acordo bilateral e certificados X.509 institucionais.",
    baseUrl: "https://mtls-api.notifyorg.example.gov",
    auth: "mtls",
    status: "degraded",
    lastRotatedAt: "Certificado servidor: expira em 18 dias",
    icon: "verified_user",
  },
]
