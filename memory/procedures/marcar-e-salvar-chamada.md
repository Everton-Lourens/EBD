
# Marcar e salvar a chamada

## Passos
1. Abrir a tela de chamada já contextualizada com a classe.
2. Conferir se a aba inicial está em **Ativos**.
3. Marcar o status de cada aluno com um dos três botões: **Presente**, **Ausente** ou **Atrasado(a)**.
4. Alternar para **Inativos** se precisar ajustar alunos que não estão ativos na classe.
5. Clicar em `Salvar Chamada`.
6. Se a API ainda não tiver uma chamada aberta para a data atual, o front tenta criar uma em `POST /attendance/open`.
7. Depois, o front envia `PATCH /attendance/:callId/students/:studentClassId` para cada aluno com o status selecionado.
8. Ao concluir, exibir confirmação visual sem recarregar a página.

## Observação
Esse fluxo depende de um `callId` válido na API de chamada; se o backend mudar esse contrato, o front precisa ser ajustado para o novo identificador.
