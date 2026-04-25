import { channelRows } from "../../data/dashboard"

export function ChannelBreakdown() {
  return (
    <div className="rounded-xl border border-white bg-white p-8 shadow-[0px_20px_40px_rgba(44,80,140,0.08)]">
      <h3 className="mb-8 font-headline-md text-headline-md text-slate-800">
        Performance por Canal
      </h3>
      <div className="space-y-6">
        {channelRows.map((row) => (
          <div key={row.label}>
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2 font-label-md text-slate-700">
                <span
                  className={`material-symbols-outlined text-sm ${row.labelIconClass}`}
                >
                  {row.icon}
                </span>{" "}
                {row.label}
              </span>
              <span className={`text-sm font-bold ${row.valueClass}`}>{row.pct}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className={`h-full rounded-full ${row.barClass}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-xl border border-slate-200 bg-[#F2F5F8] p-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
          Insights da IA
        </p>
        <p className="text-sm text-slate-700">
          O canal <strong className="text-[#2C508C]">Email</strong> continua com a maior
          taxa de entrega. Considere aumentar as campanhas via Push para usuários em
          dispositivos móveis durante o horário comercial.
        </p>
      </div>
    </div>
  )
}
