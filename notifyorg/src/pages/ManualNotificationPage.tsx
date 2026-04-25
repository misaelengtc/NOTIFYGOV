import { useMemo, useState } from "react"

type RecipientTab = "citizen" | "group" | "list"
type Priority = "normal" | "urgent"

const MAX_BODY = 500

const cardClass =
  "rounded-xl border border-white bg-white p-8 shadow-[0_20px_40px_rgba(44,80,140,0.05)]"

const sectionTitleClass =
  "flex items-center gap-2 font-bold text-[#0d3873] font-headline-md text-lg text-body-lg"

export function ManualNotificationPage() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [legalText, setLegalText] = useState(
    "Ao clicar em confirmar, você declara estar ciente dos termos de uso e privacidade desta comunicação institucional.",
  )
  const [recipientTab, setRecipientTab] = useState<RecipientTab>("citizen")
  const [citizenQuery, setCitizenQuery] = useState("")
  const [channels, setChannels] = useState({
    email: true,
    sms: false,
    whatsapp: false,
    push: true,
  })
  const [priority, setPriority] = useState<Priority>("normal")
  const [consentRequired, setConsentRequired] = useState(true)

  const bodyLen = body.length

  const summary = useMemo(() => {
    const active: string[] = []
    if (channels.email) active.push("Email")
    if (channels.sms) active.push("SMS")
    if (channels.whatsapp) active.push("WhatsApp")
    if (channels.push) active.push("Push")
    return {
      recipients: recipientTab === "citizen" && citizenQuery.trim() ? "1 selecionado" : "—",
      channels: active.length ? active.join(", ") : "—",
      urgency: priority === "normal" ? "Normal" : "Urgente",
      consent: consentRequired ? "Sim" : "Não",
    }
  }, [channels, citizenQuery, consentRequired, priority, recipientTab])

  const toggleChannel = (key: keyof typeof channels) => {
    setChannels((c) => ({ ...c, [key]: !c[key] }))
  }

  return (
    <main className="ml-64 mt-16 min-h-screen p-margin-desktop">
      <div className="mx-auto max-w-container-max px-gutter py-stack-lg">
        <header className="mb-stack-lg flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary">Criar Nova Notificação</h1>
            <p className="mt-2 font-body-md text-body-md text-slate-500">
              Configure os parâmetros da comunicação institucional (envio manual).
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-lg border border-primary px-6 py-2 font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              Salvar Rascunho
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-[#2C508C] px-6 py-2 font-semibold text-white shadow-lg shadow-[#2C508C]/20 transition-all hover:bg-[#1A3A6D]"
            >
              <span className="material-symbols-outlined text-sm">send</span>
              Enviar Notificação
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
          <div className="space-y-gutter lg:col-span-8">
            <section className={cardClass}>
              <div className={`${sectionTitleClass} mb-6`}>
                <span className="material-symbols-outlined">article</span>
                <h2>Conteúdo da Mensagem</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="mn-title">
                    Título da Notificação
                  </label>
                  <input
                    id="mn-title"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20"
                    placeholder="Ex: Atualização do Calendário de Vacinação"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="mn-body">
                    Mensagem (Corpo)
                  </label>
                  <textarea
                    id="mn-body"
                    className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20"
                    placeholder="Descreva aqui o conteúdo que será enviado..."
                    rows={6}
                    maxLength={MAX_BODY}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                  <div className="mt-2 flex justify-end">
                    <span className="text-xs text-slate-400">
                      {bodyLen} / {MAX_BODY} caracteres
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className={cardClass}>
              <div className={`${sectionTitleClass} mb-6`}>
                <span className="material-symbols-outlined">person_search</span>
                <h2>Seleção de Destinatários</h2>
              </div>
              <div className="mb-8 flex flex-wrap border-b border-slate-100">
                {(
                  [
                    { id: "citizen" as const, label: "Cidadão Único" },
                    { id: "group" as const, label: "Grupo / Segmento" },
                    { id: "list" as const, label: "Lista Personalizada" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setRecipientTab(t.id)}
                    className={
                      recipientTab === t.id
                        ? "border-b-2 border-[#2C508C] px-4 py-3 text-sm font-bold text-[#2C508C] sm:px-6"
                        : "border-b-2 border-transparent px-4 py-3 text-sm font-medium text-slate-400 hover:text-slate-600 sm:px-6"
                    }
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-6">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    search
                  </span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition-all focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20"
                    placeholder="Buscar por CNI, Passaporte, NIF, Telemóvel."
                    type="search"
                    value={citizenQuery}
                    onChange={(e) => setCitizenQuery(e.target.value)}
                    disabled={recipientTab !== "citizen"}
                  />
                </div>
                {recipientTab === "citizen" ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                      Sugestão: 000.000.000-00
                    </span>
                    <span className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                      Sugestão: Maria Silva
                    </span>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-500">
                    {recipientTab === "group"
                      ? "Selecione um segmento guardado ou crie filtros demográficos."
                      : "Importe ou cole identificadores de uma lista homologada."}
                  </p>
                )}
              </div>
            </section>

            <section className={cardClass}>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className={sectionTitleClass}>
                  <span className="material-symbols-outlined">gavel</span>
                  <h2>Termo de Consentimento</h2>
                </div>
                <label className="inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={consentRequired}
                    onChange={(e) => setConsentRequired(e.target.checked)}
                  />
                  <div className="peer relative h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-[#2C508C] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none" />
                  <span className="ml-3 text-sm font-medium text-slate-700">Requer confirmação</span>
                </label>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="mn-legal">
                    Mensagem Legal
                  </label>
                  <textarea
                    id="mn-legal"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                    rows={3}
                    value={legalText}
                    onChange={(e) => setLegalText(e.target.value)}
                  />
                </div>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-4">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-primary">
                    Pré-visualização
                  </span>
                  <div className="rounded bg-white p-3 text-xs text-slate-600 shadow-sm">
                    <p className="line-clamp-4">{legalText || "—"}</p>
                    <div className="mt-3 flex gap-2">
                      <div className="flex h-6 w-full items-center justify-center rounded bg-primary text-[10px] font-bold text-white">
                        Aceitar
                      </div>
                      <div className="flex h-6 w-full items-center justify-center rounded bg-slate-200 text-[10px] font-bold text-slate-600">
                        Recusar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-gutter lg:col-span-4">
            <section className={cardClass}>
              <div className={`${sectionTitleClass} mb-6`}>
                <span className="material-symbols-outlined">hub</span>
                <h2>Canais de Envio</h2>
              </div>
              <div className="space-y-4">
                <label className="flex cursor-pointer items-center rounded-lg border border-slate-100 bg-slate-50 p-4 transition-colors hover:bg-slate-100">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-slate-300 text-[#2C508C] focus:ring-[#2C508C]"
                    checked={channels.email}
                    onChange={() => toggleChannel("email")}
                  />
                  <span className="ml-3 flex items-center gap-2 font-medium text-slate-700">
                    <span className="material-symbols-outlined text-sm text-slate-400">mail</span>
                    E-mail Institucional
                  </span>
                </label>
                <label className="flex cursor-pointer items-center rounded-lg border border-slate-100 bg-slate-50 p-4 transition-colors hover:bg-slate-100">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-slate-300 text-[#2C508C] focus:ring-[#2C508C]"
                    checked={channels.sms}
                    onChange={() => toggleChannel("sms")}
                  />
                  <span className="ml-3 flex items-center gap-2 font-medium text-slate-700">
                    <span className="material-symbols-outlined text-sm text-slate-400">sms</span>
                    SMS (Celular)
                  </span>
                </label>
                <label className="flex cursor-pointer items-center rounded-lg border border-slate-100 bg-slate-50 p-4 transition-colors hover:bg-slate-100">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-slate-300 text-[#2C508C] focus:ring-[#2C508C]"
                    checked={channels.whatsapp}
                    onChange={() => toggleChannel("whatsapp")}
                  />
                  <span className="ml-3 flex items-center gap-2 font-medium text-slate-700">
                    <span className="material-symbols-outlined text-sm text-emerald-600">chat</span>
                    WhatsApp (API oficial)
                  </span>
                </label>
                <label className="flex cursor-pointer items-center rounded-lg border border-slate-100 bg-slate-50 p-4 transition-colors hover:bg-slate-100">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-slate-300 text-[#2C508C] focus:ring-[#2C508C]"
                    checked={channels.push}
                    onChange={() => toggleChannel("push")}
                  />
                  <span className="ml-3 flex items-center gap-2 font-medium text-slate-700">
                    <span className="material-symbols-outlined text-sm text-slate-400">
                      notifications_active
                    </span>
                    Push Notification (App)
                  </span>
                </label>
              </div>
            </section>

            <section className={cardClass}>
              <div className={`${sectionTitleClass} mb-6`}>
                <span className="material-symbols-outlined">priority_high</span>
                <h2>Nível de Urgência</h2>
              </div>
              <div className="space-y-4">
                <label className="relative flex cursor-pointer items-center gap-4">
                  <input
                    type="radio"
                    name="priority"
                    className="sr-only"
                    checked={priority === "normal"}
                    onChange={() => setPriority("normal")}
                  />
                  <div
                    className={`w-full rounded-lg border p-4 transition-all ${
                      priority === "normal"
                        ? "border-primary bg-primary/5"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-slate-400" />
                        <span className="font-bold text-slate-700">Normal</span>
                      </div>
                      <span
                        className={`material-symbols-outlined ${priority === "normal" ? "text-primary" : "text-slate-300"}`}
                      >
                        check_circle
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">Entrega em fila padrão (até 1h)</p>
                  </div>
                </label>
                <label className="relative flex cursor-pointer items-center gap-4">
                  <input
                    type="radio"
                    name="priority"
                    className="sr-only"
                    checked={priority === "urgent"}
                    onChange={() => setPriority("urgent")}
                  />
                  <div
                    className={`w-full rounded-lg border p-4 transition-all ${
                      priority === "urgent"
                        ? "border-error bg-error/5"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-error" />
                        <span className="font-bold text-slate-700">Urgente</span>
                      </div>
                      <span
                        className={`material-symbols-outlined ${priority === "urgent" ? "text-error" : "text-slate-300"}`}
                      >
                        check_circle
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">Entrega prioritária imediata</p>
                  </div>
                </label>
              </div>
            </section>

            <div className="rounded-xl bg-primary-container p-6 text-on-primary-container shadow-xl">
              <h3 className="mb-4 border-b border-on-primary-container/20 pb-2 text-sm font-bold">
                Resumo do Envio
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between gap-2">
                  <span>Destinatários</span>
                  <span className="text-right font-bold">{summary.recipients}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Canais</span>
                  <span className="text-right font-bold">{summary.channels}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Urgência</span>
                  <span className="text-right font-bold">{summary.urgency}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Consentimento</span>
                  <span className="text-right font-bold">{summary.consent}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
