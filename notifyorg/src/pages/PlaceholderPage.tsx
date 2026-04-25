type Props = { title: string; description: string }

export function PlaceholderPage({ title, description }: Props) {
  return (
    <main className="ml-64 mt-16 p-stack-lg">
      <div className="mx-auto max-w-[1280px] space-y-stack-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-[#2C508C]">{title}</h1>
          <p className="mt-1 font-body-md text-slate-500">{description}</p>
        </div>
        <div className="rounded-xl border border-white bg-white p-10 text-center shadow-[0px_20px_40px_rgba(44,80,140,0.08)]">
          <span className="material-symbols-outlined text-5xl text-slate-300">construction</span>
          <p className="mt-4 font-label-md text-slate-600">Módulo em construção</p>
          <p className="mt-1 text-sm text-slate-500">Esta área será disponibilizada em breve.</p>
        </div>
      </div>
    </main>
  )
}
