import { apiConnections } from "../data/apiConnections"
import type { ApiConnectionStatus, ApiIngestMode } from "../types/apiConnections"

const statusStyle: Record<
  ApiConnectionStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Ativo",
    className: "border border-emerald-100 bg-emerald-50 text-emerald-700",
  },
  degraded: {
    label: "Degradado",
    className: "border border-amber-100 bg-amber-50 text-amber-800",
  },
  paused: {
    label: "Pausado",
    className: "border border-slate-200 bg-slate-100 text-slate-600",
  },
  error: {
    label: "Erro",
    className: "border border-rose-100 bg-rose-50 text-rose-700",
  },
}

const modeLabel: Record<ApiIngestMode, string> = {
  webhook: "Webhook",
  polling: "Polling",
  import: "Importação",
}

export function ApiSettingsPage() {
  return (
    <main className="ml-64 mt-16 p-stack-lg">
      <div className="mx-auto max-w-[1280px] space-y-stack-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-[#2C508C]">Configuração API</h1>
            <p className="mt-1 font-body-md text-slate-500">
              APIs e integrações ligadas ao teu sistema. Monitoriza estado, modo de ingestão e
              última comunicação bem-sucedida.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#2C508C] px-5 py-2.5 font-label-md text-white shadow-sm transition hover:bg-[#244a7a] sm:self-auto"
          >
            <span className="material-symbols-outlined text-xl">add_link</span>
            Ligar nova API
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-white bg-white shadow-[0px_20px_40px_rgba(44,80,140,0.08)]">
          <div className="flex flex-col gap-1 border-b border-slate-100 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-headline-md text-headline-md text-slate-800">Integrações ligadas</h2>
            <p className="text-sm text-slate-500">
              {apiConnections.length} conexões registadas
            </p>
          </div>
          <div className="divide-y divide-slate-50">
            {apiConnections.map((api) => {
              const st = statusStyle[api.status]
              return (
                <div
                  key={api.id}
                  className="flex flex-col gap-4 px-8 py-5 transition-colors hover:bg-slate-50 lg:flex-row lg:items-center lg:gap-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F2F5F8] text-[#2C508C]">
                    <span className="material-symbols-outlined">{api.icon}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-label-md text-slate-800">{api.name}</p>
                      <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-slate-600">
                        {modeLabel[api.ingestMode]}
                      </span>
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-black uppercase ${st.className}`}
                      >
                        {st.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{api.description}</p>
                    <p className="mt-2 truncate font-mono text-xs text-slate-600" title={api.endpoint}>
                      {api.endpoint}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:border-0 sm:pt-0 lg:flex-col lg:items-end lg:border-0">
                    <div className="text-left sm:text-right">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Último sucesso
                      </p>
                      <p className="text-sm font-bold text-slate-800">{api.lastSuccessAt}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Detalhes
                      </button>
                      <button
                        type="button"
                        className="rounded-lg border border-[#2C508C]/30 bg-[#2C508C]/5 px-3 py-1.5 text-sm font-semibold text-[#2C508C] transition hover:bg-[#2C508C]/10"
                      >
                        Testar ligação
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
