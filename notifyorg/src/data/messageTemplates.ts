import type { MessageTemplate } from "../types/messageTemplates"

export const templateCategories = [
  "Prazos e obrigações",
  "Convocatórias e audiências",
  "Cadastro e dados cadastrais",
  "Pagamentos e taxas",
  "Geral",
] as const

export const initialMessageTemplates: MessageTemplate[] = [
  {
    id: "tpl-1",
    name: "Lembrete de prazo processual",
    category: "Prazos e obrigações",
    channels: ["email", "sms", "whatsapp"],
    title: "Prazo: {{numero_processo}} — ação necessária",
    body:
      "Olá, {{nome_cidadao}}.\n\nInformamos que existe prazo associado ao processo {{numero_processo}} em {{municipio}}, com data limite {{data_limite}}.\n\nConsulte detalhes e documentos em: {{link_acao}}\n\n{{orgao_sigla}}",
    legalFooter:
      "Esta mensagem tem caráter institucional. Em caso de dúvida, utilize os canais oficiais do órgão.",
    status: "published",
    updatedAtLabel: "Há 2 dias",
  },
  {
    id: "tpl-2",
    name: "Convocatória — audiência pública",
    category: "Convocatórias e audiências",
    channels: ["email", "push"],
    title: "Audiência pública — {{municipio}}",
    body:
      "Fica V. Sa. convocado(a) para audiência pública no dia {{data_limite}}, com transmissão e inscrições conforme edital em {{link_acao}}.",
    legalFooter: "",
    status: "published",
    updatedAtLabel: "Há 1 semana",
  },
  {
    id: "tpl-3",
    name: "IPTU — lembrete de vencimento (SMS curto)",
    category: "Pagamentos e taxas",
    channels: ["sms", "whatsapp"],
    title: "",
    body:
      "{{orgao_sigla}}: IPTU com vencimento {{data_limite}}. Evite multas. Info: {{link_acao}}",
    legalFooter: "",
    status: "draft",
    updatedAtLabel: "Há 3 horas",
  },
]
