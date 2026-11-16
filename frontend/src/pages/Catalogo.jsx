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
  const [periodo, setPeriodo] = useState("Todos os anos");
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

  const livrosVisiveis = livros.filter((livro) => {
    const ano = Number(livro.ano) || 0;
    if (periodo === "Até 1950") return ano > 0 && ano <= 1950;
    if (periodo === "1951–2000") return ano >= 1951 && ano <= 2000;
    if (periodo === "Após 2000") return ano > 2000;
    return true;
  });

  function escolherGenero(genero) {
    setBusca("");
    setCategoria(categorias.includes(genero) ? genero : "Todas");
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Cabecalho busca={busca} setBusca={setBusca} aoEscolherCategoria={escolherGenero} />

      <main>
        <section className="explorar" aria-labelledby="titulo-generos">
          <div className="container">
            <h2 id="titulo-generos">Explore por gênero</h2>
            <div className="grade-generos">
              {categorias.filter((item) => item !== "Todas").slice(0, 6).map((genero) => (
                <button className="cartao-genero" key={genero} onClick={() => escolherGenero(genero)}>
                  <strong>{genero}</strong><span>Ver livros <i className="bi bi-arrow-right"></i></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="catalogo" id="catalogo">
          <div className="container">
            <div className="catalogo-intro">
              <div>
                <span className="subtitulo">ENCONTRE SUA PRÓXIMA LEITURA</span>
                <h2>Catálogo de livros</h2>
                <p>Pesquise e filtre para encontrar a próxima leitura.</p>
              </div>
              <button className="btn botao-roxo" onClick={() => abrirCadastro()}>
                <i className="bi bi-plus-lg me-2"></i>Adicionar livro
              </button>
            </div>

            <label className="barra-pesquisa busca-catalogo">
              <i className="bi bi-search" aria-hidden="true"></i>
              <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Busque por título, autor ou ISBN" aria-label="Pesquisar no catálogo" />
              {busca && <button type="button" onClick={() => setBusca("")} aria-label="Limpar pesquisa"><i className="bi bi-x-lg"></i></button>}
            </label>

            {erro && <div className="alert alert-warning">{erro}</div>}

            <div className="catalogo-layout">
              <FiltrosCategorias categorias={categorias} categoriaAtual={categoria} setCategoria={setCategoria} periodo={periodo} setPeriodo={setPeriodo} />
              <div className="resultados-catalogo">
                <div className="contador-livros"><strong>{livrosVisiveis.length} {livrosVisiveis.length === 1 ? "livro encontrado" : "livros encontrados"}</strong></div>

                {carregando ? (
                  <p className="mensagem-vazia">Carregando livros...</p>
                ) : livrosVisiveis.length === 0 ? (
                  <div className="mensagem-vazia"><i className="bi bi-journal-x"></i><h3>Nenhum livro encontrado</h3><p>Tente outra pesquisa ou filtro.</p></div>
                ) : (
                  <div className="grade-livros">
                    {livrosVisiveis.map((livro, indice) => <LivroCard key={livro.id} livro={livro} indice={indice} aoVerDetalhes={setLivroSelecionado} />)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
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
