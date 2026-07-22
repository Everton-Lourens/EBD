# Cadastro de aluno na tela de chamada

## Decisão
O botão `Adicionar Aluno` da tela de chamada abre um pop-up de cadastro que primeiro cria a pessoa em `POST /people` e depois realiza a matrícula na classe atual em `POST /students/enroll`.

## Motivo
O backend separa cadastro de pessoa e vínculo de aluno com classe. Encadear as duas chamadas no front mantém o fluxo simples para o operador e evita exigir campos além do nome quando o restante não é necessário.

## Data
2026-07-21
