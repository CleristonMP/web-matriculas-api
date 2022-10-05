const StudentForm = () => {
  return (
    <form className="mb-4 p-lg-3">
      <div className="container">
        <div className="border border-opacity-10 rounded p-2 px-sm-3">
          {/* Student data session */}
          <div className="row g-3 p-lg-2 mt-1">
            <h2 className="form-title">Dados do aluno</h2>
            <div className="col-12 col-sm-6">
              <label htmlFor="name" className="form-label">
                Nome
              </label>
              <input
                type={"text"}
                className="form-control"
                id="name"
                placeholder="Digite o primeiro nome do aluno"
              />
              <div className="invalid-feedback">Campo obrigatório.</div>
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="lastName" className="form-label">
                Sobrenome
              </label>
              <input
                type={"text"}
                className="form-control"
                id="lastName"
                placeholder="Digite o(s) sobrenome(s) do aluno"
              />
              <div className="invalid-feedback">Campo obrigatório.</div>
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="cpf" className="form-label">
                CPF
              </label>
              <div className="input-group has-validation">
                <input
                  type={"text"}
                  className="form-control"
                  id="cpf"
                  placeholder="Digite o CPF nome do aluno"
                />
                <div className="invalid-feedback">Campo obrigatório.</div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="birthDate" className="form-label">
                Data de nascimento
              </label>
              <input
                type={"date"}
                className="form-control"
                id="birthDate"
                placeholder="Informe a data de nascimento do aluno"
              />
              <div className="invalid-feedback">Campo obrigatório.</div>
            </div>
          </div>

          <hr className="my-4" />

          {/* Parent data session */}
          <div className="row g-3 p-lg-2 mt-2">
            <h2 className="form-title">Dados do responsável</h2>
            <div className="col-12 col-sm-6">
              <label htmlFor="student.parent.name" className="form-label">
                Nome
              </label>
              <input
                type={"text"}
                className="form-control"
                id="student.parent.name"
                placeholder="Digite o primeiro nome do responsável pelo aluno"
              />
              <div className="invalid-feedback">Campo obrigatório.</div>
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="student.parent.lastName" className="form-label">
                Sobrenome
              </label>
              <input
                type={"text"}
                className="form-control"
                id="student.parent.lastName"
                placeholder="Digite o(s) sobrenome(s) do responsável pelo aluno"
              />
              <div className="invalid-feedback">Campo obrigatório.</div>
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="student.parent.cpf" className="form-label">
                CPF
              </label>
              <div className="input-group has-validation">
                <input
                  type={"text"}
                  className="form-control"
                  id="student.parent.cpf"
                  placeholder="Digite o CPF do responsável pelo aluno"
                />
                <div className="invalid-feedback">Campo obrigatório.</div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="student.parent.phone" className="form-label">
                Telefone
              </label>
              <input
                type={"tel"}
                className="form-control"
                id="student.parent.phone"
                placeholder="Informe um telefone para contato"
              />
              <div className="invalid-feedback">Campo obrigatório.</div>
            </div>
          </div>

          <hr className="my-4" />

          {/* Address session */}
          <div className="row g-3 p-lg-2 mt-2">
            <h2 className="form-title">Endereço</h2>
            <div className="col-12">
              <label
                htmlFor="student.address.publicPlace"
                className="form-label"
              >
                Logradouro
              </label>
              <input
                type="text"
                className="form-control"
                id="student.address.publicPlace"
                placeholder="Rua, avenida, travessa..."
              />
              <div className="invalid-feedback">Campo obrigatório.</div>
            </div>

            <div className="col-12 col-sm-4">
              <label htmlFor="student.address.number" className="form-label">
                Número
              </label>
              <input
                type="text"
                className="form-control"
                id="student.address.number"
                placeholder="Casa, apartamento..."
              />
            </div>

            <div className="col-12 col-sm-4">
              <label
                htmlFor="student.address.complement"
                className="form-label"
              >
                Complemento
              </label>
              <input
                type="text"
                className="form-control"
                id="student.address.complement"
                placeholder="Quadra, bloco..."
              />
            </div>

            <div className="col-12 col-sm-4">
              <label htmlFor="student.address.zipCode" className="form-label">
                CEP
              </label>
              <input
                type="text"
                className="form-control"
                id="student.address.zipCode"
                placeholder="65.000-000"
              />
            </div>

            <div className="col-12 col-sm-4">
              <label htmlFor="student.address.district" className="form-label">
                Bairro
              </label>
              <input
                type="text"
                className="form-control"
                id="student.address.district"
                placeholder="Cohatrac, Trizidela..."
              />
            </div>

            <div className="col-12 col-sm-4">
              <label htmlFor="student.address.county" className="form-label">
                Município
              </label>
              <input
                type="text"
                className="form-control"
                id="student.address.county"
                placeholder="São Luís, São José de Ribamar..."
              />
            </div>
          </div>

          <hr className="my-4" />

          {/* School Class session */}
          <div className="row g-3 p-lg-2 mt-2">
            <h2 className="form-title">Turma</h2>
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <label htmlFor="student.schoolClass.name" className="form-label">
                Identificador
              </label>
              <select
                id="student.schoolClass.name"
                name="student.schoolClass.name"
                className="form-select"
                aria-label="Seletor de identificador das turmas"
              >
                <option selected></option>
                <option value="101 EHC">101 EHC</option>
                <option value="202 ABC">202 ABC</option>
                <option value="303 JPG">303 JPG</option>
                <option value="404 TBT">404 TBT</option>
              </select>
              <div className="invalid-feedback">Campo obrigatório.</div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <label
                htmlFor="student.schoolClass.period"
                className="form-label"
              >
                Período
              </label>
              <select
                id="student.schoolClass.period"
                name="student.schoolClass.period"
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
          </div>

          <hr className="my-4" />

          {/* Buttons */}
          <div className="mb-4 col-12 d-flex justify-content-between justify-content-md-around justify-content-lg-end">
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

export default StudentForm;
