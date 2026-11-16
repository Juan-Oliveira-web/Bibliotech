import { useState } from "react";

const livroVazio = {
  titulo: "",
  autor: "",
  editora: "",
  ano: "",
  isbn: "",
  categoria: "Romance",
  sinopse: "",
  capa: ""
};

function FormularioLivro({ livro, categorias, onSalvar, onFechar }) {
  const [form, setForm] = useState(livro || livroVazio);

  function atualizarCampo(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  function enviarFormulario(event) {
    event.preventDefault();
    onSalvar(form);
  }

  return (
    <div className="fundo-modal" onMouseDown={(e) => e.target === e.currentTarget && onFechar()}>
      <div className="caixa-modal">
        <div className="cabecalho-modal">
          <h2>{livro ? "Editar livro" : "Cadastrar livro"}</h2>
          <button className="fechar-modal" onClick={onFechar}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <form onSubmit={enviarFormulario}>
          <label className="form-label">Título *</label>
          <input
            className="form-control mb-3"
            required
            value={form.titulo}
            onChange={(e) => atualizarCampo("titulo", e.target.value)}
          />

          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Autor *</label>
              <input
                className="form-control mb-3"
                required
                value={form.autor}
                onChange={(e) => atualizarCampo("autor", e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Editora</label>
              <input
                className="form-control mb-3"
                value={form.editora}
                onChange={(e) => atualizarCampo("editora", e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Ano de publicação</label>
              <input
                className="form-control mb-3"
                type="number"
                min="0"
                value={form.ano}
                onChange={(e) => atualizarCampo("ano", e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Categoria *</label>
              <select
                className="form-select mb-3"
                value={form.categoria}
                onChange={(e) => atualizarCampo("categoria", e.target.value)}
              >
                {categorias.filter((item) => item !== "Todas").map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          <label className="form-label">Link da capa (opcional)</label>
          <input
            className="form-control mb-3"
            placeholder="https://..."
            value={form.capa}
            onChange={(e) => atualizarCampo("capa", e.target.value)}
          />

          <label className="form-label">ISBN (opcional)</label>
          <input
            className="form-control mb-3"
            value={form.isbn || ""}
            onChange={(e) => atualizarCampo("isbn", e.target.value)}
          />

          <label className="form-label">Sinopse</label>
          <textarea
            className="form-control"
            rows="3"
            value={form.sinopse}
            onChange={(e) => atualizarCampo("sinopse", e.target.value)}
          />

          <div className="acoes-modal">
            <button type="button" className="btn btn-light" onClick={onFechar}>
              Cancelar
            </button>
            <button type="submit" className="btn botao-roxo">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioLivro;
