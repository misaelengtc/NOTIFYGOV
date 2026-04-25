import { useState } from "react"
import { initialDeliveryWorkflows } from "../data/workflows"
import type {
  DeliveryChannel,
  DeliveryStep,
  DeliveryWorkflow,
  StepCondition,
  StepDelay,
  WorkflowStatus,
  WorkflowTrigger,
} from "../types/workflows"

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

const triggerLabel: Record<WorkflowTrigger, string> = {
  manual: "Disparo manual",
  scheduled: "Agendado / recorrente",
  api_event: "Evento via API / integração",
}

const channelLabel: Record<DeliveryChannel, string> = {
  email: "E-mail",
  sms: "SMS",
  push: "Push",
  whatsapp: "WhatsApp",
}

const delayLabel: Record<StepDelay, string> = {
  "0": "Imediato",
  "15m": "15 minutos após o passo anterior",
  "1h": "1 hora após o passo anterior",
  "24h": "24 horas após o passo anterior",
  "72h": "72 horas após o passo anterior",
}

const conditionLabel: Record<StepCondition, string> = {
  always: "Sempre",
  if_not_delivered: "Só se o anterior não foi entregue",
  if_not_read: "Só se o anterior não foi lido",
}

const statusStyle: Record<
  WorkflowStatus,
  { label: string; className: string }
> = {
  draft: {
    label: "Rascunho",
    className: "border border-slate-200 bg-slate-50 text-slate-600",
  },
  active: {
    label: "Ativo",
    className: "border border-emerald-100 bg-emerald-50 text-emerald-700",
  },
  paused: {
    label: "Pausado",
    className: "border border-amber-100 bg-amber-50 text-amber-800",
  },
}

const delays: StepDelay[] = ["0", "15m", "1h", "24h", "72h"]
const conditions: StepCondition[] = ["always", "if_not_delivered", "if_not_read"]
const channels: DeliveryChannel[] = ["email", "sms", "push", "whatsapp"]

function defaultStep(): DeliveryStep {
  return {
    id: newId(),
    channel: "email",
    delayAfterPrevious: "0",
    condition: "always",
  }
}

type FormState = {
  name: string
  description: string
  trigger: WorkflowTrigger
  steps: DeliveryStep[]
}

const emptyForm = (): FormState => ({
  name: "",
  description: "",
  trigger: "manual",
  steps: [defaultStep()],
})

export function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<DeliveryWorkflow[]>(() => [
    ...initialDeliveryWorkflows,
  ])
  const [view, setView] = useState<"list" | "form">("list")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [formError, setFormError] = useState<string | null>(null)

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm())
    setFormError(null)
    setView("form")
  }

  const openEdit = (wf: DeliveryWorkflow) => {
    setEditingId(wf.id)
    setForm({
      name: wf.name,
      description: wf.description,
      trigger: wf.trigger,
      steps: wf.steps.map((s) => ({ ...s, id: s.id })),
    })
    setFormError(null)
    setView("form")
  }

  const cancelForm = () => {
    setView("list")
    setEditingId(null)
    setForm(emptyForm())
    setFormError(null)
  }

  const updateStep = (stepId: string, patch: Partial<DeliveryStep>) => {
    setForm((f) => ({
      ...f,
      steps: f.steps.map((s) => (s.id === stepId ? { ...s, ...patch } : s)),
    }))
  }

  const addStep = () => {
    setForm((f) => ({
      ...f,
      steps: [...f.steps, defaultStep()],
    }))
  }

  const removeStep = (stepId: string) => {
    setForm((f) => {
      if (f.steps.length <= 1) return f
      return { ...f, steps: f.steps.filter((s) => s.id !== stepId) }
    })
  }

  const moveStep = (stepId: string, dir: -1 | 1) => {
    setForm((f) => {
      const i = f.steps.findIndex((s) => s.id === stepId)
      const j = i + dir
      if (i < 0 || j < 0 || j >= f.steps.length) return f
      const next = [...f.steps]
      ;[next[i], next[j]] = [next[j], next[i]]
      next[0] = { ...next[0], delayAfterPrevious: "0" }
      return { ...f, steps: next }
    })
  }

  const saveWorkflow = () => {
    const name = form.name.trim()
    if (!name) {
      setFormError("Indica um nome para o workflow.")
      return
    }
    if (form.steps.length === 0) {
      setFormError("Adiciona pelo menos um passo de entrega.")
      return
    }
    setFormError(null)

    const normalizedSteps = form.steps.map((s, i) => ({
      ...s,
      id: s.id || newId(),
      delayAfterPrevious: i === 0 ? ("0" as StepDelay) : s.delayAfterPrevious,
    }))

    if (editingId) {
      setWorkflows((list) =>
        list.map((w) =>
          w.id === editingId
            ? {
                ...w,
                name,
                description: form.description.trim(),
                trigger: form.trigger,
                steps: normalizedSteps,
                updatedAtLabel: "Agora",
              }
            : w,
        ),
      )
    } else {
      const nw: DeliveryWorkflow = {
        id: newId(),
        name,
        description: form.description.trim(),
        trigger: form.trigger,
        steps: normalizedSteps,
        status: "draft",
        updatedAtLabel: "Agora",
      }
      setWorkflows((list) => [nw, ...list])
    }
    cancelForm()
  }

  const stepSummary = (wf: DeliveryWorkflow) =>
    wf.steps.map((s, i) => `${i + 1}. ${channelLabel[s.channel]}`).join(" → ")

  return (
    <main className="ml-64 mt-16 p-stack-lg">
      <div className="mx-auto max-w-[1280px] space-y-stack-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-[#2C508C]">Workflows</h1>
            <p className="mt-1 font-body-md text-slate-500">
              Define <strong className="font-semibold text-slate-700">cascatas de entrega</strong>{" "}
              (canais, esperas e condições) para as mesmas notificações chegarem ao cidadão com
              reforço controlado.
            </p>
          </div>
          {view === "list" ? (
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#2C508C] px-5 py-2.5 font-label-md text-white shadow-sm transition hover:bg-[#244a7a] sm:self-auto"
            >
              <span className="material-symbols-outlined text-xl">add</span>
              Novo workflow de entrega
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
                onClick={saveWorkflow}
                className="inline-flex items-center gap-2 rounded-lg bg-[#2C508C] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#244a7a]"
              >
                <span className="material-symbols-outlined text-xl">save</span>
                {editingId ? "Guardar alterações" : "Criar workflow"}
              </button>
            </div>
          )}
        </div>

        {view === "form" ? (
          <div className="overflow-hidden rounded-xl border border-white bg-white shadow-[0px_20px_40px_rgba(44,80,140,0.08)]">
            <div className="border-b border-slate-100 px-8 py-6">
              <h2 className="font-headline-md text-headline-md text-slate-800">
                {editingId ? "Editar workflow" : "Criar workflow de entrega"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Cada passo usa um canal. Atrasos e condições aplicam-se em cadeia após o passo
                anterior.
              </p>
            </div>
            <div className="space-y-8 px-8 py-8">
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
                    Nome do workflow
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Ex.: Reforço IPTU — e-mail depois SMS"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 outline-none focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Descrição (opcional)
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    rows={2}
                    placeholder="Contexto de uso, público-alvo ou política interna."
                    className="mt-2 w-full resize-y rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 outline-none focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Gatilho
                  </label>
                  <select
                    value={form.trigger}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        trigger: e.target.value as WorkflowTrigger,
                      }))
                    }
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-800 outline-none focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20"
                  >
                    {(Object.keys(triggerLabel) as WorkflowTrigger[]).map((k) => (
                      <option key={k} value={k}>
                        {triggerLabel[k]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-label-md text-slate-800">Passos de entrega</h3>
                  <button
                    type="button"
                    onClick={addStep}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#2C508C]/30 bg-[#2C508C]/5 px-3 py-1.5 text-sm font-semibold text-[#2C508C] transition hover:bg-[#2C508C]/10"
                  >
                    <span className="material-symbols-outlined text-lg">add_circle</span>
                    Adicionar passo
                  </button>
                </div>
                <ol className="space-y-4">
                  {form.steps.map((step, index) => (
                    <li
                      key={step.id}
                      className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-4 sm:p-5"
                    >
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-black uppercase tracking-wide text-[#2C508C]">
                          Passo {index + 1}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          <button
                            type="button"
                            aria-label="Mover passo para cima"
                            disabled={index === 0}
                            onClick={() => moveStep(step.id, -1)}
                            className="rounded border border-slate-200 bg-white p-1.5 text-slate-600 disabled:opacity-40"
                          >
                            <span className="material-symbols-outlined text-lg">arrow_upward</span>
                          </button>
                          <button
                            type="button"
                            aria-label="Mover passo para baixo"
                            disabled={index === form.steps.length - 1}
                            onClick={() => moveStep(step.id, 1)}
                            className="rounded border border-slate-200 bg-white p-1.5 text-slate-600 disabled:opacity-40"
                          >
                            <span className="material-symbols-outlined text-lg">
                              arrow_downward
                            </span>
                          </button>
                          <button
                            type="button"
                            aria-label="Remover passo"
                            disabled={form.steps.length <= 1}
                            onClick={() => removeStep(step.id)}
                            className="rounded border border-rose-100 bg-white p-1.5 text-rose-600 disabled:opacity-40"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500">
                            Canal
                          </label>
                          <select
                            value={step.channel}
                            onChange={(e) =>
                              updateStep(step.id, {
                                channel: e.target.value as DeliveryChannel,
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                          >
                            {channels.map((c) => (
                              <option key={c} value={c}>
                                {channelLabel[c]}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500">
                            Espera após passo anterior
                          </label>
                          {index === 0 ? (
                            <p className="mt-1 rounded-lg border border-dashed border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
                              Imediato após o gatilho (primeiro passo)
                            </p>
                          ) : (
                            <select
                              value={step.delayAfterPrevious}
                              onChange={(e) =>
                                updateStep(step.id, {
                                  delayAfterPrevious: e.target.value as StepDelay,
                                })
                              }
                              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                            >
                              {delays.map((d) => (
                                <option key={d} value={d}>
                                  {delayLabel[d]}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500">
                            Condição
                          </label>
                          <select
                            value={step.condition}
                            onChange={(e) =>
                              updateStep(step.id, {
                                condition: e.target.value as StepCondition,
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                          >
                            {conditions.map((c) => (
                              <option key={c} value={c}>
                                {conditionLabel[c]}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-white bg-white shadow-[0px_20px_40px_rgba(44,80,140,0.08)]">
            <div className="flex flex-col gap-1 border-b border-slate-100 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-headline-md text-headline-md text-slate-800">
                Workflows de entrega
              </h2>
              <p className="text-sm text-slate-500">{workflows.length} definidos</p>
            </div>
            {workflows.length === 0 ? (
              <div className="px-8 py-16 text-center text-slate-500">
                <p className="font-label-md text-slate-600">Ainda não há workflows.</p>
                <p className="mt-1 text-sm">Cria o primeiro para orquestrar canais e reforços.</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-50">
                {workflows.map((wf) => {
                  const st = statusStyle[wf.status]
                  return (
                    <li
                      key={wf.id}
                      className="flex flex-col gap-4 px-8 py-5 transition-colors hover:bg-slate-50 lg:flex-row lg:items-start lg:gap-6"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F2F5F8] text-[#2C508C]">
                        <span className="material-symbols-outlined">account_tree</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-label-md text-slate-800">{wf.name}</p>
                          <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-slate-600">
                            {triggerLabel[wf.trigger]}
                          </span>
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-black uppercase ${st.className}`}
                          >
                            {st.label}
                          </span>
                        </div>
                        {wf.description ? (
                          <p className="mt-1 text-sm text-slate-500">{wf.description}</p>
                        ) : null}
                        <p className="mt-2 text-sm font-medium text-slate-700">{stepSummary(wf)}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {wf.steps.map((s, i) => (
                            <span key={s.id}>
                              {i > 0 ? " · " : ""}
                              {i === 0
                                ? conditionLabel[s.condition]
                                : `${delayLabel[s.delayAfterPrevious]} — ${conditionLabel[s.condition]}`}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:border-0 sm:pt-0 lg:flex-col lg:items-end">
                        <p className="text-xs font-semibold uppercase text-slate-400">
                          Atualizado {wf.updatedAtLabel}
                        </p>
                        <button
                          type="button"
                          onClick={() => openEdit(wf)}
                          className="rounded-lg border border-[#2C508C]/30 bg-[#2C508C]/5 px-3 py-1.5 text-sm font-semibold text-[#2C508C] transition hover:bg-[#2C508C]/10"
                        >
                          Editar
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
