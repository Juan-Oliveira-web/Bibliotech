const API = "http://localhost:3001/api/livros";

async function verificarResposta(resposta) {
  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || "Ocorreu um erro na operação.");
  }

  return dados;
}

export async function listarLivros(busca, categoria) {
  const filtros = new URLSearchParams();

  if (busca) filtros.append("busca", busca);
  if (categoria !== "Todas") filtros.append("categoria", categoria);

  const resposta = await fetch(`${API}?${filtros.toString()}`);
  return verificarResposta(resposta);
}

export async function cadastrarLivro(livro) {
  const resposta = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(livro)
  });

  return verificarResposta(resposta);
}

export async function editarLivro(id, livro) {
  const resposta = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(livro)
  });

  return verificarResposta(resposta);
}

export async function removerLivro(id) {
  const resposta = await fetch(`${API}/${id}`, { method: "DELETE" });
  return verificarResposta(resposta);
}
