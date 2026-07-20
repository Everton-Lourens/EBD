# Arquitetura híbrida de login

## Decisão
O projeto usa dois modos compatíveis:

- **Local**: Express com Node.js continua servindo a aplicação durante o desenvolvimento.
- **Produção estática**: o front-end é copiado para `docs/` para publicação no GitHub Pages.

## Front-end
A UI fica em arquivos estáticos em `src/` e usa caminhos relativos para CSS e JS, o que permite publicação em subcaminhos do GitHub Pages sem depender de servidor Node.

## API
A base da API é resolvida automaticamente no navegador:

- local: `http://localhost:3000/api/v1`
- produção/GitHub Pages: `https://ebd-fj9u.onrender.com/api/v1`

## Data
2026-07-20
