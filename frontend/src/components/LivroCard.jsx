function LivroCard({ livro, indice = 0, aoVerDetalhes }) {
  function mostrarCapa() {
    if (livro.capa) {
      return <img src={livro.capa} alt={`Capa de ${livro.titulo}`} />;
    }

    return <div className={`capa-placeholder capa-gradiente tom-${indice % 5}`}><span>{livro.titulo}</span><small>{livro.autor}</small></div>;
  }

  return (
    <article className="livro-card">
        <button className="capa-livro" onClick={() => aoVerDetalhes(livro)} aria-label={`Ver detalhes de ${livro.titulo}`}>
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
    </article>
  );
}

export default LivroCard;
