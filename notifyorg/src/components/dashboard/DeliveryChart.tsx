import { deliveryBars } from "../../data/dashboard"

const periodOptions = ["Últimos 7 dias", "Últimos 30 dias", "Este ano"] as const

export function DeliveryChart() {
  return (
    <div className="rounded-xl border border-white bg-white p-8 shadow-[0px_20px_40px_rgba(44,80,140,0.08)] lg:col-span-2">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="font-headline-md text-headline-md text-slate-800">Tendência de Entrega</h3>
        <select
          className="rounded-lg border-slate-200 bg-slate-50 text-sm focus:border-[#2C508C] focus:ring-[#2C508C]"
          defaultValue={periodOptions[0]}
          name="period"
        >
          {periodOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div className="relative flex h-[300px] w-full items-end gap-4 border-b border-slate-100 px-4">
        {deliveryBars.map((day) => (
          <div
            key={day.label}
            className="group relative flex-1 cursor-pointer rounded-t-lg bg-slate-100 transition-colors hover:bg-[#2C508C]/20"
            style={{ height: `${day.trackHeightPct}%` }}
            title={day.label}
          >
            <div
              className="absolute bottom-0 w-full rounded-t-lg bg-[#2C508C] transition-all"
              style={{ height: `${day.barHeightPct}%` }}
            />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
