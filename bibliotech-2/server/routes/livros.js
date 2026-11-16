import { Router } from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const arquivo = path.join(__dirname, "..", "data", "livros.json");

async function lerLivros() {
  const dados = await fs.readFile(arquivo, "utf-8");
  return JSON.parse(dados);
}

async function salvarLivros(livros) {
  await fs.writeFile(arquivo, JSON.stringify(livros, null, 2), "utf-8");
}

// Lista os livros e permite pesquisar por título, autor ou categoria.
router.get("/", async (req, res) => {
  try {
    const { busca = "", categoria = "" } = req.query;
    let livros = await lerLivros();

    if (busca) {
      const termo = busca.toLowerCase();
      livros = livros.filter((livro) =>
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo)
      );
    }

    if (categoria) {
      livros = livros.filter((livro) => livro.categoria === categoria);
    }

    res.json(livros);
  } catch {
    res.status(500).json({ mensagem: "Erro ao carregar os livros." });
  }
});

// Mostra um livro pelo ID.
router.get("/:id", async (req, res) => {
  try {
    const livros = await lerLivros();
    const livro = livros.find((item) => item.id === Number(req.params.id));

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado." });
    }

    res.json(livro);
  } catch {
    res.status(500).json({ mensagem: "Erro ao buscar o livro." });
  }
});

// Cadastra um novo livro.
router.post("/", async (req, res) => {
  try {
    const { titulo, autor, editora, ano, categoria, sinopse, capa = "" } = req.body;

    if (!titulo || !autor || !categoria) {
      return res.status(400).json({
        mensagem: "Título, autor e categoria são obrigatórios."
      });
    }

    const livros = await lerLivros();
    const novoLivro = {
      id: livros.length ? Math.max(...livros.map((livro) => livro.id)) + 1 : 1,
      titulo: titulo.trim(),
      autor: autor.trim(),
      editora: editora || "",
      ano: ano ? Number(ano) : null,
      categoria,
      sinopse: sinopse || "",
      capa
    };

    livros.push(novoLivro);
    await salvarLivros(livros);
    res.status(201).json(novoLivro);
  } catch {
    res.status(500).json({ mensagem: "Erro ao cadastrar o livro." });
  }
});

// Atualiza as informações de um livro.
router.put("/:id", async (req, res) => {
  try {
    const livros = await lerLivros();
    const indice = livros.findIndex((livro) => livro.id === Number(req.params.id));

    if (indice === -1) {
      return res.status(404).json({ mensagem: "Livro não encontrado." });
    }

    const livroAtual = livros[indice];
    livros[indice] = {
      ...livroAtual,
      ...req.body,
      id: livroAtual.id,
      ano: req.body.ano ? Number(req.body.ano) : null
    };

    await salvarLivros(livros);
    res.json(livros[indice]);
  } catch {
    res.status(500).json({ mensagem: "Erro ao atualizar o livro." });
  }
});

// Exclui um livro do catálogo.
router.delete("/:id", async (req, res) => {
  try {
    const livros = await lerLivros();
    const atualizados = livros.filter((livro) => livro.id !== Number(req.params.id));

    if (atualizados.length === livros.length) {
      return res.status(404).json({ mensagem: "Livro não encontrado." });
    }

    await salvarLivros(atualizados);
    res.json({ mensagem: "Livro excluído com sucesso." });
  } catch {
    res.status(500).json({ mensagem: "Erro ao excluir o livro." });
  }
});

export default router;
