# Regra da lista de alunos da chamada

## Regra
A tela de chamada deve abrir sempre na aba **Ativos** e permitir alternar para **Inativos** sem recarregar a página. Cada aluno também deve exibir três botões de chamada — **Presente**, **Atrasado** e **Ausente** — além do botão **Salvar Chamada** no final da lista.

## Aplicação
- O filtro inicial da lista é sempre o status ativo;
- os botões de status devem permanecer visíveis no topo da listagem;
- o usuário não precisa refazer a navegação para trocar de aba;
- a ordenação visual deve manter os ativos como primeira visualização da tela;
- o status inicial de cada aluno na chamada vem da API/snapshot de presença, não do status de matrícula;
- o envio final da chamada deve acontecer pelo botão **Salvar Chamada**;
- ao mudar apenas o status de presença de um aluno, o front deve atualizar somente o card afetado, mantendo o restante da lista intacto.
