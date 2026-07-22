
# Presença individual na tela de chamada

## Decisão
A tela de chamada passou a tratar presença como estado individual por aluno, com três opções de marcação: presente, ausente e atrasado(a). O salvamento é feito por aluno em `PATCH /attendance/:callId/students/:studentClassId`.

## Motivo
O backend expõe atualização pontual por aluno e a interface precisa refletir o status inicial retornado pela API sem recarregar a página.

## Data
2026-07-21
