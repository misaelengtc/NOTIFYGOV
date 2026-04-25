import { avatarUrl } from "../../data/dashboard"

type Props = { searchPlaceholder?: string }

export function TopNavBar({ searchPlaceholder = "Pesquisar..." }: Props) {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full max-w-full items-center justify-between border-b border-white/20 bg-white/70 px-12 font-['Public_Sans'] shadow-sm antialiased backdrop-blur-xl">
      <div className="flex items-center">
        <span className="text-xl font-black tracking-tight text-[#2C508C]">
          Notify
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            className="w-64 rounded-full border border-slate-200 bg-white/50 py-1.5 pl-10 pr-4 text-sm outline-none focus:border-[#5CA7DD] focus:ring-2 focus:ring-[#5CA7DD]/20"
            placeholder={searchPlaceholder}
            type="search"
            name="q"
            autoComplete="off"
          />
        </div>
        <button
          type="button"
          className="material-symbols-outlined text-slate-600 transition-colors hover:text-[#2C508C]"
          aria-label="Idioma"
        >
          language
        </button>
        <button
          type="button"
          className="material-symbols-outlined text-slate-600 transition-colors hover:text-[#2C508C]"
          aria-label="Notificações"
        >
          notifications
        </button>
        <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-full border-2 border-[#2C508C]/20 duration-200 active:scale-95">
          <img
            className="h-full w-full object-cover"
            alt="Foto de perfil do administrador"
            src={avatarUrl}
            width={32}
            height={32}
          />
        </div>
      </div>
    </header>
  )
}
