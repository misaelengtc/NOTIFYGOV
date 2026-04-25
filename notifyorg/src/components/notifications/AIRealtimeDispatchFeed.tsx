import { useCallback, useEffect, useMemo, useState } from "react"
import {
  aiRealtimeSeed,
  aiRealtimeTemplates,
  nextAIRealtimeId,
} from "../../data/notifications"
import type { AIRealtimeLine, AIRealtimeStatus } from "../../types/notifications"

const nf = new Intl.NumberFormat("pt-BR")

const channelIcon = {
  email: "mail",
  sms: "sms",
  push: "notifications_active",
  whatsapp: "chat",
} as const

const channelTitle: Record<keyof typeof channelIcon, string> = {
  email: "E-mail",
  sms: "SMS",
  push: "Push",
  whatsapp: "WhatsApp",
}

const statusUi: Record<AIRealtimeStatus, { className: string; dotClass?: string }> = {
  queued: { className: "bg-slate-100 text-slate-600 border border-slate-200" },
  dispatching: {
    className: "bg-amber-50 text-amber-800 border border-amber-200",
    dotClass: "bg-amber-500 animate-pulse",
  },
  sent: { className: "bg-emerald-50 text-emerald-700 border border-emerald-100" },
}

function sortLines(a: AIRealtimeLine, b: AIRealtimeLine) {
  const rank: Record<AIRealtimeStatus, number> = {
    dispatching: 0,
    queued: 1,
    sent: 2,
  }
  const d = rank[a.status] - rank[b.status]
  if (d !== 0) return d
  return a.id.localeCompare(b.id)
}

function cloneSeed(): AIRealtimeLine[] {
  return aiRealtimeSeed.map((row) => ({ ...row }))
}

export function AIRealtimeDispatchFeed() {
  const [lines, setLines] = useState<AIRealtimeLine[]>(cloneSeed)

  const tick = useCallback(() => {
    setLines((prev) => {
      let next = prev.map((line) => {
        if (line.status !== "dispatching") return line
        const remaining = line.total - line.sent
        if (remaining <= 0) {
          return { ...line, sent: line.total, status: "sent" as const }
        }
        const chunk = Math.max(
          1,
          Math.min(remaining, Math.ceil(remaining * (0.04 + Math.random() * 0.06))),
        )
        const sent = line.sent + chunk
        return sent >= line.total
          ? { ...line, sent: line.total, status: "sent" as const }
          : { ...line, sent }
      })

      const dispatching = next.filter((l) => l.status === "dispatching").length
      const maxConcurrent = 2
      if (dispatching < maxConcurrent) {
        const queued = next.find((l) => l.status === "queued")
        if (queued) {
          next = next.map((l) =>
            l.id === queued.id ? { ...l, status: "dispatching" as const } : l,
          )
        }
      }

      const canSpawn =
        next.length < 8 &&
        next.filter((l) => l.status === "dispatching" || l.status === "queued").length < 5 &&
        Math.random() < 0.12

      if (canSpawn) {
        const tpl = aiRealtimeTemplates[Math.floor(Math.random() * aiRealtimeTemplates.length)]
        next = [
          {
            ...tpl,
            id: nextAIRealtimeId(),
            sent: 0,
          },
          ...next,
        ]
      }

      return [...next].sort(sortLines)
    })
  }, [])

  useEffect(() => {
    const id = window.setInterval(tick, 1100)
    return () => window.clearInterval(id)
  }, [tick])

  const sorted = useMemo(() => [...lines].sort(sortLines), [lines])

  return (
    <div className="overflow-hidden rounded-xl border border-white bg-white shadow-[0px_20px_40px_rgba(44,80,140,0.08)]">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-headline-md text-headline-md text-slate-800">
              Envios em tempo real (IA)
            </h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-800">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Ao vivo
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Monitorização dos disparos automáticos que o motor está a executar neste momento —
            apenas envio, sem caixa de entrada.
          </p>
        </div>
      </div>
      <div className="divide-y divide-slate-50">
        {sorted.map((n) => {
          const st = statusUi[n.status]
          const pct = n.total > 0 ? Math.min(100, Math.round((n.sent / n.total) * 100)) : 0
          return (
            <div
              key={n.id}
              className={`flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-start sm:gap-6 sm:px-8 sm:py-4 ${
                n.status === "dispatching" ? "bg-violet-50/40" : "transition-colors hover:bg-slate-50"
              }`}
            >
              <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-center">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                  <span className="material-symbols-outlined text-xl">smart_toy</span>
                  {n.status === "dispatching" ? (
                    <span
                      className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-amber-500"
                      aria-hidden
                    />
                  ) : null}
                </div>
                <div className="flex gap-1 sm:mt-0">
                  {n.channels.map((ch) => (
                    <span
                      key={ch}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 ${
                        ch === "whatsapp" ? "text-emerald-600" : "text-slate-500"
                      }`}
                      title={channelTitle[ch]}
                    >
                      <span className="material-symbols-outlined text-sm">{channelIcon[ch]}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-label-md text-slate-800">{n.title}</p>
                  <span className="inline-flex items-center gap-1 rounded border border-violet-100 bg-violet-50 px-2 py-0.5 text-[10px] font-black uppercase text-violet-800">
                    <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                    Automática · IA
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{n.preview}</p>
                <div className="mt-3 rounded-lg border border-violet-100 bg-violet-50/50 px-3 py-2 text-xs text-violet-900">
                  <span className="font-semibold text-violet-800">Decisão da IA: </span>
                  {n.aiContext}
                </div>
                {n.status !== "sent" ? (
                  <div className="mt-3">
                    <div className="mb-1 flex justify-between text-xs text-slate-500">
                      <span>Progresso do lote</span>
                      <span className="font-semibold text-slate-700">{pct}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-[width] duration-300 ${
                          n.status === "dispatching" ? "bg-[#5CA7DD]" : "bg-slate-300"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="shrink-0 text-left sm:w-44 sm:text-right">
                <div className="flex items-center gap-2 sm:justify-end">
                  {st.dotClass ? (
                    <span className={`h-2 w-2 shrink-0 rounded-full ${st.dotClass}`} aria-hidden />
                  ) : null}
                  <p className="text-sm font-bold text-slate-800">
                    {n.status === "dispatching"
                      ? "Ao vivo"
                      : n.status === "queued"
                        ? "Aguarda envio"
                        : "Concluído"}
                  </p>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {nf.format(n.sent)} / {nf.format(n.total)} destinatários
                </p>
                <span
                  className={`mt-2 inline-block rounded px-2 py-0.5 text-[10px] font-black uppercase ${st.className}`}
                >
                  {n.status === "dispatching" ? "ENVIANDO" : n.status === "queued" ? "EM FILA" : "CONCLUÍDO"}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
