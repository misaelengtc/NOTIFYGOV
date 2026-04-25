# NotifyOrg — Visão de produto e estado de entrega

## Resumo executivo

**NotifyOrg** (marca apresentada no painel: *Notify*) é um **protótipo de painel administrativo** orientado a instituições que precisam de **comunicar com cidadãos ou públicos-alvo** por vários canais (e-mail, SMS, push), com ênfase em **dois modos de operação**: envios **manuais** (equipa define mensagem e destinatários) e envios **automáticos assistidos por IA** (o sistema orquestra quem recebe, por onde e com que prioridade, dentro de políticas).

O que existe hoje é uma **experiência navegável completa no browser**, com dados de exemplo, para **validar narrativa de produto**, **fluxos de trabalho** e **storytelling com stakeholders** — ainda **sem** ligação a sistemas reais de identidade, processos ou envio em massa.

---

## Para quem é e que problema endereça

| Audiência | Benefício comunicado no protótipo |
|-----------|-------------------------------------|
| **Direção / governance** | Visão consolidada de volume, entregas e alertas; noção de conformidade e de “motor IA” sob controlo. |
| **Equipas de comunicação ou atendimento** | Criar comunicações pontuais, escolher canais, público e consentimento; ver resumo antes de enviar. |
| **TI / integração** | Inventário das **APIs e integrações** ligadas ao ecossistema; estado operacional (ativo, degradado, pausado). |
| **Operações** | Acompanhar **em tempo real** o que o canal automático está a despachar (filas, lotes, progresso). |

---

## Capacidades de negócio já demonstráveis

### 1. Visão geral de desempenho

Responde à pergunta: *“Como está a máquina de notificações?”*

- Indicadores de alto nível: **mensagens enviadas**, **entregues**, **lidas**, **confirmadas** (valores ilustrativos).
- **Tendência semanal** de entregas e **comparativo por canal** (e-mail, SMS, push).
- **Alertas operacionais** (ex.: falhas de gateway, campanhas com anomalias, janelas de manutenção) — formato de lista prioritária para ação humana.
- Bloco de **insights sugeridos pela IA** (texto orientador sobre o mix de canais).

*Valor de negócio:* decisão rápida sobre onde investir capacidade e se há incidente em curso.

---

### 2. Notificações — estratégia manual vs automática (IA)

Responde às perguntas: *“O que está a correr em automático?”* e *“Como explicamos o papel da IA?”*

- **Cartões de contexto** com métricas de negócio: fluxos automáticos ativos, volume de envios manuais recentes, agendamentos à frente.
- **Monitor em tempo real dos envios automáticos**: fila, envio em curso e conclusão por lote, com **explicação da decisão da IA** (transparência para auditoria e confiança).
- **Painel educativo** do modo automático: o que a IA decide (audiências, canais, tom), estado do motor e chamada à ação para **ajustar regras**.
- **Painel do modo manual**: posicionamento como controlo 100% humano e atalho para criar nova comunicação.

*Valor de negócio:* alinhar equipas e supervisores sobre **automação com trilho de explicação**, sem confundir com “caixa de entrada pessoal” do administrador.

---

### 3. Enviar notificação (fluxo manual completo)

Responde à pergunta: *“Como registo uma comunicação institucional pontual?”*

- **Conteúdo**: título e corpo (com limite de caracteres alinhado a boas práticas de SMS/push).
- **Destinatários**: cenários **cidadão único**, **grupo/segmento** ou **lista personalizada** (primeiro cenário com pesquisa e sugestões).
- **Consentimento**: opção de exigir confirmação do destinatário, texto legal editável e **pré-visualização** do ecrã de aceite/recusa.
- **Canais** e **urgência** (normal vs prioritário), com **resumo dinâmico** do envio antes de submeter.
- Ações **Salvar rascunho** e **Enviar notificação** (interface pronta; persistência e motor de envio são próximas fases).

*Valor de negócio:* suportar **comunicações sensíveis** (prazos, convocatórias, avisos legais) com **rastreabilidade de consentimento** na própria jornada de criação.

---

### 4. Configuração API — ecossistema de integrações

Responde à pergunta: *“Com que sistemas estamos ligados?”*

- Lista única de **todas as integrações** associadas ao produto (exemplos: portal de processos, cadastros nacionais, SMS, importações internas, legados).
- Por integração: **finalidade**, **endpoint**, **modo de ligação** (eventos em tempo real via webhook, consulta agendada, ou importação em lote), **estado de saúde** e **última sincronização bem-sucedida**.
- Ações de **detalhe** e **teste de ligação** e entrada para **registar nova API** (estrutura de produto; lógica de provisionamento ainda não ligada).

*Valor de negócio:* **inventário e transparência** perante TI e parceiros; base para **SLAs** e priorização de estabilização.

---

### 5. Áreas reservadas para evolução

- **Campanhas** e **Auditoria**: hoje apenas **marcadores de rota** com mensagem “em construção”, para fechar o mapa mental do menu sem implementar ainda os módulos de **planeamento de campanhas** nem o **livro de auditoria** (quem fez o quê, quando e com que resultado).

---

## Maturidade e limitações (expectativas com parceiros e investidores)

| Dimensão | Situação atual |
|----------|----------------|
| **Experiência de utilizador** | Navegação completa entre módulos principais; interface alinhada a padrões “gov/enterprise” (claro, hierárquico, acessível a revisão). |
| **Dados e envio** | **Ilustrativos** — números, filas e integrações servem para **demo e testes de UX**, não para decisão operacional real. |
| **Identidade e permissões** | Não há login nem perfis; assume-se um **administrador único** em contexto de protótipo. |
| **Multi-institução** | Modelo de negócio previsto (várias entidades na mesma plataforma); **seletor de organização** na UI ainda não faz parte desta entrega. |

---

## Próximos passos sugeridos (lente de negócio)

1. **Fechar o ciclo manual**: integrar o botão “Nova notificação manual” ao fluxo **Enviar notificação** e definir o **estado do envio** (submetido, agendado, falhou).
2. **Campanhas**: definir personas (quem planeia, quem aprova) e o **mínimo produto** (calendário, segmentos, aprovação em dois passos).
3. **Auditoria**: definir **eventos auditáveis** obrigatórios (ex.: alteração de regra IA, envio manual, revogação de consentimento).
4. **APIs**: passar da lista estática a **contratos e onboarding** (documentação, chaves, ambiente de testes) por parceiro.
5. **Governança de dados**: política de retenção e bases legais por tipo de comunicação, refletida em copy e em relatórios exportáveis.

---

## Referência técnica (uma linha)

O detalhe de ficheiros, componentes e stack encontra-se no código-fonte sob `notifyorg/src/`; este documento prioriza **linguagem de produto e de operações** em detrimento da implementação.

---

*Documento orientado a negócio — atualizado em função do estado do protótipo NotifyOrg.*
