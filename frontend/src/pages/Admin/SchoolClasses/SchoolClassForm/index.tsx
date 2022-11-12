import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Period, SchoolClass } from "types/schoolClass";
import { useEffect } from "react";
import { requestBackend } from "util/requests";
import { AxiosRequestConfig } from "axios";
import { history } from "util/history";
import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import GoBackButton from "components/GoBackButton";
import AppLoader from "components/AppLoader";

import "./styles.css";

type UrlParams = {
  schoolClassId: string;
};

const periodOptions: Period[] = [
  { id: 1, name: "Matutino" },
  { id: 2, name: "Vespertino" },
  { id: 3, name: "Noturno" },
];

const getPeriodValue = (value: string) => {
  const periods: any = {
    Matutino: { id: 1, name: "Matutino" },
    Vespertino: { id: 2, name: "Vespertino" },
    Noturno: { id: 3, name: "Noturno" },
  };
  return periods[value];
};

const SchoolClassForm = () => {
  const { schoolClassId } = useParams<UrlParams>();
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const isEditing = schoolClassId !== "create";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<SchoolClass>();

  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      requestBackend({
        url: `/school-classes/${schoolClassId}`,
        withCredentials: true,
      })
        .then((response) => {
          const schoolClass = response.data as SchoolClass;
          setValue("name", schoolClass.name);
          setValue("period", getPeriodValue(String(schoolClass.period)));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isEditing, schoolClassId, setValue]);

  const onSubmit = (formData: SchoolClass) => {
    setIsProcessing(true);

    const data = {
      ...formData,
      period: formData.period.name,
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? "PUT" : "POST",
      url: isEditing ? `/school-classes/${schoolClassId}` : "/school-classes",
      data,
      withCredentials: true,
    };

    requestBackend(config).then(() => {
      isEditing
        ? toast.info("Turma atualizada com sucesso.")
        : toast.info("Turma cadastrada com sucesso.");
      history.push("/admin/schoolClasses");
    });
  };

  const handleCancel = () => {
    history.push("/admin/schoolClasses");
  };

  return (
    <form className="container mb-4 py-lg-3" onSubmit={handleSubmit(onSubmit)}>
      {isLoading || isProcessing ? (
        <AppLoader isProcessing={isProcessing} />
      ) : (
        <div className="container">
          <div className="row border border-opacity-10 rounded mx-auto p-3 scform-ctr">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="form-title">
                {isEditing ? "Atualizar" : "Cadastrar"} Turma
              </h2>
              <GoBackButton />
            </div>
            <div className="col-12">
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
                placeholder="Nome identificador da Turma"
                id="name"
              />
              <div className="invalid-feedback">{errors.name?.message}</div>
            </div>
            <div className="mt-3 col-12">
              <label htmlFor="period" className="form-label">
                Período
              </label>
              <Controller
                name="period"
                rules={{ required: "Campo obrigatório" }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={periodOptions}
                    classNamePrefix="custom-select"
                    getOptionLabel={(pr: Period) => pr.name}
                    getOptionValue={(pr: Period) => String(pr.id)}
                    inputId="period"
                    placeholder="Escolha um período"
                    isClearable
                  />
                )}
              />
             <span className="text-danger">{errors.period?.message}</span>
            </div>

            <hr className="my-4" />

            <div className="col-12 d-flex justify-content-between justify-content-md-around justify-content-lg-end">
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
      )}
    </form>
  );
};

export default SchoolClassForm;
