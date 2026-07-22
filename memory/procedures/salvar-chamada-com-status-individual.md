# Salvar chamada com status individual

## Passos
1. Abrir a tela da chamada com `classId` e `className` na query string.
2. Validar a existência do token em `sessionStorage`.
3. Carregar os alunos da classe com `GET /classes/:id/students` ou fallback compatível.
4. Abrir ou reaproveitar a chamada do dia com `POST /attendance/open` usando `classId` e a data atual.
5. Ler o `callId` válido do retorno da API e gravá-lo na query string da própria página como `?callId=...`.
6. Buscar o snapshot da chamada do dia com `GET /classes/:id/attendance?date=YYYY-MM-DD` ou `GET /attendance/classes/:classId?date=YYYY-MM-DD`.
7. Validar que cada aluno carregado trouxe `id_aluno_classe` antes de permitir o salvamento.
8. Antes de salvar, fazer uma última reconciliação com o snapshot da chamada e tentar completar qualquer vínculo ainda ausente no estado local.
9. Renderizar cada aluno com os botões **Presente**, **Atrasado** e **Ausente** já posicionados no status recebido pela API.
10. Permitir ajustar o status individual antes de salvar.
11. Ao clicar em **Salvar Chamada**, enviar `PATCH /attendance/:callId/students/:studentClassId` para cada aluno com o status atual selecionado.
12. Se qualquer aluno estiver sem vínculo `id_aluno_classe`, abortar o salvamento com erro explícito e não usar `id_matricula`, `id` ou fallback posicional.
13. Se o `callId` ainda estiver ausente, tentar abrir a chamada novamente antes de bloquear o salvamento.

## Observação
O campo de presença é independente do status de matrícula do aluno. Um aluno pode estar ativo/inativo na turma e ainda assim ter um status de chamada diferente.
