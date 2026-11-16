# Bibliotech

Catálogo digital de livros com React, Vite, Node.js e Express.

## Como executar

Na pasta principal do projeto, instale as dependências uma vez:

```bash
npm install
```

Depois inicie o front-end e o back-end juntos:

```bash
npm run dev
```

- Front-end: http://localhost:5173
- API: http://localhost:3001/api/livros

Para gerar a versão de produção do front-end:

```bash
npm run build
```

## Estrutura

```text
bibliotech-2/
├── backend/
│   ├── data/                 # Dados dos livros
│   ├── routes/               # Rotas da API
│   └── server.js             # Servidor Express
├── frontend/
│   ├── public/capas/         # Capas locais dos livros
│   ├── src/                  # Aplicação React
│   ├── index.html
│   └── vite.config.js
├── package.json              # Dependências e comandos do projeto
└── package-lock.json
```

Os dados ficam em `backend/data/livros.json`. A API oferece operações para listar, pesquisar, cadastrar, editar e excluir livros.
