import type { FormEvent, ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { getDashboardChatReply } from "../../lib/dashboardChatbot"

type Role = "user" | "assistant"

type ChatMessage = {
  id: string
  role: Role
  text: string
}

function newMsgId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function formatAssistantText(text: string): ReactNode {
  const out: ReactNode[] = []
  const re = /\*\*(.+?)\*\*/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      out.push(text.slice(last, m.index))
    }
    out.push(
      <strong key={`b${k++}`} className="font-semibold text-slate-800">
        {m[1]}
      </strong>,
    )
    last = m.index + m[0].length
  }
  if (last < text.length) {
    out.push(text.slice(last))
  }
  return <span className="whitespace-pre-wrap">{out}</span>
}

const suggestedPrompts = [
  "Resumo dos quatro indicadores",
  "Qual canal tem melhor taxa de entrega?",
  "Há alertas urgentes?",
  "Qual o melhor dia na tendência semanal?",
]

const initialAssistant: ChatMessage = {
  id: newMsgId(),
  role: "assistant",
  text: "Olá. Pergunta em linguagem natural sobre **totais**, **canais**, **alertas** ou **tendência** desta visão — uso os mesmos dados dos cartões e listas (ilustrativos).",
}

export function DashboardInsightChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialAssistant])
  const [input, setInput] = useState("")
  const listEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMsg: ChatMessage = { id: newMsgId(), role: "user", text: trimmed }
    const reply = getDashboardChatReply(trimmed)
    const botMsg: ChatMessage = { id: newMsgId(), role: "assistant", text: reply }
    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput("")
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    send(input)
  }

  return (
    <section
      className="overflow-hidden rounded-xl border border-white bg-white shadow-[0px_20px_40px_rgba(44,80,140,0.08)]"
      aria-label="Assistente sobre os dados da visão geral"
    >
      <div className="flex flex-col gap-1 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2C508C]/10 text-[#2C508C]">
            <span className="material-symbols-outlined text-2xl">chat</span>
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md text-slate-800">
              Assistente da visão geral
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Respostas calculadas a partir dos dados mostrados nesta página.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-50 bg-slate-50/80 px-4 py-3 sm:px-8">
        {suggestedPrompts.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => send(p)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-xs font-semibold text-[#2C508C] shadow-sm transition hover:border-[#2C508C]/30 hover:bg-[#2C508C]/5"
          >
            {p}
          </button>
        ))}
      </div>

      <div className="max-h-[min(360px,50vh)] space-y-4 overflow-y-auto px-4 py-4 sm:px-8 sm:py-5">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[min(100%,520px)] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "rounded-br-md bg-[#2C508C] text-white"
                  : "rounded-bl-md border border-slate-100 bg-slate-50 text-slate-700"
              }`}
            >
              {m.role === "assistant" ? formatAssistantText(m.text) : m.text}
            </div>
          </div>
        ))}
        <div ref={listEndRef} />
      </div>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 border-t border-slate-100 bg-white p-4 sm:flex-row sm:items-end sm:gap-3 sm:px-8 sm:py-4"
      >
        <label className="sr-only" htmlFor="dashboard-chat-input">
          A tua pergunta sobre os dados
        </label>
        <textarea
          id="dashboard-chat-input"
          name="dashboardChat"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              send(input)
            }
          }}
          placeholder="Ex.: Quantas mensagens foram entregues?"
          className="min-h-[44px] w-full resize-y rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20 sm:flex-1"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2C508C] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#244a7a] sm:self-stretch"
        >
          <span className="material-symbols-outlined text-xl">send</span>
          Enviar
        </button>
      </form>
    </section>
  )
}
