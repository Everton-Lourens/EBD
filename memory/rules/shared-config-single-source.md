# Configuração compartilhada em um único módulo

## Regra
`APP_CONFIG`, `APP_STORAGE_KEYS`, `APP_AUTH_STORAGE` e `APP_API_CLIENT` devem ser definidos apenas nos módulos compartilhados oficiais e consumidos pelas páginas. As páginas não devem redeclarar bases de API, chaves de storage ou clientes HTTP inline.

## Aplicação
- `src/app/config/api.js` concentra a base da API;
- `src/app/config/storage.js` concentra as chaves e utilitários de sessão;
- `src/shared/services/api-client.js` concentra parsing e erros da API;
- os módulos de tela devem usar `window.APP_CONFIG`, `window.APP_STORAGE_KEYS`, `window.APP_AUTH_STORAGE` e `window.APP_API_CLIENT`.
