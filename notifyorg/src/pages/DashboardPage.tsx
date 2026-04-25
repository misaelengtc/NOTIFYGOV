import { ChannelBreakdown } from "../components/dashboard/ChannelBreakdown"
import { DeliveryChart } from "../components/dashboard/DeliveryChart"
import { RecentAlerts } from "../components/dashboard/RecentAlerts"
import { SummaryCards } from "../components/dashboard/SummaryCards"

export function DashboardPage() {
  return (
    <main className="ml-64 mt-16 p-stack-lg">
      <div className="mx-auto max-w-[1280px] space-y-stack-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-[#2C508C]">
            Visão Geral de Desempenho
          </h1>
          <p className="mt-1 font-body-md text-slate-500">
            Dados consolidados do sistema de notificações governamentais.
          </p>
        </div>

        <SummaryCards />

        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
          <DeliveryChart />
          <ChannelBreakdown />
        </div>

        <RecentAlerts />
      </div>
    </main>
  )
}
