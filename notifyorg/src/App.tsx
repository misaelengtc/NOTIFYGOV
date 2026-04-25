import { useState } from "react"
import { AppShell } from "./components/layout/AppShell"
import type { AppPage } from "./types/app"
import { ApiSettingsPage } from "./pages/ApiSettingsPage"
import { DashboardPage } from "./pages/DashboardPage"
import { ManualNotificationPage } from "./pages/ManualNotificationPage"
import { NotificationsPage } from "./pages/NotificationsPage"
import { PlaceholderPage } from "./pages/PlaceholderPage"
import { TemplatesPage } from "./pages/TemplatesPage"
import { WorkflowsPage } from "./pages/WorkflowsPage"

export function App() {
  const [activePage, setActivePage] = useState<AppPage>("dashboard")

  const pageContent =
    activePage === "dashboard" ? (
      <DashboardPage />
    ) : activePage === "notifications" ? (
      <NotificationsPage />
    ) : activePage === "sendNotification" ? (
      <ManualNotificationPage />
    ) : activePage === "templates" ? (
      <TemplatesPage />
    ) : activePage === "workflows" ? (
      <WorkflowsPage />
    ) : activePage === "campaigns" ? (
      <PlaceholderPage
        title="Campanhas"
        description="Planejamento e acompanhamento de campanhas de comunicação em massa."
      />
    ) : activePage === "audit" ? (
      <PlaceholderPage
        title="Auditoria"
        description="Registro de acessos, alterações e trilha de conformidade dos envios."
      />
    ) : activePage === "apiSettings" ? (
      <ApiSettingsPage />
    ) : (
      <PlaceholderPage title="Página" description="Conteúdo em breve." />
    )

  return (
    <AppShell activePage={activePage} onNavigate={setActivePage}>
      {pageContent}
    </AppShell>
  )
}
