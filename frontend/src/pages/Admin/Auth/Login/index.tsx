import "./styles.css";

const Login = () => {
  return (
    <div className="base-card login-card">
      <h1 className="my-4">LOGIN</h1>

      <form className="row">
        <div className="input-group mb-4">
          <input
            type={"email"}
            className="form-control base-input"
            placeholder="Email"
            name="username"
          />
        </div>
        <div className="input-group mb-4">
          <input
            type={"password"}
            className="form-control base-input"
            placeholder="Password"
            name="password"
          />
        </div>
        <div className="d-flex justify-content-center mb-4 h-50px">
          <button type="submit" className="btn btn-primary custom-btn text-uppercase fw-bold text-white">
            Logar
          </button>
        </div>
        <a href="link" className="text-center">
          Esqueci a senha
        </a>
      </form>
    </div>
  );
};

export default Login;
