export function AIModePanel() {
  return (
    <div className="rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50/90 to-white p-6 shadow-[0px_20px_40px_rgba(44,80,140,0.08)]">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
          <span className="material-symbols-outlined">smart_toy</span>
        </span>
        <div>
          <p className="font-headline-md text-headline-md text-slate-800">Notificações automáticas</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            A IA analisa públicos, canais, horários e histórico de engajamento para decidir{" "}
            <strong className="font-semibold text-slate-800">quem recebe</strong>,{" "}
            <strong className="font-semibold text-slate-800">por qual canal</strong> e{" "}
            <strong className="font-semibold text-slate-800">com qual tom</strong>. Você define
            políticas e limites; o sistema executa e registra cada decisão para auditoria.
          </p>
        </div>
      </div>
      <ul className="mt-4 space-y-2 border-t border-violet-100/80 pt-4 text-sm text-slate-600">
        <li className="flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-emerald-600">check_circle</span>
          Motor ativo — fila estável
        </li>
        <li className="flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-[#2C508C]">policy</span>
          Política: consentimento e opt-out respeitados
        </li>
        <li className="flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-amber-600">tune</span>
          3 fluxos aguardando calibração de limite diário
        </li>
      </ul>
      <button
        type="button"
        className="mt-5 w-full rounded-lg border border-violet-200 bg-white py-2.5 font-label-md text-violet-800 shadow-sm transition hover:bg-violet-50"
      >
        Ajustar regras da IA
      </button>
    </div>
  )
}
