import { useState } from "react"
import { AppShell } from "./components/layout/AppShell"
import type { AppPage } from "./types/app"
import { DashboardPage } from "./pages/DashboardPage"
import { NotificationsPage } from "./pages/NotificationsPage"
import { PlaceholderPage } from "./pages/PlaceholderPage"

export function App() {
  const [activePage, setActivePage] = useState<AppPage>("dashboard")

  const pageContent =
    activePage === "dashboard" ? (
      <DashboardPage />
    ) : activePage === "notifications" ? (
      <NotificationsPage />
    ) : activePage === "campaigns" ? (
      <PlaceholderPage
        title="Campanhas"
        description="Planejamento e acompanhamento de campanhas de comunicação em massa."
      />
    ) : (
      <PlaceholderPage
        title="Auditoria"
        description="Registro de acessos, alterações e trilha de conformidade dos envios."
      />
    )

  return (
    <AppShell activePage={activePage} onNavigate={setActivePage}>
      {pageContent}
    </AppShell>
  )
}
