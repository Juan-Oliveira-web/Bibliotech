function FiltrosCategorias({ categorias, categoriaAtual, setCategoria, periodo, setPeriodo }) {
  return (
    <aside className="filtros">
      <h3>Filtros</h3>
      <fieldset>
        <legend>Gênero</legend>
        {categorias.filter((item) => item !== "Todas").map((categoria) => (
          <label className="opcao-filtro" key={categoria}>
            <input type="radio" name="categoria" checked={categoriaAtual === categoria} onChange={() => setCategoria(categoria)} />
            <span>{categoria}</span>
          </label>
        ))}
        <label className="opcao-filtro">
          <input type="radio" name="categoria" checked={categoriaAtual === "Todas"} onChange={() => setCategoria("Todas")} />
          <span>Todos os gêneros</span>
        </label>
      </fieldset>

      <fieldset>
        <legend>Ano de publicação</legend>
        {["Todos os anos", "Até 1950", "1951–2000", "Após 2000"].map((opcao) => (
          <label className="opcao-filtro" key={opcao}>
            <input type="radio" name="periodo" checked={periodo === opcao} onChange={() => setPeriodo(opcao)} />
            <span>{opcao}</span>
          </label>
        ))}
      </fieldset>
    </aside>
  );
}

export default FiltrosCategorias;
