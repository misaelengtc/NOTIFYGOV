import { AIModePanel } from "../components/notifications/AIModePanel"
import { AIRealtimeDispatchFeed } from "../components/notifications/AIRealtimeDispatchFeed"
import { ManualModePanel } from "../components/notifications/ManualModePanel"
import { NotificationStatsRow } from "../components/notifications/NotificationStatsRow"

export function NotificationsPage() {
  return (
    <main className="ml-64 mt-16 p-stack-lg">
      <div className="mx-auto max-w-[1280px] space-y-stack-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-[#2C508C]">Notificações</h1>
          <p className="mt-1 font-body-md text-slate-500">
            Envios <strong className="font-semibold text-slate-700">manuais</strong> feitos pela
            equipe e envios <strong className="font-semibold text-slate-700">automáticos</strong>{" "}
            orquestrados pela inteligência artificial, com trilha de auditoria.
          </p>
        </div>

        <NotificationStatsRow />

        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
          <div className="space-y-gutter lg:col-span-2">
            <AIRealtimeDispatchFeed />
          </div>
          <div className="space-y-gutter">
            <AIModePanel />
            <ManualModePanel />
          </div>
        </div>
      </div>
    </main>
  )
}
