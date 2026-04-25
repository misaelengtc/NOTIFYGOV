import type { ReactNode } from "react"
import type { AppPage } from "../../types/app"
import { SideNavBar } from "./SideNavBar"
import { TopNavBar } from "./TopNavBar"

type Props = {
  children: ReactNode
  activePage: AppPage
  onNavigate: (page: AppPage) => void
}

export function AppShell({ children, activePage, onNavigate }: Props) {
  return (
    <div className="min-h-screen text-on-surface">
      <TopNavBar />
      <SideNavBar activePage={activePage} onNavigate={onNavigate} />
      {children}
    </div>
  )
}
