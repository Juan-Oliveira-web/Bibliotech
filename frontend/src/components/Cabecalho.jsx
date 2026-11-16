const generosPopulares = ["Romance", "Ficção", "Clássicos", "Aventura"];

function Cabecalho({ busca, setBusca, aoEscolherCategoria }) {
  return (
    <>
      <nav className="topbar">
        <div className="container topbar-conteudo">
          <a className="navbar-brand" href="#inicio" aria-label="Bibliotech, início">
            <i className="bi bi-book-half" aria-hidden="true"></i>
            <span>Bibli<span>o</span>tech</span>
          </a>
        </div>
      </nav>

      <header className="hero" id="inicio">
        <div className="container hero-content">
          <span className="subtitulo">Catálogo digital de livros</span>
          <h1>Descubra, leia e explore<br className="desktop-break" /> seu próximo livro</h1>
          <p>Pesquise por título, autor ou gênero, navegue pela lista de livros em um só lugar.</p>

          <label className="barra-pesquisa">
            <i className="bi bi-search" aria-hidden="true"></i>
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Busque por título, autor ou ISBN"
              aria-label="Pesquisar livros por título, autor ou ISBN"
            />
            {busca && (
              <button type="button" onClick={() => setBusca("")} aria-label="Limpar pesquisa">
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </label>

          <div className="populares">
            <strong>Populares:</strong>
            {generosPopulares.map((genero) => (
              <button key={genero} onClick={() => aoEscolherCategoria(genero)}>{genero}</button>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}

export default Cabecalho;
