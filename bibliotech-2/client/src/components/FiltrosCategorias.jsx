function FiltrosCategorias({ categorias, categoriaAtual, setCategoria }) {
  return (
    <div className="filtros">
      <strong>
        <i className="bi bi-funnel me-2"></i>Filtrar por categoria
      </strong>

      <div className="lista-categorias">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            className={categoriaAtual === categoria ? "categoria ativa" : "categoria"}
            onClick={() => setCategoria(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FiltrosCategorias;
