import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { requestBackend } from "util/requests";
import { County } from "types/county";
import { StudentToForm } from "types/studentToForm";
import { SchoolClass } from "types/schoolClass";
import { ViaCep } from "types/viacep";
import { history } from "util/history";
import { Address } from "types/address";
import { Parent } from "types/parent";
import { Student } from "types/student";
import { toast } from "react-toastify";
import Select from "react-select";

import "./styles.css";

type UrlParams = {
  studentId: string;
};

const StudentForm = () => {
  const [counties, setCounties] = useState<County[]>([]);
  const [schoolClasses, setSchoolClasses] = useState<SchoolClass[]>([]);

  const { studentId } = useParams<UrlParams>();

  const isEditing = studentId !== "create";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<StudentToForm>();

  // Get Counties
  useEffect(() => {
    requestBackend({ url: "/counties", withCredentials: true }).then(
      (response) => {
        setCounties(response.data.content);
      }
    );
  }, []);

  // Get School Classes
  useEffect(() => {
    requestBackend({ url: "/school-classes", withCredentials: true }).then(
      (response) => {
        setSchoolClasses(response.data.content);
      }
    );
  }, []);

  const handleCepChange = (inputValue: React.ChangeEvent<HTMLInputElement>) => {
    if (
      inputValue.target.value.length === 8 &&
      Number.isInteger(parseInt(inputValue.target.value))
    ) {
      const cep = inputValue.target.value;
      axios({
        url: `https://viacep.com.br/ws/${cep}/json/`,
      }).then((response) => {
        const viaCepData: ViaCep = response.data;
        setValue("address.complement", viaCepData.complemento);
        setValue(
          "address.county",
          counties?.reduce((obj) =>
            obj["name"] === viaCepData.localidade
              ? obj
              : { id: 0, name: "", state: "" }
          )
        );
        setValue("address.county.state", viaCepData.uf);
        setValue("address.complement", viaCepData.complemento);
        setValue("address.publicPlace", viaCepData.logradouro);
        setValue("address.district", viaCepData.bairro);
      });
    }
  };

  //Get Student for editing
  useEffect(() => {
    if (isEditing) {
      // Student
      requestBackend({
        url: `/students/${studentId}`,
        withCredentials: true,
      }).then((studentResponse) => {
        const student = studentResponse.data as Student;
        setValue("id", student.id);
        setValue("name", student.name);
        setValue("lastName", student.lastName);
        setValue("birthDate", student.birthDate);
        setValue("cpf", student.cpf);
        setValue("enrollment", student.enrollment);
        const addressId = student.addressId;
        const schoolClassId = student.schoolClassId;
        const parentId = student.parentId;

        // Address
        requestBackend({
          url: `/adresses/${addressId}`,
          withCredentials: true,
        }).then((addressResponse) => {
          const address = addressResponse.data as Address;
          setValue("address.id", address.id);
          setValue("address.publicPlace", address.publicPlace);
          setValue("address.number", address.number);
          setValue("address.complement", address.complement);
          setValue("address.zipCode", address.zipCode);
          setValue("address.district", address.district);

          requestBackend({
            url: `/counties/${address.countyId}`,
            withCredentials: true,
          }).then((countyResponse) => {
            const county = countyResponse.data as County;
            setValue("address.county", county);
            setValue("address.county.state", county.state);
          });
        });

        // School Class
        requestBackend({
          url: `/school-classes/${schoolClassId}`,
          withCredentials: true,
        }).then((schoolClassResponse) => {
          const schoolClass = schoolClassResponse.data as SchoolClass;
          setValue("schoolClass", { ...schoolClass });
        });

        // Parent
        requestBackend({
          url: `/parents/${parentId}`,
          withCredentials: true,
        }).then((parentResponse) => {
          const parent = parentResponse.data as Parent;
          setValue("parent", parent);
        });
      });
    }
  }, [isEditing, setValue, studentId]);

  const onSubmit = (formData: StudentToForm) => {
    // Address config and request
    const addressData: Address = {
      id: isEditing ? formData.address.id : undefined,
      publicPlace: formData.address.publicPlace,
      number: formData.address.number,
      complement: formData.address.complement,
      zipCode: formData.address.zipCode,
      district: formData.address.district,
      countyId: formData.address.county.id,
    };

    const addressRequestConfig: AxiosRequestConfig = {
      method: isEditing ? "PUT" : "POST",
      url: isEditing ? `/adresses/${addressData.id}` : "/adresses",
      data: addressData,
      withCredentials: true,
    };

    // Parent config and request
    const parentData: Parent = {
      id: isEditing ? formData.parent.id : undefined,
      name: formData.parent.name,
      lastName: formData.parent.lastName,
      cpf: formData.parent.cpf,
      phone: formData.parent.phone,
    };

    const parentRequestConfig: AxiosRequestConfig = {
      method: isEditing ? "PUT" : "POST",
      url: isEditing ? `/parents/${parentData.id}` : "/parents",
      data: parentData,
      withCredentials: true,
    };

    requestBackend(addressRequestConfig).then((addressResponse) => {
      const addressId = addressResponse.data.id;
      requestBackend(parentRequestConfig).then((parentResponse) => {
        const parentId = parentResponse.data.id;

        // Student config and request
        const studentData: Student = {
          id: isEditing ? formData.id : undefined,
          enrollment: formData.enrollment,
          name: formData.name,
          lastName: formData.lastName,
          cpf: formData.cpf,
          birthDate: formData.birthDate,
          schoolClassId: formData.schoolClass.id,
          addressId,
          parentId,
        };

        const studentRequestConfig: AxiosRequestConfig = {
          method: isEditing ? "PUT" : "POST",
          url: isEditing ? `/students/${studentData.id}` : "/students",
          data: studentData,
          withCredentials: true,
        };

        requestBackend(studentRequestConfig).then(() => {
          isEditing
            ? toast.info(
                "As informações do aluno(a) foram atualizadas com sucesso."
              )
            : toast.info("Aluno(a) cadastrado com sucesso.");
          history.push("/admin/students");
        });
      });
    });
  };

  const handleCancel = () => {
    history.push("/admin/students");
  };

  return (
    <form className="mb-4 p-lg-3" onSubmit={handleSubmit(onSubmit)}>
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
                {...register("name", { required: true })}
                type={"text"}
                className="form-control"
                id="name"
                placeholder="Digite o primeiro nome do aluno"
              />
              {errors.name && (
                <div className="invalid-feedback">Campo obrigatório.</div>
              )}
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="lastName" className="form-label">
                Sobrenome
              </label>
              <input
                {...register("lastName", { required: true })}
                type={"text"}
                className="form-control"
                id="lastName"
                placeholder="Digite o(s) sobrenome(s) do aluno"
              />
              {errors.lastName && (
                <div className="invalid-feedback">Campo obrigatório.</div>
              )}
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="cpf" className="form-label">
                CPF
              </label>
              <div className="input-group has-validation">
                <input
                  {...register("cpf", { required: true })}
                  type={"text"}
                  className="form-control"
                  id="cpf"
                  placeholder="Digite o CPF nome do aluno"
                />
                {errors.cpf && (
                  <div className="invalid-feedback">Campo obrigatório.</div>
                )}
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="birthDate" className="form-label">
                Data de nascimento
              </label>
              <input
                {...register("birthDate", { required: true })}
                type={"date"}
                className="form-control"
                id="birthDate"
                placeholder="Informe a data de nascimento do aluno"
              />
              {errors.birthDate && (
                <div className="invalid-feedback">Campo obrigatório.</div>
              )}
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="enrollment" className="form-label">
                Nº Matrícula
              </label>
              <input
                {...register("enrollment", { required: true })}
                type={"number"}
                className="form-control"
                id="enrollment"
                placeholder="Informe a matrícula do aluno"
              />
              {errors.enrollment && (
                <div className="invalid-feedback">Campo obrigatório.</div>
              )}
            </div>
          </div>

          <hr className="my-4" />

          {/* Parent data session */}
          <div className="row g-3 p-lg-2 mt-2">
            <h2 className="form-title">Dados do responsável</h2>
            <div className="col-12 col-sm-6">
              <label htmlFor="parent.name" className="form-label">
                Nome
              </label>
              <input
                {...register("parent.name", { required: true })}
                type={"text"}
                className="form-control"
                id="parent.name"
                placeholder="Digite o primeiro nome do responsável pelo aluno"
              />
              {errors.parent?.name && (
                <div className="invalid-feedback">Campo obrigatório.</div>
              )}
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="parent.lastName" className="form-label">
                Sobrenome
              </label>
              <input
                {...register("parent.lastName", { required: true })}
                type={"text"}
                className="form-control"
                id="parent.lastName"
                placeholder="Digite o(s) sobrenome(s) do responsável pelo aluno"
              />
              {errors.parent?.lastName && (
                <div className="invalid-feedback">Campo obrigatório.</div>
              )}
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="parent.cpf" className="form-label">
                CPF
              </label>
              <div className="input-group has-validation">
                <input
                  {...register("parent.cpf", {
                    required: true,
                  })}
                  type={"text"}
                  className="form-control"
                  id="parent.cpf"
                  placeholder="Digite o CPF do responsável pelo aluno"
                />
                {errors.parent?.cpf && (
                  <div className="invalid-feedback">Campo obrigatório.</div>
                )}
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="parent.phone" className="form-label">
                Telefone
              </label>
              <input
                {...register("parent.phone", { required: true })}
                type={"tel"}
                className="form-control"
                id="parent.phone"
                placeholder="Informe um telefone para contato"
              />
              {errors.parent?.phone && (
                <div className="invalid-feedback">Campo obrigatório.</div>
              )}
            </div>
          </div>

          <hr className="my-4" />

          {/* Address session */}
          <div className="row g-3 p-lg-2 mt-2">
            <h2 className="form-title">Endereço</h2>
            <div className="col-12">
              <label htmlFor="address.publicPlace" className="form-label">
                Logradouro
              </label>
              <input
                {...register("address.publicPlace", { required: true })}
                type={"text"}
                className="form-control"
                id="address.publicPlace"
                placeholder="Rua, avenida, travessa..."
              />
              {errors.address?.publicPlace && (
                <div className="invalid-feedback">Campo obrigatório.</div>
              )}
            </div>

            <div className="col-12 col-sm-4">
              <label htmlFor="address.number" className="form-label">
                Número
              </label>
              <input
                {...register("address.number")}
                type={"text"}
                className="form-control"
                id="address.number"
                placeholder="Nº ..."
              />
            </div>

            <div className="col-12 col-sm-4">
              <label htmlFor="address.complement" className="form-label">
                Complemento
              </label>
              <input
                {...register("address.complement")}
                type={"text"}
                className="form-control"
                id="address.complement"
                placeholder="Quadra, bloco..."
              />
            </div>

            <div className="col-12 col-sm-4">
              <label htmlFor="address.zipCode" className="form-label">
                CEP
              </label>

              <input
                {...register("address.zipCode")}
                type={"text"}
                className="form-control"
                id="address.zipCode"
                placeholder="65.000-000"
                onChange={handleCepChange}
                maxLength={8}
                onInput={
                  (value: React.FormEvent<HTMLInputElement>) =>
                    (value.currentTarget.value =
                      value.currentTarget.value.replace(/[^0-9]/g, ""))
                  /* Credits: https://www.techiedelight.com/pt/restrict-html-input-text-box-to-allow-only-numeric-values/#:~:text=Usando%20%3Cinput%20type%3D%22number,elementos%20do%20n%C3%BAmero%20do%20tipo. */
                }
              />
            </div>

            <div className="col-12 col-sm-4">
              <label htmlFor="address.district" className="form-label">
                Bairro
              </label>
              <input
                {...register("address.district")}
                type={"text"}
                className="form-control"
                id="address.district"
                placeholder="Cohatrac, Trizidela..."
              />
            </div>

            <div className="col-12 col-sm-4">
              <label htmlFor="address.county" className="form-label">
                Município
              </label>
              <Controller
                name="address.county"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={counties}
                    classNamePrefix="counties-crud-select"
                    getOptionLabel={(county) => county.name}
                    getOptionValue={(county) => String(county.id)}
                    inputId="address.county"
                    placeholder="Município"
                  />
                )}
              />
              {errors.address?.county && (
                <div className="invalid-feedback d-block">
                  Campo obrigatório
                </div>
              )}
            </div>

            <div className="col-3 col-sm-2">
              <label htmlFor="address.county.state" className="form-label">
                UF
              </label>
              <input
                {...register("address.county.state")}
                type={"text"}
                className="form-control"
                id="address.county.state"
                disabled
              />
            </div>
          </div>

          <hr className="my-4" />

          {/* School Class session */}
          <div className="row g-3 p-lg-2 mt-2">
            <h2 className="form-title">Turma</h2>
            <div className="school-class-custom-ctr">
              <label htmlFor="schoolClass" className="form-label">
                Identificador
              </label>
              <Controller
                name="schoolClass"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={schoolClasses}
                    classNamePrefix="custom-select"
                    getOptionLabel={(sc) => sc.name + " - " + sc.period}
                    getOptionValue={(sc) => String(sc.id!)}
                    inputId="schoolClass"
                    placeholder="Turma"
                  />
                )}
              />
              {errors.schoolClass && (
                <div className="invalid-feedback d-block">
                  Campo obrigatório
                </div>
              )}
            </div>
          </div>

          <hr className="my-4" />

          {/* Buttons */}
          <div className="mb-4 col-12 d-flex justify-content-between justify-content-md-around justify-content-lg-end">
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

export default StudentForm;
