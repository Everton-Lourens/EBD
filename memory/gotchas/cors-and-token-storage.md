# CORS e armazenamento de token

## Problema
O front-end publicado em GitHub Pages chama a API em outro domínio e também pode chamar a API local em outro porto durante o desenvolvimento.

## Causa
A autenticação usa `fetch` para:

- `http://localhost:3000/api/v1/auth/login` no modo local;
- `https://ebd-fj9u.onrender.com/api/v1/auth/login` no modo de produção.

Como as origens são diferentes, o backend precisa permitir CORS para o domínio publicado no GitHub Pages e, se necessário, para a origem local usada no desenvolvimento.

## Solução
- Manter a URL base do backend configurada no front-end por ambiente.
- Armazenar o token somente em `sessionStorage`.
- Usar `localStorage` apenas para preferências opcionais, como lembrar o usuário digitado.
