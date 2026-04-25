import { summaryCards } from "../../data/dashboard"

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
      {summaryCards.map((c) => (
        <div
          key={c.id}
          className="flex flex-col gap-2 rounded-xl border border-white bg-white p-6 shadow-[0px_20px_40px_rgba(44,80,140,0.08)]"
        >
          <div className="flex items-start justify-between">
            <span className={`rounded-lg p-2 ${c.iconWrapClass}`}>
              <span className="material-symbols-outlined">{c.icon}</span>
            </span>
            <span
              className={`flex items-center gap-1 text-sm font-bold ${c.trend.className}`}
            >
              {c.trend.value}{" "}
              <span className="material-symbols-outlined text-sm">{c.trend.icon}</span>
            </span>
          </div>
          <p className="mt-2 font-label-sm uppercase tracking-wider text-slate-500">
            {c.label}
          </p>
          <p className={`text-3xl font-black ${c.valueClass}`}>{c.value}</p>
        </div>
      ))}
    </div>
  )
}
