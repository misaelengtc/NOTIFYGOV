import { useEffect, useMemo, useState } from "react"
import { trackedNotifications } from "../../data/notificationTracking"
import type { NotificationHistoryEventType, TrackedNotification } from "../../types/notificationTracking"

const eventIcon: Record<NotificationHistoryEventType, string> = {
  queued: "schedule",
  sent: "send",
  delivered: "mark_email_read",
  opened: "visibility",
  link_clicked: "link",
  attachment_viewed: "attach_file",
  attachment_downloaded: "download",
  reply_received: "reply",
  confirmation_cmd: "verified_user",
  confirmation_declined: "cancel",
  failed: "error",
}

const eventAccent: Record<NotificationHistoryEventType, string> = {
  queued: "bg-slate-100 text-slate-600",
  sent: "bg-blue-50 text-[#2C508C]",
  delivered: "bg-emerald-50 text-emerald-700",
  opened: "bg-amber-50 text-amber-800",
  link_clicked: "bg-sky-50 text-sky-800",
  attachment_viewed: "bg-purple-50 text-purple-800",
  attachment_downloaded: "bg-purple-50 text-purple-900",
  reply_received: "bg-indigo-50 text-indigo-800",
  confirmation_cmd: "bg-teal-50 text-teal-800",
  confirmation_declined: "bg-rose-50 text-rose-700",
  failed: "bg-rose-100 text-rose-800",
}

function confirmationSummary(n: TrackedNotification): string {
  if (n.timeline.some((e) => e.type === "confirmation_cmd")) {
    return "Confirmada via Chave Móvel Digital (CMD)"
  }
  if (n.timeline.some((e) => e.type === "confirmation_declined")) {
    return "Recusada pelo destinatário (ecrã de aceite)"
  }
  if (n.cmdConfirmed === null) {
    return "CMD / aceite formal não aplicável a este envio"
  }
  if (n.cmdConfirmed === false) {
    return "Sem confirmação positiva registada"
  }
  return "Confirmada (outro mecanismo)"
}

export function NotificationSearchHistory() {
  const [query, setQuery] = useState("")
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(
    trackedNotifications[0]?.protocol ?? null,
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return trackedNotifications
    return trackedNotifications.filter((n) => {
      const blob = [
        n.protocol,
        n.title,
        n.summary,
        n.recipientMasked,
        n.subjectRef,
        ...n.channels,
        ...(n.attachmentNames ?? []),
        n.replySnippet ?? "",
      ]
        .join(" ")
        .toLowerCase()
      return blob.includes(q)
    })
  }, [query])

  useEffect(() => {
    setSelectedProtocol((current) => {
      if (filtered.length === 0) return null
      if (!current || !filtered.some((n) => n.protocol === current)) {
        return filtered[0]!.protocol
      }
      return current
    })
  }, [filtered])

  const selected =
    filtered.find((n) => n.protocol === selectedProtocol) ?? filtered[0] ?? null

  return (
    <section
      className="overflow-hidden rounded-xl border border-white bg-white shadow-[0px_20px_40px_rgba(44,80,140,0.08)]"
      aria-labelledby="notif-search-heading"
    >
      <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
        <h2 id="notif-search-heading" className="font-headline-md text-headline-md text-slate-800">
          Pesquisar notificação e histórico
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Consulta por <strong className="font-medium text-slate-700">protocolo</strong>, assunto,
          referência ou destinatário mascarado. A linha do tempo inclui{" "}
          <strong className="font-medium text-slate-700">aberturas</strong>,{" "}
          <strong className="font-medium text-slate-700">cliques em links</strong>,{" "}
          <strong className="font-medium text-slate-700">anexos</strong>,{" "}
          <strong className="font-medium text-slate-700">respostas</strong> e confirmações com{" "}
          <strong className="font-medium text-slate-700">Chave Móvel Digital</strong> quando o fluxo
          institucional o exige (dados ilustrativos).
        </p>
        <div className="relative mt-4">
          <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex.: NOT-2026-004812, Assunto, CNI, Passaporte, NIF, Telemóvel."
            className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition-all focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20"
            aria-label="Pesquisar notificações"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 lg:divide-x lg:divide-slate-100">
        <div className="max-h-[420px] overflow-y-auto lg:col-span-5">
          {filtered.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-slate-500 sm:px-8">
              Nenhum resultado. Ajusta o termo de pesquisa.
            </p>
          ) : (
            <ul className="divide-y divide-slate-50">
              {filtered.map((n) => {
                const active = selected?.protocol === n.protocol
                return (
                  <li key={n.protocol}>
                    <button
                      type="button"
                      onClick={() => setSelectedProtocol(n.protocol)}
                      className={`flex w-full flex-col gap-1 px-6 py-4 text-left transition sm:px-8 ${
                        active ? "bg-[#2C508C]/5" : "hover:bg-slate-50"
                      }`}
                    >
                      <span className="font-mono text-xs font-bold text-[#2C508C]">{n.protocol}</span>
                      <span className="font-label-md text-slate-800">{n.title}</span>
                      <span className="text-xs text-slate-500">{n.sentAt}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="min-h-[320px] border-t border-slate-100 bg-slate-50/50 p-6 sm:p-8 lg:col-span-7 lg:border-t-0">
          {!selected ? (
            <p className="text-sm text-slate-500">Seleciona uma notificação na lista.</p>
          ) : (
            <NotificationDetail n={selected} />
          )}
        </div>
      </div>
    </section>
  )
}

function NotificationDetail({ n }: { n: TrackedNotification }) {
  return (
    <div className="space-y-6">
      <header>
        <p className="font-mono text-xs font-bold uppercase tracking-wide text-[#2C508C]">
          {n.protocol}
        </p>
        <h3 className="mt-1 font-headline-md text-headline-md text-slate-900">{n.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{n.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${
              n.opened
                ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100"
                : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
            }`}
          >
            {n.opened ? "Aberta pelo destinatário" : "Sem abertura registada"}
          </span>
          <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-bold uppercase text-sky-900 ring-1 ring-sky-100">
            Cliques em link: {n.linkClicksCount}
          </span>
          <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-bold uppercase text-teal-900 ring-1 ring-teal-100">
            {confirmationSummary(n)}
          </span>
          {n.hasAttachments ? (
            <span className="rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-bold uppercase text-purple-900 ring-1 ring-purple-100">
              Com anexo(s)
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase text-slate-500 ring-1 ring-slate-200">
              Sem anexos
            </span>
          )}
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ring-1 ${
              n.mode === "manual"
                ? "bg-slate-800 text-white ring-slate-800"
                : "bg-violet-100 text-violet-900 ring-violet-200"
            }`}
          >
            {n.mode === "manual" ? "Manual" : "Automática (IA)"}
          </span>
        </div>
      </header>

      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Canais</dt>
          <dd className="mt-1 font-medium text-slate-800">{n.channels.join(" · ")}</dd>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Disparo</dt>
          <dd className="mt-1 font-medium text-slate-800">{n.sentAt}</dd>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 sm:col-span-2">
          <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
            Destinatário
          </dt>
          <dd className="mt-1 font-medium text-slate-800">{n.recipientMasked}</dd>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 sm:col-span-2">
          <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
            Referência / assunto
          </dt>
          <dd className="mt-1 font-medium text-slate-800">{n.subjectRef}</dd>
        </div>
      </dl>

      {n.hasAttachments && n.attachmentNames?.length ? (
        <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-purple-900">Anexos</p>
          <ul className="mt-2 space-y-1">
            {n.attachmentNames.map((name) => (
              <li
                key={name}
                className="flex items-center gap-2 text-sm text-purple-950"
              >
                <span className="material-symbols-outlined text-lg text-purple-700">description</span>
                {name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {n.replySnippet ? (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-indigo-900">
            Resposta do cidadão
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-indigo-950">{n.replySnippet}</p>
        </div>
      ) : null}

      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-500">
          Linha do tempo (auditoria)
        </p>
        <ol className="space-y-4">
          {n.timeline.map((ev) => (
            <li key={ev.id} className="flex gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${eventAccent[ev.type]}`}
              >
                <span className="material-symbols-outlined text-lg">{eventIcon[ev.type]}</span>
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  {ev.at}
                </p>
                <p className="mt-0.5 font-semibold text-slate-800">{ev.title}</p>
                {ev.detail ? (
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{ev.detail}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
