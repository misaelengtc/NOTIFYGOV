import { notificationStats } from "../../data/notifications"

export function NotificationStatsRow() {
  return (
    <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
      {notificationStats.map((s) => (
        <div
          key={s.id}
          className="flex gap-4 rounded-xl border border-white bg-white p-6 shadow-[0px_20px_40px_rgba(44,80,140,0.08)]"
        >
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${s.iconWrapClass}`}>
            <span className="material-symbols-outlined">{s.icon}</span>
          </span>
          <div className="min-w-0">
            <p className="font-label-sm uppercase tracking-wider text-slate-500">{s.label}</p>
            <p className="mt-1 font-headline-md text-headline-md text-slate-800">{s.value}</p>
            <p className="mt-1 text-sm text-slate-500">{s.hint}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
