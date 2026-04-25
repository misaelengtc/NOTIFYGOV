import { useMemo, useState } from "react"
import { initialMessageTemplates, templateCategories } from "../data/messageTemplates"
import { extractTemplateVariables, templateVariablePresets } from "../lib/messageTemplateUtils"
import type { MessageTemplate, MessageTemplateStatus, TemplateChannel } from "../types/messageTemplates"

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `tpl-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

const channelLabel: Record<TemplateChannel, string> = {
  email: "E-mail",
  sms: "SMS",
  push: "Push",
  whatsapp: "WhatsApp",
}

const allChannels: TemplateChannel[] = ["email", "sms", "whatsapp", "push"]

const statusUi: Record<
  MessageTemplateStatus,
  { label: string; className: string }
> = {
  draft: {
    label: "Rascunho",
    className: "border border-slate-200 bg-slate-50 text-slate-600",
  },
  published: {
    label: "Publicado",
    className: "border border-emerald-100 bg-emerald-50 text-emerald-700",
  },
}

type ChannelFlags = Record<TemplateChannel, boolean>

function channelsToFlags(channels: TemplateChannel[]): ChannelFlags {
  return {
    email: channels.includes("email"),
    sms: channels.includes("sms"),
    whatsapp: channels.includes("whatsapp"),
    push: channels.includes("push"),
  }
}

function flagsToChannels(flags: ChannelFlags): TemplateChannel[] {
  return allChannels.filter((c) => flags[c])
}

type FormState = {
  name: string
  category: string
  channels: ChannelFlags
  title: string
  body: string
  legalFooter: string
  status: MessageTemplateStatus
}

function emptyForm(): FormState {
  return {
    name: "",
    category: templateCategories[0],
    channels: { email: true, sms: false, whatsapp: false, push: false },
    title: "",
    body: "",
    legalFooter: "",
    status: "draft",
  }
}

function templateToForm(t: MessageTemplate): FormState {
  return {
    name: t.name,
    category: t.category,
    channels: channelsToFlags(t.channels),
    title: t.title,
    body: t.body,
    legalFooter: t.legalFooter,
    status: t.status,
  }
}

export function TemplatesPage() {
  const [templates, setTemplates] = useState<MessageTemplate[]>(() => [
    ...initialMessageTemplates,
  ])
  const [view, setView] = useState<"list" | "form">("list")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [formError, setFormError] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [search, setSearch] = useState("")
  const [copyState, setCopyState] = useState<{ id: string | null; ok: boolean }>({
    id: null,
    ok: true,
  })

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return templates.filter((t) => {
      if (categoryFilter !== "all" && t.category !== categoryFilter) return false
      if (!q) return true
      const blob = `${t.name} ${t.category} ${t.title} ${t.body}`.toLowerCase()
      return blob.includes(q)
    })
  }, [templates, categoryFilter, search])

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm())
    setFormError(null)
    setView("form")
  }

  const openEdit = (t: MessageTemplate) => {
    setEditingId(t.id)
    setForm(templateToForm(t))
    setFormError(null)
    setView("form")
  }

  const cancelForm = () => {
    setView("list")
    setEditingId(null)
    setForm(emptyForm())
    setFormError(null)
  }

  const toggleChannel = (c: TemplateChannel) => {
    setForm((f) => ({
      ...f,
      channels: { ...f.channels, [c]: !f.channels[c] },
    }))
  }

  const appendVariableToBody = (name: string) => {
    const token = `{{${name}}}`
    setForm((f) => {
      if (!f.body.trim()) return { ...f, body: token }
      const joiner = f.body.endsWith("\n") ? "" : " "
      return { ...f, body: f.body + joiner + token }
    })
  }

  const saveTemplate = () => {
    const name = form.name.trim()
    if (!name) {
      setFormError("Indica um nome para o template.")
      return
    }
    const ch = flagsToChannels(form.channels)
    if (ch.length === 0) {
      setFormError("Seleciona pelo menos um canal aplicável.")
      return
    }
    const body = form.body.trim()
    if (!body) {
      setFormError("O corpo da mensagem é obrigatório.")
      return
    }
    const title = form.title.trim()
    if (ch.includes("email") && !title) {
      setFormError("Para modelos com e-mail, o assunto / título é recomendado (obrigatório neste formulário).")
      return
    }
    setFormError(null)

    const row: MessageTemplate = {
      id: editingId ?? newId(),
      name,
      category: form.category,
      channels: ch,
      title,
      body: form.body,
      legalFooter: form.legalFooter.trim(),
      status: form.status,
      updatedAtLabel: "Agora",
    }

    if (editingId) {
      setTemplates((list) => list.map((t) => (t.id === editingId ? row : t)))
    } else {
      setTemplates((list) => [row, ...list])
    }
    cancelForm()
  }

  const duplicate = (t: MessageTemplate) => {
    const copy: MessageTemplate = {
      ...t,
      id: newId(),
      name: `${t.name} (cópia)`,
      status: "draft",
      updatedAtLabel: "Agora",
    }
    setTemplates((list) => [copy, ...list])
  }

  const copyContent = async (t: MessageTemplate) => {
    const text = [t.title ? `Título: ${t.title}` : null, `Corpo:\n${t.body}`]
      .filter(Boolean)
      .join("\n\n")
    try {
      await navigator.clipboard.writeText(text)
      setCopyState({ id: t.id, ok: true })
      window.setTimeout(() => setCopyState({ id: null, ok: true }), 2000)
    } catch {
      setCopyState({ id: t.id, ok: false })
      window.setTimeout(() => setCopyState({ id: null, ok: true }), 2000)
    }
  }

  const smsConcern =
    (form.channels.sms || form.channels.whatsapp) && form.body.length > 160

  return (
    <main className="ml-64 mt-16 p-stack-lg">
      <div className="mx-auto max-w-[1280px] space-y-stack-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-[#2C508C]">
              Templates de mensagem
            </h1>
            <p className="mt-1 font-body-md text-slate-500">
              Modelos reutilizáveis com <strong className="font-semibold text-slate-700">variáveis</strong>{" "}
              <code className="rounded bg-slate-100 px-1 text-xs text-slate-700">{"{{nome}}"}</code> por
              canal. Publica quando estiver homologado para uso em envios e automações.
            </p>
          </div>
          {view === "list" ? (
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#2C508C] px-5 py-2.5 font-label-md text-white shadow-sm transition hover:bg-[#244a7a] sm:self-auto"
            >
              <span className="material-symbols-outlined text-xl">note_add</span>
              Novo template
            </button>
          ) : (
            <div className="flex flex-wrap gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={cancelForm}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={saveTemplate}
                className="inline-flex items-center gap-2 rounded-lg bg-[#2C508C] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#244a7a]"
              >
                <span className="material-symbols-outlined text-xl">save</span>
                {editingId ? "Guardar" : "Criar template"}
              </button>
            </div>
          )}
        </div>

        {view === "list" ? (
          <>
            <div className="flex flex-col gap-4 rounded-xl border border-white bg-white p-4 shadow-[0px_20px_40px_rgba(44,80,140,0.08)] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
              <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <label className="sr-only" htmlFor="tpl-search">
                  Pesquisar templates
                </label>
                <div className="relative min-w-0 flex-1">
                  <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    search
                  </span>
                  <input
                    id="tpl-search"
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar por nome, categoria ou texto…"
                    className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCategoryFilter("all")}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
                    categoryFilter === "all"
                      ? "bg-[#2C508C] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Todos
                </button>
                {templateCategories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategoryFilter(c)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      categoryFilter === c
                        ? "bg-[#2C508C] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-white bg-white shadow-[0px_20px_40px_rgba(44,80,140,0.08)]">
              <div className="flex flex-col gap-1 border-b border-slate-100 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-headline-md text-headline-md text-slate-800">Biblioteca</h2>
                <p className="text-sm text-slate-500">
                  {filtered.length} de {templates.length} templates
                </p>
              </div>
              {filtered.length === 0 ? (
                <div className="px-8 py-16 text-center text-slate-500">
                  <p className="font-label-md text-slate-600">Nenhum template corresponde aos filtros.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("")
                      setCategoryFilter("all")
                    }}
                    className="mt-3 text-sm font-semibold text-[#2C508C] hover:underline"
                  >
                    Limpar filtros
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-slate-50">
                  {filtered.map((t) => {
                    const st = statusUi[t.status]
                    const vars = extractTemplateVariables(t.title, t.body)
                    return (
                      <li
                        key={t.id}
                        className="flex flex-col gap-4 px-8 py-5 transition-colors hover:bg-slate-50 lg:flex-row lg:items-start lg:gap-6"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F2F5F8] text-[#2C508C]">
                          <span className="material-symbols-outlined">article</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-label-md text-slate-800">{t.name}</p>
                            <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-slate-600">
                              {t.category}
                            </span>
                            <span
                              className={`rounded px-2 py-0.5 text-[10px] font-black uppercase ${st.className}`}
                            >
                              {st.label}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                            {t.title ? (
                              <>
                                <span className="font-medium text-slate-600">Assunto: </span>
                                {t.title}
                              </>
                            ) : (
                              <span className="italic">Sem título (ex.: SMS apenas)</span>
                            )}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {t.channels.map((c) => (
                              <span
                                key={c}
                                className="rounded border border-slate-100 bg-white px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500"
                              >
                                {channelLabel[c]}
                              </span>
                            ))}
                          </div>
                          {vars.length > 0 ? (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {vars.map((v) => (
                                <code
                                  key={v}
                                  className="rounded bg-violet-50 px-1.5 py-0.5 text-[11px] text-violet-800"
                                >
                                  {`{{${v}}}`}
                                </code>
                              ))}
                            </div>
                          ) : null}
                          <p className="mt-2 text-xs text-slate-400">Atualizado {t.updatedAtLabel}</p>
                        </div>
                        <div className="flex shrink-0 flex-wrap gap-2 border-t border-slate-100 pt-4 lg:flex-col lg:items-end lg:border-0 lg:pt-0">
                          <button
                            type="button"
                            onClick={() => openEdit(t)}
                            className="rounded-lg border border-[#2C508C]/30 bg-[#2C508C]/5 px-3 py-1.5 text-sm font-semibold text-[#2C508C] transition hover:bg-[#2C508C]/10"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => duplicate(t)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            Duplicar
                          </button>
                          <button
                            type="button"
                            onClick={() => void copyContent(t)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            {copyState.id === t.id
                              ? copyState.ok
                                ? "Copiado!"
                                : "Erro ao copiar"
                              : "Copiar texto"}
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <div className="overflow-hidden rounded-xl border border-white bg-white shadow-[0px_20px_40px_rgba(44,80,140,0.08)]">
                <div className="border-b border-slate-100 px-8 py-6">
                  <h2 className="font-headline-md text-headline-md text-slate-800">
                    {editingId ? "Editar template" : "Novo template"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Variáveis no formato <code className="text-xs">{"{{variavel}}"}</code> são substituídas no
                    envio.
                  </p>
                </div>
                <div className="space-y-6 px-8 py-8">
                  {formError ? (
                    <p
                      className="rounded-lg border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-800"
                      role="alert"
                    >
                      {formError}
                    </p>
                  ) : null}

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Nome do template
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 outline-none focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20"
                        placeholder="Ex.: Lembrete genérico de prazo"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Categoria
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-800 outline-none focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20"
                      >
                        {templateCategories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Estado
                      </label>
                      <select
                        value={form.status}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            status: e.target.value as MessageTemplateStatus,
                          }))
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-800 outline-none focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20"
                      >
                        <option value="draft">Rascunho</option>
                        <option value="published">Publicado</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Canais aplicáveis</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {allChannels.map((c) => (
                        <label
                          key={c}
                          className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 transition hover:bg-slate-100"
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-[#2C508C] focus:ring-[#2C508C]"
                            checked={form.channels[c]}
                            onChange={() => toggleChannel(c)}
                          />
                          <span className="text-sm font-medium text-slate-700">{channelLabel[c]}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">
                      Assunto / título (e-mail e push)
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 outline-none focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20"
                      placeholder="Linha de assunto ou título curto"
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Corpo da mensagem
                      </label>
                      <span className="text-xs text-slate-400">{form.body.length} caracteres</span>
                    </div>
                    <textarea
                      value={form.body}
                      onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                      rows={10}
                      className="mt-2 w-full resize-y rounded-lg border border-slate-200 px-4 py-3 font-mono text-sm text-slate-800 outline-none focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20"
                      placeholder="Texto do modelo. Use {{nome_cidadao}}, {{data_limite}}, etc."
                    />
                    {smsConcern ? (
                      <p className="mt-2 text-xs text-amber-800">
                        SMS / WhatsApp: mensagens longas podem ser segmentadas ou truncadas pelo operador.
                        Considera enxugar o texto ({" > "}160 caracteres neste rascunho).
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Inserir variável no corpo
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {templateVariablePresets.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => appendVariableToBody(v)}
                          className="rounded-full border border-violet-100 bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-900 transition hover:bg-violet-100"
                        >
                          {`{{${v}}}`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">
                      Rodapé legal (opcional)
                    </label>
                    <textarea
                      value={form.legalFooter}
                      onChange={(e) => setForm((f) => ({ ...f, legalFooter: e.target.value }))}
                      rows={2}
                      className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20"
                      placeholder="Texto de consentimento ou referência legal para e-mail."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-24 overflow-hidden rounded-xl border border-slate-200 bg-[#F8FAFC] shadow-sm">
                <div className="border-b border-slate-200 bg-white px-6 py-4">
                  <h3 className="font-label-md text-slate-800">Pré-visualização</h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Valores fictícios só para leitura (não altera o modelo guardado).
                  </p>
                </div>
                <div className="space-y-4 p-6">
                  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Assunto</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {previewReplace(form.title) || "—"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Corpo</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                      {previewReplace(form.body) || "—"}
                    </p>
                    {form.legalFooter.trim() ? (
                      <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                        {previewReplace(form.legalFooter.trim())}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Variáveis detectadas</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {extractTemplateVariables(form.title, form.body, form.legalFooter).length ? (
                        extractTemplateVariables(form.title, form.body, form.legalFooter).map((v) => (
                          <code
                            key={v}
                            className="rounded bg-white px-2 py-0.5 text-[11px] text-slate-700 shadow-sm"
                          >
                            {`{{${v}}}`}
                          </code>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400">Nenhuma variável neste texto.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

const previewSample: Record<string, string> = {
  nome_cidadao: "Maria Silva",
  numero_processo: "2024/00123",
  data_limite: "15 de maio de 2026",
  municipio: "Município Exemplo",
  link_acao: "https://gov.exemplo.br/acao",
  orgao_sigla: "SEMAD",
}

function previewReplace(text: string): string {
  return text.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, raw: string) => {
    const key = raw.trim()
    return previewSample[key] ?? `«${key}»`
  })
}
