import { sideNavItems } from "../../data/dashboard"
import type { AppPage } from "../../types/app"

type Props = {
  activePage: AppPage
  onNavigate: (page: AppPage) => void
}

export function SideNavBar({ activePage, onNavigate }: Props) {
  return (
    <aside className="fixed left-0 top-16 flex h-[calc(100vh-4rem)] w-64 flex-col gap-2 border-r border-slate-200 bg-[#F2F5F8] p-4 font-['Public_Sans'] text-sm">
      <div className="mb-4 space-y-1 px-4">

        <p className="text-lg font-bold text-slate-800">Gestão SaaS</p>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Painel Administrativo
        </p>
      </div>
      {sideNavItems.map((item) => (
        <button
          key={item.page}
          type="button"
          onClick={() => onNavigate(item.page)}
          className={
            activePage === item.page
              ? "flex w-full translate-x-0 items-center gap-3 rounded-lg bg-white px-4 py-3 text-left font-semibold text-[#2C508C] shadow-sm transition-transform duration-200 hover:translate-x-1"
              : "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-500 transition-transform duration-200 hover:translate-x-1 hover:bg-slate-100"
          }
        >
          <span className="material-symbols-outlined" data-icon={item.icon}>
            {item.icon}
          </span>
          {item.label}
        </button>
      ))}
      <div className="mt-auto">
        <a
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-500 transition-transform duration-200 hover:translate-x-1 hover:bg-slate-100"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="settings">
            settings
          </span>
          Configurações
        </a>
      </div>
    </aside>
  )
}
