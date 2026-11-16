function LivroCard({ livro, aoVerDetalhes }) {
  function mostrarCapa() {
    if (livro.capa) {
      return <img src={livro.capa} alt={`Capa de ${livro.titulo}`} />;
    }

    return (
      <div className="capa-placeholder">
        <i className="bi bi-book-half"></i>
        <span>{livro.titulo}</span>
      </div>
    );
  }

  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div className="livro-card">
        <button className="capa-livro" onClick={() => aoVerDetalhes(livro)}>
          {mostrarCapa()}
        </button>

        <div className="info-livro">
          <span className="etiqueta">{livro.categoria}</span>
          <h3>{livro.titulo}</h3>
          <p>{livro.autor}</p>
          <button className="link-detalhes" onClick={() => aoVerDetalhes(livro)}>
            Ver detalhes <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LivroCard;
