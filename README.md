# Assembleia Login Shell

Interface de login em dois modos:

- **Local** com Node.js/Express para desenvolvimento.
- **Produção estática** no GitHub Pages, usando a pasta `docs/`.

## Execução local

```bash
npm install
npm start
```

O front-end local continua servindo via Express, enquanto o login chama a API local em `http://localhost:3000/api/v1`.

## Gerar a versão para GitHub Pages

```bash
npm run build
```

Isso copia o conteúdo de `src/` para `docs/` e cria o arquivo `.nojekyll`, deixando a publicação pronta para Pages.

## Ambiente da API

O front-end escolhe automaticamente a base da API:

- local: `http://localhost:3000/api/v1`
- produção/GitHub Pages: `https://ebd-fj9u.onrender.com/api/v1`
