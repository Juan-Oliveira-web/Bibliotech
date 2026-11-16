import { useEffect, useState } from "react";
import Cabecalho from "../components/Cabecalho";
import DetalhesLivro from "../components/DetalhesLivro";
import FiltrosCategorias from "../components/FiltrosCategorias";
import FormularioLivro from "../components/FormularioLivro";
import LivroCard from "../components/LivroCard";
import Rodape from "../components/Rodape";
import categorias from "../data/categorias";
import {
  cadastrarLivro,
  editarLivro,
  listarLivros,
  removerLivro
} from "../services/livrosApi";

function Catalogo() {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [livroEditando, setLivroEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [atualizar, setAtualizar] = useState(0);

  useEffect(() => {
    async function buscarLivros() {
      try {
        const dados = await listarLivros(busca, categoria);
        setLivros(dados);
        setErro("");
      } catch {
        setErro("Não foi possível conectar ao servidor. Veja se a API está iniciada.");
      } finally {
        setCarregando(false);
      }
    }

    buscarLivros();
  }, [busca, categoria, atualizar]);

  function abrirCadastro(livro = null) {
    setLivroEditando(livro);
    setLivroSelecionado(null);
    setModalAberto(true);
  }

  async function salvarLivro(dados) {
    try {
      if (livroEditando) {
        await editarLivro(livroEditando.id, dados);
      } else {
        await cadastrarLivro(dados);
      }

      setModalAberto(false);
      setLivroEditando(null);
      setAtualizar(atualizar + 1);
      setErro("");
    } catch (erro) {
      setErro(erro.message);
    }
  }

  async function excluirLivro(id) {
    if (!window.confirm("Deseja realmente excluir este livro?")) return;

    try {
      await removerLivro(id);
      setLivroSelecionado(null);
      setAtualizar(atualizar + 1);
    } catch (erro) {
      setErro(erro.message);
    }
  }

  return (
    <>
      <Cabecalho busca={busca} setBusca={setBusca} />

      <main className="container catalogo">
        <div className="titulo-secao">
          <div>
            <h2>Nosso catálogo</h2>
            <p>{livros.length} {livros.length === 1 ? "livro encontrado" : "livros encontrados"}</p>
          </div>
          <button className="btn botao-roxo" onClick={() => abrirCadastro()}>
            <i className="bi bi-plus-lg me-2"></i>Adicionar livro
          </button>
        </div>

        <FiltrosCategorias
          categorias={categorias}
          categoriaAtual={categoria}
          setCategoria={setCategoria}
        />

        {erro && <div className="alert alert-warning">{erro}</div>}

        {carregando ? (
          <p className="mensagem-vazia">Carregando livros...</p>
        ) : livros.length === 0 ? (
          <div className="mensagem-vazia">
            <i className="bi bi-journal-x"></i>
            <h3>Nenhum livro encontrado</h3>
            <p>Tente outra pesquisa ou categoria.</p>
          </div>
        ) : (
          <div className="row g-4">
            {livros.map((livro) => (
              <LivroCard
                key={livro.id}
                livro={livro}
                aoVerDetalhes={setLivroSelecionado}
              />
            ))}
          </div>
        )}
      </main>

      <Rodape />

      {modalAberto && (
        <FormularioLivro
          livro={livroEditando}
          categorias={categorias}
          onSalvar={salvarLivro}
          onFechar={() => setModalAberto(false)}
        />
      )}

      {livroSelecionado && (
        <DetalhesLivro
          livro={livroSelecionado}
          onFechar={() => setLivroSelecionado(null)}
          onEditar={abrirCadastro}
          onExcluir={excluirLivro}
        />
      )}
    </>
  );
}

export default Catalogo;
