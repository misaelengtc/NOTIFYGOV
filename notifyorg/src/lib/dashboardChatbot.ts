import {
  channelRows,
  deliveryBars,
  recentAlerts,
  summaryCards,
} from "../data/dashboard"

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
}

function cardByLabelContains(fragment: string) {
  const f = fragment.toLowerCase()
  return summaryCards.find((c) => c.label.toLowerCase().includes(f))
}

/** Respostas derivadas dos mesmos dados exibidos na Visão Geral (protótipo ilustrativo). */
export function getDashboardChatReply(rawQuestion: string): string {
  const q = normalize(rawQuestion)
  if (!q) {
    return "Escreve uma pergunta sobre os números desta página (totais, canais, alertas ou tendência semanal)."
  }

  if (
    /(enviad|total.*mensag|mensagens.*enviad|quantas.*foram|volume.*envio|notificac.*enviad)/.test(
      q,
    )
  ) {
    const c = cardByLabelContains("Enviad")
    if (!c) return "Não encontrei o indicador de enviadas neste painel."
    return `Segundo os cartões desta visão, o total **${c.label}** é **${c.value}**. A tendência indicada é **${c.trend.value}** (${c.trend.icon === "trending_up" ? "subida" : c.trend.icon === "trending_down" ? "descida" : "estável"}).`
  }

  if (/(entregue|chegou|recebida)/.test(q)) {
    const c = cardByLabelContains("Entreg")
    if (!c) return "Não encontrei o indicador de entregues."
    return `**${c.label}**: **${c.value}**, com tendência **${c.trend.value}** face ao período de referência ilustrado.`
  }

  if (/(lida|abertura|leitura)/.test(q)) {
    const c = cardByLabelContains("Lidas")
    if (!c) return "Não encontrei o indicador de lidas."
    return `**${c.label}**: **${c.value}**. A tendência mostrada é **${c.trend.value}** (neste mock, sem variação percentual).`
  }

  if (/(confirmad|aceite|validad)/.test(q)) {
    const c = cardByLabelContains("Confirm")
    if (!c) return "Não encontrei o indicador de confirmadas."
    return `**${c.label}**: **${c.value}**. Tendência **${c.trend.value}** (ligeiramente negativa neste exemplo).`
  }

  if (/(resumo|overview|panorama|sintese|tudo)/.test(q)) {
    const parts = summaryCards.map((c) => `• ${c.label}: **${c.value}** (${c.trend.value})`)
    return `Resumo rápido dos quatro cartões:\n${parts.join("\n")}`
  }

  if (/(email|e-mail)/.test(q) && !/(sms|push|whatsapp)/.test(q)) {
    const row = channelRows.find((r) => r.label.toLowerCase().includes("email"))
    if (!row) return "Não há linha de Email nos canais."
    return `O canal **${row.label}** aparece com taxa de entrega de **${row.pct}** neste painel comparativo.`
  }

  if (/sms/.test(q) && !/whatsapp/.test(q)) {
    const row = channelRows.find((r) => r.label === "SMS")
    if (!row) return "Não há linha de SMS."
    return `**SMS**: taxa de entrega ilustrada **${row.pct}** (abaixo do e-mail neste conjunto de dados).`
  }

  if (/push/.test(q)) {
    const row = channelRows.find((r) => r.label === "Push")
    if (!row) return "Não há linha de Push."
    return `**Push**: taxa de entrega **${row.pct}** na comparação por canal.`
  }

  if (/whatsapp|whats/.test(q)) {
    const row = channelRows.find((r) => r.label === "WhatsApp")
    if (!row) return "Não há linha de WhatsApp."
    return `**WhatsApp**: taxa de entrega **${row.pct}** entre os canais mostrados.`
  }

  if (
    /(canal|melhor canal|compar|taxa.*entrega|performance.*canal|qual.*pior|qual.*melhor)/.test(
      q,
    )
  ) {
    const sorted = [...channelRows].sort(
      (a, b) => parseFloat(b.pct) - parseFloat(a.pct),
    )
    const best = sorted[0]
    const worst = sorted[sorted.length - 1]
    const list = channelRows.map((r) => `• **${r.label}**: ${r.pct}`).join("\n")
    return `Taxas ilustradas por canal:\n${list}\n\nO melhor desempenho neste mock é **${best?.label}** (${best?.pct}); o mais baixo é **${worst?.label}** (${worst?.pct}).`
  }

  if (/(alerta|problema|incidente|urgent|critico|falha)/.test(q)) {
    const urgent = recentAlerts.filter((a) => a.tag.label === "Urgente")
    const lines = recentAlerts.map(
      (a) => `• **${a.title}** (${a.tag.label}, ${a.time}): ${a.description}`,
    )
    return `Existem **${recentAlerts.length}** alertas na lista. ${urgent.length ? `**${urgent.length}** marcado(s) como urgente(s).` : "Nenhum marcado como urgente neste exemplo."}\n\n${lines.join("\n\n")}`
  }

  if (/iptu/.test(q)) {
    const a = recentAlerts.find((x) => x.description.toLowerCase().includes("iptu"))
    if (!a) return "Não há alerta mencionando IPTU neste conjunto."
    return `Há um alerta de **${a.title}**: ${a.description} (${a.time}).`
  }

  if (/(sms.*gateway|gateway.*sms)/.test(q)) {
    const a = recentAlerts.find((x) => x.title.toLowerCase().includes("gateway sms"))
    if (!a) return "Sem alerta de gateway SMS na lista atual."
    return `**${a.title}** — ${a.description} (${a.tag.label}, ${a.time}).`
  }

  if (
    /(tendencia|grafico|semana|dia.*semana|melhor dia|pior dia|sexta|quarta|segunda)/.test(q)
  ) {
    const best = deliveryBars.reduce((a, b) =>
      b.barHeightPct > a.barHeightPct ? b : a,
    )
    const worst = deliveryBars.reduce((a, b) =>
      b.barHeightPct < a.barHeightPct ? b : a,
    )
    return `O gráfico de tendência usa barras ilustrativas por dia da semana. O **pico relativo** é **${best.label}** (altura ${best.barHeightPct}% da faixa) e o dia mais baixo neste mock é **${worst.label}** (${worst.barHeightPct}%). Os valores são para demonstração, não séries reais.`
  }

  if (/(manutenc|backup|base.*dados)/.test(q)) {
    const a = recentAlerts.find((x) => x.title.toLowerCase().includes("manuten"))
    if (!a) return "Não há alerta de manutenção na lista."
    return `**${a.title}**: ${a.description} (${a.time}).`
  }

  if (/(oi|ola|bom dia|boa tarde|hey|help|ajuda)/.test(q)) {
    return "Olá. Posso ajudar a interpretar **totais** (enviadas, entregues, lidas, confirmadas), **taxas por canal**, **alertas** recentes e a **tendência semanal** ilustrada nesta página. Os dados são de exemplo, como o resto do protótipo."
  }

  return `Não identifiquei um tópico específico. Nesta **Visão Geral** podes perguntar, por exemplo: totais de enviadas ou entregues; qual canal tem melhor taxa; resumo dos cartões; alertas ou incidentes; ou o pico na tendência semanal. Tudo reflete os mesmos números mostrados nos cartões e listas (dados ilustrativos).`
}
