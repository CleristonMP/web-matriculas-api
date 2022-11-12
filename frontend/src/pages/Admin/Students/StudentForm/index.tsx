import { ReactComponent as AddIcon } from "assets/images/add-icon.svg";
import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
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
import GoBackButton from "components/GoBackButton";
import Select from "react-select";
import {
  maskCpfNumber,
  maskPhoneNumber,
  maskZipCodeNumber,
} from "util/maskers";
import AppLoader from "components/AppLoader";
import AddCountyModal from "./AddCountyModal";

import "./styles.css";

type UrlParams = {
  studentId: string;
};

const StudentForm = () => {
  const [counties, setCounties] = useState<County[]>([]);
  const [schoolClasses, setSchoolClasses] = useState<SchoolClass[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
  const getCounties = useCallback(() => {
    requestBackend({ url: "/counties", withCredentials: true }).then(
      (response) => {
        setCounties(response.data.content);
      }
    );
  }, []);

  useEffect(() => {
    getCounties();
  }, [getCounties]);

  // Get School Classes
  useEffect(() => {
    requestBackend({ url: "/school-classes", withCredentials: true }).then(
      (response) => {
        setSchoolClasses(response.data.content);
      }
    );
  }, []);

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = String(event.target.value).replace(/[^0-9]/g, "");
    if (value.length === 8) {
      const cep = value;
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
    event.target.value = maskZipCodeNumber(event.target.value);
  };

  //Get Student for editing
  useEffect(() => {
    if (isEditing) {
      // Student
      setIsLoading(true);
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
        })
          .then((parentResponse) => {
            const parent = parentResponse.data as Parent;
            setValue("parent", parent);
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
    }
  }, [isEditing, setValue, studentId]);

  const onSubmit = (formData: StudentToForm) => {
    setIsProcessing(true);

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
      {isLoading || isProcessing ? (
        <AppLoader isProcessing={isProcessing} />
      ) : (
        <div className="container">
          <div className="border border-opacity-10 rounded p-2 px-sm-3">
            {/* Student data session */}
            <div className="row g-3 p-lg-2">
              <div className="d-flex align-items-center justify-content-between">
                <h2 className="form-title">Dados do aluno</h2>
                <GoBackButton />
              </div>
              <div className="col-12 col-sm-6">
                <label htmlFor="name" className="form-label">
                  Nome
                </label>
                <input
                  {...register("name", { required: "Campo obrigatório" })}
                  type={"text"}
                  className={`form-control base-input ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  id="name"
                  placeholder="Digite o primeiro nome do aluno"
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name?.message}</div>
                )}
              </div>

              <div className="col-12 col-sm-6">
                <label htmlFor="lastName" className="form-label">
                  Sobrenome
                </label>
                <input
                  {...register("lastName", { required: "Campo obrigatório" })}
                  type={"text"}
                  className={`form-control base-input ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  id="lastName"
                  placeholder="Digite o(s) sobrenome(s) do aluno"
                />
                {errors.lastName && (
                  <div className="invalid-feedback">
                    {errors.lastName.message}
                  </div>
                )}
              </div>

              <div className="col-12 col-sm-6">
                <label htmlFor="cpf" className="form-label">
                  CPF
                </label>
                <div className="input-group has-validation">
                  <input
                    {...register("cpf", {
                      onChange(event) {
                        event.target.value = maskCpfNumber(event.target.value);
                      },
                    })}
                    type={"text"}
                    id="cpf"
                    maxLength={14}
                    placeholder="Digite o CPF nome do aluno"
                    className="form-control base-input"
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <label htmlFor="birthDate" className="form-label">
                  Data de nascimento
                </label>
                <input
                  {...register("birthDate", { required: true })}
                  type={"date"}
                  className={`form-control base-input ${
                    errors.birthDate ? "is-invalid" : ""
                  }`}
                  id="birthDate"
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
                  {...register("enrollment", {
                    required: true,
                    onChange(event) {
                      event.target.value = event.target.value.replace(
                        /\D/g,
                        ""
                      );
                    },
                  })}
                  type={"text"}
                  inputMode={"numeric"}
                  className={`form-control base-input ${
                    errors.enrollment ? "is-invalid" : ""
                  }`}
                  id="enrollment"
                  placeholder="Informe a matrícula do aluno"
                  maxLength={8}
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
                  className={`form-control base-input ${
                    errors.parent?.name ? "is-invalid" : ""
                  }`}
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
                  className={`form-control base-input ${
                    errors.parent?.lastName ? "is-invalid" : ""
                  }`}
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
                      onChange(event) {
                        event.target.value = maskCpfNumber(event.target.value);
                      },
                    })}
                    type={"text"}
                    className="form-control base-input"
                    id="parent.cpf"
                    placeholder="Digite o CPF do responsável pelo aluno"
                    maxLength={14}
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <label htmlFor="parent.phone" className="form-label">
                  Telefone
                </label>
                <input
                  {...register("parent.phone", {
                    onChange(event) {
                      event.target.value = maskPhoneNumber(event.target.value);
                    },
                  })}
                  type={"tel"}
                  className="form-control base-input"
                  id="parent.phone"
                  placeholder="Informe um telefone para contato"
                  maxLength={16}
                />
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
                  className={`form-control base-input ${
                    errors.address?.publicPlace ? "is-invalid" : ""
                  }`}
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
                  {...register("address.number", { required: true })}
                  type={"text"}
                  className={`form-control base-input ${
                    errors.address?.number ? "is-invalid" : ""
                  }`}
                  id="address.number"
                  placeholder="Nº ..."
                />
                {errors.address?.number && (
                  <div className="invalid-feedback">Campo obrigatório.</div>
                )}
              </div>

              <div className="col-12 col-sm-4">
                <label htmlFor="address.complement" className="form-label">
                  Complemento
                </label>
                <input
                  {...register("address.complement")}
                  type={"text"}
                  className="form-control base-input"
                  id="address.complement"
                  placeholder="Quadra, bloco..."
                />
              </div>

              <div className="col-12 col-sm-4">
                <label htmlFor="address.zipCode" className="form-label">
                  CEP
                </label>

                <input
                  {...register("address.zipCode", {
                    required: true,
                    onChange(event) {
                      handleZipCodeChange(event);
                    },
                  })}
                  type={"text"}
                  className={`form-control base-input ${
                    errors.address?.zipCode ? "is-invalid" : ""
                  }`}
                  id="address.zipCode"
                  placeholder="65.000-000"
                  maxLength={10}
                />
                {errors.address?.zipCode && (
                  <div className="invalid-feedback">Campo obrigatório.</div>
                )}
              </div>

              <div className="col-12 col-sm-4">
                <label htmlFor="address.district" className="form-label">
                  Bairro
                </label>
                <input
                  {...register("address.district", { required: true })}
                  type={"text"}
                  className={`form-control base-input ${
                    errors.address?.district ? "is-invalid" : ""
                  }`}
                  id="address.district"
                  placeholder="Cohatrac, Trizidela..."
                />
                {errors.address?.district && (
                  <div className="invalid-feedback">Campo obrigatório.</div>
                )}
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
                      classNamePrefix="custom-select"
                      getOptionLabel={(county) => county.name}
                      getOptionValue={(county) => String(county.id)}
                      inputId="address.county"
                      placeholder="Município"
                      isClearable
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
                  className="form-control base-input"
                  id="address.county.state"
                  value={"MA"}
                  disabled
                />
              </div>

              <div
                onClick={() => setIsOpen(true)}
                className="col-3 col-sm-2 add-county-btn-ctr"
              >
                <span className="add-county-tooltip-text">Adicionar Município</span>
                <AddIcon />
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
      )}
      <AddCountyModal
        open={isOpen}
        setOpen={setIsOpen}
        updateCounties={getCounties}
        onClose={() => setIsOpen(false)}
      />
    </form>
  );
};

export default StudentForm;
