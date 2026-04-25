export function ManualModePanel() {
  return (
    <div className="rounded-xl border border-white bg-white p-6 shadow-[0px_20px_40px_rgba(44,80,140,0.08)]">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <span className="material-symbols-outlined">draw</span>
        </span>
        <div>
          <p className="font-headline-md text-headline-md text-slate-800">Notificações manuais</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Criadas e enviadas diretamente pela equipe: texto fixo, anexos, listas importadas ou
            segmentos salvos. Ideais para comunicados pontuais e situações em que o controle
            editorial precisa ser 100% humano.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#2C508C] py-3 font-label-md text-white shadow-sm transition hover:bg-[#244a7a]"
      >
        <span className="material-symbols-outlined text-xl">add_circle</span>
        Nova notificação manual
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">
        Rascunhos podem ser enviados para revisão antes do disparo.
      </p>
    </div>
  )
}
