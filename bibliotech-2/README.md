# Bibliotech

Catálogo digital de livros feito com React, Bootstrap, Node.js e Express.

## Como executar

1. Extraia o arquivo ZIP e abra a pasta `bibliotech` no VS Code.
2. Abra o terminal nessa pasta e instale as dependências:

```bash
npm install
npm install --prefix server
npm install --prefix client
```

3. Inicie o projeto:

```bash
npm run dev
```

4. Abra `http://localhost:5173` no navegador. A API fica em `http://localhost:3001`.

## Organização das pastas

```text
bibliotech/
├── client/
│   └── src/
│       ├── components/       # Partes da página, como cabeçalho e formulários
│       ├── data/             # Lista de categorias
│       ├── pages/            # Página principal do catálogo
│       ├── services/         # Requisições para a API
│       ├── styles/           # Arquivo de estilos CSS
│       ├── App.jsx
│       └── main.jsx
├── server/
│   ├── data/                 # Arquivo JSON com os livros
│   ├── routes/               # Rotas da API
│   └── server.js             # Configuração do servidor
└── package.json
```

## Funcionalidades

- Listar livros
- Pesquisar por título ou autor
- Filtrar por categoria
- Cadastrar livros
- Ver detalhes
- Editar livros
- Excluir livros

## Rotas da API

| Método | Rota | Função |
|---|---|---|
| GET | `/api/livros` | Lista e pesquisa livros |
| GET | `/api/livros/:id` | Busca um livro pelo ID |
| POST | `/api/livros` | Cadastra um livro |
| PUT | `/api/livros/:id` | Atualiza um livro |
| DELETE | `/api/livros/:id` | Exclui um livro |

Os dados são guardados em `server/data/livros.json`. As rotas podem ser testadas no Postman usando `http://localhost:3001` como endereço base.
