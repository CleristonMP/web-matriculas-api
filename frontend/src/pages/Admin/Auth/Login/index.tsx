import { rootNavigate } from "components/CustomRouter";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { requestBackendLogin } from "util/requests";
import { saveAuthData } from "util/storage";
import { getTokenData } from "util/token";
import { AuthContext } from "AuthContext";

import "./styles.css";

type CredentialsDTO = {
  username: string;
  password: string;
};

const Login = () => {
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/admin" } };

  const { setAuthContextData } = useContext(AuthContext);

  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsDTO>();

  const onSubmit = (formData: CredentialsDTO) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setHasError(false);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        rootNavigate(from);
      })
      .catch((error) => {
        setHasError(true);
      });
  };

  return (
    <div className="base-card login-card">
      <h1 className="my-4">LOGIN</h1>

      {hasError && (
        <div className="alert alert-danger">
          Erro ao tentar efetuar o login.
        </div>
      )}

      <form className="row" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-4">
          <input
            {...register("username", {
              required: "Campo obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            type={"email"}
            className={`form-control base-input ${
              errors.username ? "is-invalid" : ""
            }`}
            placeholder="Email"
            name="username"
          />
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>
        <div className="input-group mb-4">
          <input
            {...register("password", {
              required: "Campo obrigatório",
            })}
            type={"password"}
            className={`form-control base-input ${
              errors.password ? "is-invalid" : ""
            }`}
            placeholder="Password"
            name="password"
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>
        <div className="d-flex justify-content-center mb-4 h-50px">
          <button
            type="submit"
            className="btn btn-primary custom-btn text-uppercase fw-bold text-white"
          >
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
