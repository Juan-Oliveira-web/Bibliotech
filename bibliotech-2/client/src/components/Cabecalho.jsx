function Cabecalho({ busca, setBusca }) {
  return (
    <>
      <nav className="navbar navbar-dark topbar">
        <div className="container">
          <a className="navbar-brand" href="#inicio">
            <i className="bi bi-book-half me-2"></i>Bibliotech
          </a>
          <span className="navbar-text">Seu próximo livro começa aqui.</span>
        </div>
      </nav>

      <header className="hero" id="inicio">
        <div className="container hero-content">
          <div>
            <span className="subtitulo">CATÁLOGO DIGITAL</span>
            <h1>Encontre sua próxima leitura.</h1>
            <p>Pesquise livros e descubra novas histórias em um só lugar.</p>

            <div className="barra-pesquisa">
              <i className="bi bi-search"></i>
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Digite o título ou o autor..."
                aria-label="Pesquisar livros"
              />
              {busca && (
                <button onClick={() => setBusca("")} aria-label="Limpar pesquisa">
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>

          <i className="bi bi-book-half hero-livro"></i>
        </div>
      </header>
    </>
  );
}

export default Cabecalho;
