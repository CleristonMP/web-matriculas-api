import "./styles.css";

const SchoolClassForm = () => {
  return (
    <form className="container mb-4 py-lg-3">
      <div className="container">
        <div className="row border border-opacity-10 rounded mx-auto p-3 scform-ctr">
          <h2 className="form-title">Cadastrar Turma</h2>
          <div className="col-12">
            <label htmlFor="name" className="form-label">
              Nome
            </label>
            <input type={"text"} className="form-control" id="name" />
          </div>
          <div className="mt-3 col-12">
            <label htmlFor="period" className="form-label">
              Período
            </label>
            <select
              id="period"
              name="period"
              className="form-select"
              aria-label="Seletor do período"
            >
              <option selected></option>
              <option value="Matutino">Matutino</option>
              <option value="Vespertino">Vespertino</option>
              <option value="Noturno">Noturno</option>
            </select>
            <div className="invalid-feedback">Campo obrigatório.</div>
          </div>

          <hr className="my-4" />

          <div className="col-12 d-flex justify-content-between justify-content-md-around justify-content-lg-end">
            <button className="btn btn-outline-danger custom-btn me-2 me-lg-5">
              Cancelar
            </button>
            <button
              type="submit"
              className="text-white btn btn-primary custom-btn"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SchoolClassForm;
