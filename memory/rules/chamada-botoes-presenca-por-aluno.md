
# Regra dos botões de presença por aluno

## Regra
Cada aluno exibido na tela de chamada deve ter três controles persistentes de status: **Presente**, **Ausente** e **Atrasado(a)**.

## Aplicação
- O estado visual deve refletir o status carregado pela API ou, na ausência dele, um fallback consistente do front;
- o botão selecionado precisa ficar destacado com a cor do seu status;
- a interface não deve recarregar a página para mudar o status do aluno;
- o salvamento final deve ser feito em lote lógico pelo front, mas com PATCH individual por aluno.
