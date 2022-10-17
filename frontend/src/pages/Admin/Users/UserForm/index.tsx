import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { Role, User } from "types/user";
import { history } from "util/history";
import { requestBackend } from "util/requests";

import "./styles.css";

const options: Role[] = [
  { id: 1, authority: "Operador" },
  { id: 2, authority: "Admin" },
];

type UrlParams = {
  userId: string;
};

const UserForm = () => {
  const { userId } = useParams<UrlParams>();

  const isEditing = userId !== "create";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<User>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({
        url: `/users/${userId}`,
        withCredentials: true,
      }).then((response) => {
        const user = response.data as User;

        setValue("name", user.name);
        setValue("lastName", user.lastName);
        setValue("email", user.email);
        setValue("emailConfirmation", user.email);
        const customRoles = user.roles.map((role) => ({
          id: role.id,
          authority: role.authority === "ROLE_ADMIN" ? "Admin" : "Operador",
        }));

        setValue("roles", customRoles);
        console.log(user);
      });
    }
  }, [isEditing, userId, setValue]);

  const onSubmit = (formData: User) => {
    const data = formData;

    const config: AxiosRequestConfig = {
      method: isEditing ? "PUT" : "POST",
      url: isEditing ? `/users/${userId}` : "/users",
      data,
      withCredentials: true,
    };

    requestBackend(config)
      .then(() => {
        !isEditing
          ? toast.info("Usuário cadastrado com sucesso")
          : toast.info("Usuário atualizado com sucesso");
        history.push("/admin/users");
      })
      .catch(() => {
        toast.error("Erro ao cadastrar usuário");
      });
  };

  const handleCancel = () => {
    history.push("/admin/users");
  };

  return (
    <form className="mb-4 p-lg-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        <div className="border border-opacity-10 rounded p-2 px-sm-3 p-xl-4">
          <h2 className="form-title">CADASTRAR USUÁRIO</h2>
          <div className="row">
            <div className="col-lg-6 mb-3 mb-xl-3">
              <label htmlFor="name" className="form-label">
                Nome
              </label>
              <input
                {...register("name", {
                  required: "Campo obrigatório",
                })}
                type={"text"}
                className={`form-control base-input ${
                  errors.name ? "is-invalid" : ""
                }`}
                placeholder="Nome do Usuário"
                name="name"
              />
              <div className="invalid-feedback d-block">
                {errors.name?.message}
              </div>
            </div>

            <div className="col-lg-6 mb-3">
              <label htmlFor="lastName" className="form-label">
                Sobrenome
              </label>
              <input
                {...register("lastName", {
                  required: "Campo obrigatório",
                })}
                type={"text"}
                className={`form-control base-input ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                placeholder="Sobrenome do Usuário"
                name="lastName"
              />
              <div className="invalid-feedback d-block">
                {errors.lastName?.message}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-3 mb-xl-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                {...register("email", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
                type={"email"}
                className={`form-control base-input ${
                  errors.email ? "is-invalid" : ""
                }`}
                placeholder="E-mail"
                name="email"
                id="email"
              />
              <div className="invalid-feedback d-block">
                {errors.email?.message}
              </div>
            </div>

            <div className="col-lg-6 mb-3 mb-xl-3">
              <label htmlFor="emailConfirmation" className="form-label">
                Confirmação de e-mail
              </label>
              <input
                {...register("emailConfirmation", {
                  required: "Campo obrigatório",
                  validate: {
                    matchesPreviousEmail: (value) => {
                      const { email } = getValues();
                      return email === value || "Os e-mails devem ser iguais.";
                    },
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
                type={"email"}
                name="emailConfirmation"
                id="emailConfirmation"
                placeholder="Repita aqui o E-mail"
                className="form-control base-input"
              />
              <div className="invalid-feedback d-block">
                {errors.emailConfirmation?.message}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3 mb-xl-3">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <input
                {...register(
                  "password",
                  !isEditing
                    ? {
                        required: "Campo obrigatório",
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                          message: "",
                        },
                      }
                    : {}
                )}
                type={"password"}
                className={`form-control base-input ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Senha"
                name="password"
              />
              <div className="invalid-feedback d-block">
                {errors.password?.message}
              </div>
              <span
                className={
                  errors.password ? "text-danger" : "password-pattern-advice"
                }
              >
                A senha deve ter pelo menos 8 caracteres e um número
              </span>
            </div>
            <div className="col-md-6 mb-3 mb-xl-3">
              <label htmlFor="passwordConfirmation" className="form-label">
                Confirmação de senha
              </label>
              <input
                {...register(
                  "passwordConfirmation",
                  !isEditing
                    ? {
                        required: "Campo obrigatório",
                        validate: {
                          matchesPreviousPassword: (value) => {
                            const { password } = getValues();
                            return (
                              password === value ||
                              "As senhas devem ser iguais!"
                            );
                          },
                        },
                      }
                    : {}
                )}
                type={"password"}
                className={`form-control base-input ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Repita aqui a Senha"
                name="passwordConfirmation"
              />
              <div className="invalid-feedback d-block">
                {errors.passwordConfirmation?.message}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-lg-6 mb-3 mb-xl-3">
              <label htmlFor="roles" className="form-label">
                Funções
              </label>
              <Controller
                name="roles"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={options}
                    classNamePrefix="user-crud-select"
                    isMulti
                    placeholder="Funções"
                    getOptionValue={(role: Role) => String(role.id)}
                    getOptionLabel={(role: Role) => role.authority}
                    inputId="Roles"
                  />
                )}
              />
              {errors.roles && (
                <div className="invalid-feedback d-block">
                  Campo obrigatório
                </div>
              )}
            </div>
          </div>

          <hr className="mt-2" />

          <div className="my-4 col-12 d-flex justify-content-between justify-content-md-around justify-content-lg-end">
            <button
              className="btn btn-outline-danger custom-btn me-2 me-lg-5"
              onClick={handleCancel}
            >
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
