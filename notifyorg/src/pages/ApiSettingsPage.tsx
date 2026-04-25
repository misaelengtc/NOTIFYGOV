import { useState } from "react"
import { apiConnections } from "../data/apiConnections"
import { exposedApiSurfaces } from "../data/apiExposure"
import type { ApiConnectionStatus, ApiIngestMode } from "../types/apiConnections"
import type { ApiExposureAuth } from "../types/apiExposure"

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

const authLabel: Record<ApiExposureAuth, string> = {
  oauth2: "OAuth 2.0 (client credentials)",
  api_key: "Chave de API / HMAC",
  mtls: "mTLS (certificado)",
}

type ApiSettingsTab = "integrations" | "exposure"

export function ApiSettingsPage() {
  const [tab, setTab] = useState<ApiSettingsTab>("integrations")

  return (
    <main className="ml-64 mt-16 p-stack-lg">
      <div className="mx-auto max-w-[1280px] space-y-stack-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-[#2C508C]">Configuração API</h1>
            <p className="mt-1 font-body-md text-slate-500">
              Geres as <strong className="font-semibold text-slate-600">integrações que consomes</strong> e a{" "}
              <strong className="font-semibold text-slate-600">API que disponibilizas</strong> a parceiros
              (contratos, credenciais e estado).
            </p>
          </div>
          {tab === "integrations" ? (
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#2C508C] px-5 py-2.5 font-label-md text-white shadow-sm transition hover:bg-[#244a7a] sm:self-auto"
            >
              <span className="material-symbols-outlined text-xl">add_link</span>
              Ligar nova API
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-[#2C508C]/30 bg-[#2C508C]/5 px-5 py-2.5 font-label-md text-[#2C508C] shadow-sm transition hover:bg-[#2C508C]/10 sm:self-auto"
            >
              <span className="material-symbols-outlined text-xl">menu_book</span>
              Abrir documentação
            </button>
          )}
        </div>

        <div
          role="tablist"
          aria-label="Áreas de configuração API"
          className="flex flex-wrap gap-2 border-b border-slate-200 pb-0"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "integrations"}
            id="tab-integrations"
            aria-controls="panel-integrations"
            onClick={() => setTab("integrations")}
            className={`relative -mb-px rounded-t-lg px-4 py-2.5 text-sm font-semibold transition ${
              tab === "integrations"
                ? "border border-b-0 border-slate-200 bg-white text-[#2C508C] shadow-[0_-2px_0_0_white]"
                : "border border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            Integrações ligadas
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "exposure"}
            id="tab-exposure"
            aria-controls="panel-exposure"
            onClick={() => setTab("exposure")}
            className={`relative -mb-px rounded-t-lg px-4 py-2.5 text-sm font-semibold transition ${
              tab === "exposure"
                ? "border border-b-0 border-slate-200 bg-white text-[#2C508C] shadow-[0_-2px_0_0_white]"
                : "border border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            Disponibilização de API
          </button>
        </div>

        {tab === "integrations" ? (
          <div
            id="panel-integrations"
            role="tabpanel"
            aria-labelledby="tab-integrations"
            className="overflow-hidden rounded-xl border border-white bg-white shadow-[0px_20px_40px_rgba(44,80,140,0.08)]"
          >
            <div className="flex flex-col gap-1 border-b border-slate-100 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-headline-md text-headline-md text-slate-800">Sistemas de origem</h2>
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
        ) : (
          <div
            id="panel-exposure"
            role="tabpanel"
            aria-labelledby="tab-exposure"
            className="overflow-hidden rounded-xl border border-white bg-white shadow-[0px_20px_40px_rgba(44,80,140,0.08)]"
          >
            <div className="flex flex-col gap-1 border-b border-slate-100 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-headline-md text-headline-md text-slate-800">Superfícies expostas</h2>
              <p className="text-sm text-slate-500">
                {exposedApiSurfaces.length} entradas no catálogo de API pública
              </p>
            </div>
            <div className="divide-y divide-slate-50">
              {exposedApiSurfaces.map((surface) => {
                const st = statusStyle[surface.status]
                return (
                  <div
                    key={surface.id}
                    className="flex flex-col gap-4 px-8 py-5 transition-colors hover:bg-slate-50 lg:flex-row lg:items-center lg:gap-6"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F2F5F8] text-[#2C508C]">
                      <span className="material-symbols-outlined">{surface.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-label-md text-slate-800">{surface.name}</p>
                        <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-slate-600">
                          {authLabel[surface.auth]}
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-black uppercase ${st.className}`}
                        >
                          {st.label}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{surface.description}</p>
                      <p
                        className="mt-2 truncate font-mono text-xs text-slate-600"
                        title={surface.baseUrl}
                      >
                        {surface.baseUrl}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:border-0 sm:pt-0 lg:flex-col lg:items-end lg:border-0">
                      <div className="text-left sm:text-right">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Credenciais / certificados
                        </p>
                        <p className="text-sm font-bold text-slate-800">{surface.lastRotatedAt}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Ver contrato
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-[#2C508C]/30 bg-[#2C508C]/5 px-3 py-1.5 text-sm font-semibold text-[#2C508C] transition hover:bg-[#2C508C]/10"
                        >
                          Gerir acesso
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
