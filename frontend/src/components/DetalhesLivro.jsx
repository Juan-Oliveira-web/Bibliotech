function DetalhesLivro({ livro, onFechar, onEditar, onExcluir }) {
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
    <div className="fundo-modal" onMouseDown={(e) => e.target === e.currentTarget && onFechar()}>
      <div className="modal-detalhes">
        <button className="fechar-modal fechar-detalhes" onClick={onFechar}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="capa-detalhes">{mostrarCapa()}</div>

        <div>
          <span className="etiqueta">{livro.categoria}</span>
          <h2>{livro.titulo}</h2>
          <p className="autor-detalhes">Por {livro.autor}</p>
          <p><strong>Editora:</strong> {livro.editora || "Não informada"}</p>
          <p><strong>Ano:</strong> {livro.ano || "Não informado"}</p>
          {livro.isbn && <p><strong>ISBN :</strong> {livro.isbn}</p>}
          <h3>Sinopse</h3>
          <p>{livro.sinopse || "Nenhuma sinopse cadastrada."}</p>

          <div className="acoes-detalhes">
            <button className="btn botao-roxo" onClick={() => onEditar(livro)}>
              <i className="bi bi-pencil me-2"></i>Editar
            </button>
            <button className="btn btn-outline-danger" onClick={() => onExcluir(livro.id)}>
              <i className="bi bi-trash me-2"></i>Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesLivro;
