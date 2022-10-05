
const UserForm = () => {
  return (
    <form className="mb-4 p-lg-3">
      <div className="container">
        <div className="border border-opacity-10 rounded p-2 px-sm-3 p-xl-4">
          <h2 className="form-title">CADASTRAR USUÁRIO</h2>
          <div className="row">
            <div className="col-lg-6 mb-3 mb-xl-3">
              <label htmlFor="name" className="form-label">
                Nome
              </label>
              <input
                type={"text"}
                className="form-control base-input"
                placeholder="Nome do Usuário"
                name="name"
              />
            </div>

            <div className="col-lg-6 mb-3">
              <label htmlFor="lastName" className="form-label">
                Sobrenome
              </label>
              <input
                type={"text"}
                className="form-control base-input"
                placeholder="Sobrenome do Usuário"
                name="lastName"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-3 mb-xl-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type={"email"}
                className="form-control base-input"
                placeholder="E-mail"
                name="email"
                id="email"
              />
            </div>

            <div className="col-lg-6 mb-3 mb-xl-3">
              <label htmlFor="emailConfirmation" className="form-label">
                Confirmação de e-mail
              </label>
              <input
                type={"email"}
                name="emailConfirmation"
                id="emailConfirmation"
                placeholder="Repita aqui o E-mail"
                className="form-control base-input"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3 mb-xl-3">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <input
                type={"password"}
                className="form-control base-input"
                placeholder="Senha"
                name="password"
              />
            </div>
            <div className="col-md-6 mb-3 mb-xl-3">
              <label htmlFor="passwordConfirmation" className="form-label">
                Confirmação de senha
              </label>
              <input
                type={"password"}
                className="form-control base-input"
                placeholder="Repita aqui a Senha"
                name="passwordConfirmation"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-lg-6 mb-3 mb-xl-3">
              <label htmlFor="roles" className="form-label">
                Funções
              </label>
              <select
                name="roles"
                id="roles"
                className="form-select"
                aria-label="Seletor de funções de usuário"
              >
                <option selected></option>
                <option value="ROLE_ADMIN">Admin</option>
                <option value="ROLE_OPERATOR">Operador</option>
              </select>
            </div>
          </div>

          <hr className="mt-2" />

          <div className="my-4 col-12 d-flex justify-content-between justify-content-md-around justify-content-lg-end">
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

export default UserForm;
