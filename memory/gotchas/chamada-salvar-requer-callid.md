
# Salvar chamada requer `callId`

## Problema
O botão `Salvar Chamada` depende de um identificador de chamada válido para enviar os patches por aluno.

## Causa
O backend pode retornar apenas a lista de alunos sem expor diretamente a chamada aberta para a data.

## Solução
- Tentar obter o `callId` no carregamento inicial via `GET /classes/:id/attendance?date=YYYY-MM-DD`;
- se o identificador não vier, abrir a chamada em `POST /attendance/open` antes do salvamento;
- se o backend mudar o contrato do retorno, atualizar a montagem do `callId` no front.
