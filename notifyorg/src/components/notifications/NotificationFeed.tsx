import { useMemo, useState } from "react"
import { notificationFeed } from "../../data/notifications"
import type { NotificationListItem, NotificationMode } from "../../types/notifications"

type Filter = "all" | NotificationMode

const channelIcon: Record<NotificationListItem["channels"][number], string> = {
  email: "mail",
  sms: "sms",
  push: "notifications_active",
}

const statusStyle: Record<
  NotificationListItem["status"],
  { label: string; className: string }
> = {
  sent: { label: "Enviado", className: "bg-emerald-50 text-emerald-700 border border-emerald-100" },
  scheduled: {
    label: "Agendado",
    className: "bg-blue-50 text-[#2C508C] border border-blue-100",
  },
  draft: { label: "Rascunho", className: "bg-slate-100 text-slate-600 border border-slate-200" },
  processing: {
    label: "Processando",
    className: "bg-amber-50 text-amber-700 border border-amber-100",
  },
}

const modeBadge: Record<
  NotificationMode,
  { label: string; icon: string; className: string }
> = {
  automatic: {
    label: "Automática · IA",
    icon: "smart_toy",
    className: "bg-violet-50 text-violet-800 border border-violet-100",
  },
  manual: {
    label: "Manual",
    icon: "person",
    className: "bg-slate-50 text-slate-700 border border-slate-200",
  },
}

const tabs: { id: Filter; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "automatic", label: "Automáticas (IA)" },
  { id: "manual", label: "Manuais" },
]

export function NotificationFeed() {
  const [filter, setFilter] = useState<Filter>("all")

  const items = useMemo(() => {
    if (filter === "all") return notificationFeed
    return notificationFeed.filter((n) => n.mode === filter)
  }, [filter])

  return (
    <div className="overflow-hidden rounded-xl border border-white bg-white shadow-[0px_20px_40px_rgba(44,80,140,0.08)]">
      <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
        <h3 className="font-headline-md text-headline-md text-slate-800">Atividade recente</h3>
        <div className="flex flex-wrap gap-2 rounded-lg bg-[#F2F5F8] p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilter(t.id)}
              className={
                filter === t.id
                  ? "rounded-md bg-white px-3 py-1.5 font-label-md text-[#2C508C] shadow-sm"
                  : "rounded-md px-3 py-1.5 font-label-md text-slate-600 transition hover:text-slate-800"
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-slate-50">
        {items.map((n) => {
          const st = statusStyle[n.status]
          const mb = modeBadge[n.mode]
          return (
            <div
              key={n.id}
              className="flex flex-col gap-4 px-6 py-5 transition-colors hover:bg-slate-50 sm:flex-row sm:items-start sm:gap-6 sm:px-8 sm:py-4"
            >
              <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    n.mode === "automatic"
                      ? "bg-violet-100 text-violet-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">{mb.icon}</span>
                </div>
                <div className="flex gap-1 sm:mt-0">
                  {n.channels.map((ch) => (
                    <span
                      key={ch}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500"
                      title={ch}
                    >
                      <span className="material-symbols-outlined text-sm">{channelIcon[ch]}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-label-md text-slate-800">{n.title}</p>
                  <span
                    className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-black uppercase ${mb.className}`}
                  >
                    <span className="material-symbols-outlined text-[14px]">{mb.icon}</span>
                    {mb.label}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{n.preview}</p>
                {n.mode === "automatic" && n.aiContext ? (
                  <div className="mt-3 rounded-lg border border-violet-100 bg-violet-50/50 px-3 py-2 text-xs text-violet-900">
                    <span className="font-semibold text-violet-800">Contexto da IA: </span>
                    {n.aiContext}
                  </div>
                ) : null}
              </div>
              <div className="shrink-0 text-left sm:text-right">
                <p className="text-sm font-bold text-slate-800">{n.timeLabel}</p>
                <p className="mt-0.5 text-xs text-slate-500">{n.recipientsLabel}</p>
                <span
                  className={`mt-2 inline-block rounded px-2 py-0.5 text-[10px] font-black uppercase ${st.className}`}
                >
                  {st.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
