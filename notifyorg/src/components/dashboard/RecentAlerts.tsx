import { recentAlerts } from "../../data/dashboard"

export function RecentAlerts() {
  return (
    <div className="overflow-hidden rounded-xl border border-white bg-white shadow-[0px_20px_40px_rgba(44,80,140,0.08)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
        <h3 className="font-headline-md text-headline-md text-slate-800">Alertas Recentes</h3>
        <button
          type="button"
          className="font-label-md text-[#2C508C] hover:underline"
        >
          Ver todos
        </button>
      </div>
      <div className="divide-y divide-slate-50">
        {recentAlerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center gap-6 px-8 py-4 transition-colors hover:bg-slate-50"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${alert.iconWrapClass}`}
            >
              <span className="material-symbols-outlined">{alert.icon}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-label-md text-slate-800">{alert.title}</p>
              <p className="text-sm text-slate-500">{alert.description}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-bold text-slate-800">{alert.time}</p>
              <span
                className={`mt-0.5 inline-block rounded px-2 py-0.5 text-[10px] font-black uppercase ${alert.tag.className}`}
              >
                {alert.tag.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
