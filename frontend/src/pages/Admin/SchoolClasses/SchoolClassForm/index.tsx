import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { SchoolClass } from "types/schoolClass";
import { useEffect } from "react";
import { requestBackend } from "util/requests";
import { AxiosRequestConfig } from "axios";
import { history } from "util/history";
import Select from "react-select";

import "./styles.css";

type UrlParams = {
  schoolClassId: string;
};

type OptionType = {
  value: string;
  label: string;
};

const periodOptions: OptionType[] = [
  { value: "Matutino", label: "Matutino" },
  { value: "Vespertino", label: "Vespertino" },
  { value: "Noturno", label: "Noturno" }
]

const SchoolClassForm = () => {
  const { schoolClassId } = useParams<UrlParams>();

  const isEditing = schoolClassId !== "create";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm<SchoolClass>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({
        url: `/school-classes/${schoolClassId}`,
        withCredentials: true,
      }).then((response) => {
        const schoolClass = response.data as SchoolClass;
        setValue("name", schoolClass.name);
        setValue("period", schoolClass.period);
      });
    }
  }, [isEditing, schoolClassId, setValue]);

  const onSubmit = (formData: SchoolClass) => {
    const data = {
      ...formData,
    };

    const params: AxiosRequestConfig = {
      method: isEditing ? "PUT" : "POST",
      url: isEditing ? `/school-classes/${schoolClassId}` : "/school-classes",
      data,
      withCredentials: true,
    };

    requestBackend(params).then(() => {
      history.push("/admin/schoolClasses");
    });
  };

  const handleCancel = () => {
    history.push("/admin/schoolClasses");
  };

  return (
    <form className="container mb-4 py-lg-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        <div className="row border border-opacity-10 rounded mx-auto p-3 scform-ctr">
          <h2 className="form-title">Cadastrar Turma</h2>
          <div className="col-12">
            <label htmlFor="name" className="form-label">
              Nome
            </label>
            <input 
            {
              ...register("name", {
                required: "Campo obrigatório"
              })
            }
            type={"text"} 
            className={`form-control base-input ${
              errors.name ? "is-invalid" : ""
            }`}
            placeholder="Nome identificador da Turma"
            id="name" />
          </div>
          <div className="mt-3 col-12">
            <label htmlFor="period" className="form-label">
              Período
            </label>
            <Controller
                  name="period"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={periodOptions}
                      classNamePrefix="sc-period"
                      getOptionLabel={(pr: OptionType) => pr.label}
                      getOptionValue={(pr: OptionType) => pr.value}
                      inputId="period"
                      placeholder="Escolha um período"
                      isClearable
                    />
                  )}
                />
            <div className="invalid-feedback">Campo obrigatório.</div>
          </div>

          <hr className="my-4" />

          <div className="col-12 d-flex justify-content-between justify-content-md-around justify-content-lg-end">
            <button className="btn btn-outline-danger custom-btn me-2 me-lg-5" onClick={handleCancel}>
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
