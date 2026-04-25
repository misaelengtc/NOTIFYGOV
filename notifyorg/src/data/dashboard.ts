import type {
  AlertItem,
  BarDay,
  ChannelRow,
  SideNavItem,
  SummaryCardData,
} from "../types/dashboard"

const avatarUrl =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCa8swPfVgvbhhi83klF88Bt4vhu1SHVKS81-LPlHswQch61FANYRT5LCh35kgvXEuzo8IEXP4v6PSC4TtPCxi4tz5nZyRDXFZ4A7hPsz_Jw740_gQknZFkBBJqggjK8rT_KBoTxBViPseJNDq9ba7zdEM81tfE5nHcTIn_jcmOaYJOikqwqiqc8Ps68-wc_reSsVmoet2WeFzR65CqIDbg1wEixicSiiy3Kqh2qxuMRlcOsDPHVQJmHRDrn8Dr4KZxBKT4QziMdo0"

export { avatarUrl }

export const summaryCards: SummaryCardData[] = [
  {
    id: "1",
    icon: "outbox",
    iconWrapClass: "bg-blue-50 text-[#2C508C]",
    trend: { value: "+12.5%", icon: "trending_up", className: "text-emerald-600" },
    label: "Total Enviadas",
    value: "1.284.032",
    valueClass: "text-[#2C508C]",
  },
  {
    id: "2",
    icon: "task_alt",
    iconWrapClass: "bg-green-50 text-green-600",
    trend: { value: "+8.2%", icon: "trending_up", className: "text-emerald-600" },
    label: "Entregues",
    value: "1.256.490",
    valueClass: "text-slate-800",
  },
  {
    id: "3",
    icon: "visibility",
    iconWrapClass: "bg-amber-50 text-amber-600",
    trend: { value: "0.0%", icon: "horizontal_rule", className: "text-slate-400" },
    label: "Lidas",
    value: "892.403",
    valueClass: "text-slate-800",
  },
  {
    id: "4",
    icon: "verified",
    iconWrapClass: "bg-purple-50 text-purple-600",
    trend: { value: "-2.1%", icon: "trending_down", className: "text-rose-500" },
    label: "Confirmadas",
    value: "442.189",
    valueClass: "text-slate-800",
  },
]

export const deliveryBars: BarDay[] = [
  { label: "SEG", trackHeightPct: 60, barHeightPct: 70 },
  { label: "TER", trackHeightPct: 45, barHeightPct: 60 },
  { label: "QUA", trackHeightPct: 85, barHeightPct: 90 },
  { label: "QUI", trackHeightPct: 70, barHeightPct: 75 },
  { label: "SEX", trackHeightPct: 90, barHeightPct: 95 },
  { label: "SAB", trackHeightPct: 40, barHeightPct: 30 },
  { label: "DOM", trackHeightPct: 30, barHeightPct: 20 },
]

export const channelRows: ChannelRow[] = [
  {
    icon: "mail",
    label: "Email",
    pct: "98.2%",
    barClass: "bg-[#2C508C] w-[98.2%]",
    labelIconClass: "text-[#2C508C]",
    valueClass: "text-[#2C508C]",
  },
  {
    icon: "sms",
    label: "SMS",
    pct: "87.5%",
    barClass: "bg-[#5CA7DD] w-[87.5%]",
    labelIconClass: "text-[#5CA7DD]",
    valueClass: "text-[#5CA7DD]",
  },
  {
    icon: "notifications_active",
    label: "Push",
    pct: "92.1%",
    barClass: "bg-purple-500 w-[92.1%]",
    labelIconClass: "text-purple-500",
    valueClass: "text-purple-500",
  },
]

export const recentAlerts: AlertItem[] = [
  {
    id: "a1",
    icon: "error",
    iconWrapClass: "bg-rose-100 text-rose-600",
    title: "Falha crítica no Gateway SMS",
    description: "Lote #98213 interrompido devido a timeout de API externa.",
    time: "Há 12 min",
    tag: { label: "Urgente", className: "bg-rose-50 text-rose-600 border border-rose-100" },
  },
  {
    id: "a2",
    icon: "warning",
    iconWrapClass: "bg-amber-100 text-amber-600",
    title: "Taxa de rejeição elevada",
    description:
      "Campanha 'IPTU 2024' apresentando 15% de erro no domínio @gov.br.",
    time: "Há 45 min",
    tag: {
      label: "Atenção",
      className: "bg-amber-50 text-amber-600 border border-amber-100",
    },
  },
  {
    id: "a3",
    icon: "info",
    iconWrapClass: "bg-blue-100 text-[#2C508C]",
    title: "Manutenção programada",
    description: "Database central entrará em modo leitura para backup à meia-noite.",
    time: "Há 2 horas",
    tag: {
      label: "Informativo",
      className: "bg-blue-50 text-[#2C508C] border border-blue-100",
    },
  },
]

export const sideNavItems: SideNavItem[] = [
  { page: "dashboard", label: "Visão Geral", icon: "dashboard" },
  { page: "notifications", label: "Notificação", icon: "send" },
  { page: "campaigns", label: "Campanhas", icon: "campaign" },
  { page: "audit", label: "Auditoria", icon: "history_edu" },
]
