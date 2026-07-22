# Salvar chamada em lote

## Passos
1. Abrir a tela da chamada com `classId` e `className` na query string.
2. Validar a existência do token em `sessionStorage`.
3. Carregar os alunos da classe com `GET /classes/:id/students` ou fallback compatível.
4. Abrir ou reaproveitar a chamada do dia com `POST /attendance/open` usando `classId` e a data atual.
5. Ler o `callId` válido do retorno da API e gravá-lo na query string da própria página como `?callId=...`.
6. Buscar o snapshot da chamada do dia com `GET /classes/:id/attendance?date=YYYY-MM-DD` ou `GET /attendance/classes/:classId?date=YYYY-MM-DD`.
7. Reconciliar o estado local com o snapshot antes de salvar e completar qualquer `id_aluno_classe` ainda ausente.
8. Filtrar o envio final para apenas os alunos elegíveis à chamada aberta, que hoje são os alunos ativos com vínculo válido.
9. Renderizar cada aluno com os botões **Presente**, **Atrasado** e **Ausente** já posicionados no status recebido pela API.
10. Permitir ajustar o status individual antes de salvar; os cards inativos podem ser exibidos, mas não entram no `PATCH` da chamada aberta.
11. Ao clicar em **Salvar Chamada**, enviar `PATCH /attendance/:callId` com o corpo `{ "students": [...] }`, usando um item por aluno elegível com `studentClassId`/`id_aluno_classe` e `status`.
12. Se qualquer aluno elegível estiver sem vínculo `id_aluno_classe`, abortar o salvamento com erro explícito e não usar `id_matricula`, `id` ou fallback posicional.
13. Se o `callId` ainda estiver ausente, tentar abrir a chamada novamente antes de bloquear o salvamento.

## Observação
O campo de presença é independente do status de matrícula do aluno. Um aluno pode estar ativo/inativo na turma e ainda assim ter um status de chamada diferente, mas apenas os vínculos que o backend materializou na chamada aberta entram no salvamento.
