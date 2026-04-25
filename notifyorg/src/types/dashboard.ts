import type { AppPage } from "./app"

export type SideNavItem = {
  page: AppPage
  label: string
  icon: string
}

export type SummaryCardData = {
  id: string
  icon: string
  iconWrapClass: string
  trend: { value: string; icon: string; className: string }
  label: string
  value: string
  valueClass: string
}

export type BarDay = { label: string; trackHeightPct: number; barHeightPct: number }

export type ChannelRow = {
  icon: string
  label: string
  pct: string
  barClass: string
  labelIconClass: string
  valueClass: string
}

export type AlertItem = {
  id: string
  icon: string
  iconWrapClass: string
  title: string
  description: string
  time: string
  tag: { label: string; className: string }
}
