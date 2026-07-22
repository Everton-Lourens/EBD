
# Sessão 2026-07-21 — Marcação individual de presença

## O que foi alterado
A tela de chamada agora exibe, para cada aluno, três botões de status — **Presente**, **Ausente** e **Atrasado(a)** — e um botão final de `Salvar Chamada`. A aba inicial continua sendo **Ativos**, com alternância para **Inativos** sem recarregar a página.

## Conhecimento consolidado
- A listagem da chamada continua vindo de `GET /classes/:id/students`.
- O estado inicial da chamada pode vir de `GET /classes/:id/attendance?date=YYYY-MM-DD` e deve ser usado para pré-selecionar os botões.
- O salvamento é feito por aluno com `PATCH /attendance/:callId/students/:studentClassId`.
- Se não houver `callId` no carregamento inicial, o front tenta abrir a chamada antes de salvar.
- O motivo da inativação continua sendo exibido via `status-history` quando a API não traz a informação diretamente.

## Próximos passos
Se o backend padronizar o formato de retorno da chamada, simplificar a normalização e reduzir os fallbacks.
