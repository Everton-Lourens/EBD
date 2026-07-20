# Handoff

- A aplicação tem apenas uma tela funcional: login.
- O front escolhe a base da API automaticamente: localhost em desenvolvimento e Render em produção/GitHub Pages.
- O login espera um token em campos comuns de resposta (`token`, `accessToken`, `data.token`, `result.token`, `auth.token`).
- O estado pós-login é apenas um painel de confirmação dentro da mesma página, sem outras telas.
- Publicação no GitHub Pages deve usar `docs/` como raiz estática.
