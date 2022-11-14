import {
  formatCep,
  formatCpf,
  formatDate,
  formatPhoneNumber,
} from "util/formatters";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";
import { Student } from "types/student";
import { SchoolClass } from "types/schoolClass";
import { Address } from "types/address";
import { Parent } from "types/parent";
import { County } from "types/county";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { history } from "util/history";
import GoBackButton from "components/GoBackButton";
import AppLoader from "components/AppLoader";
import AppModal from "components/AppModal";

import "./styles.css";

type UrlParams = {
  studentId: string;
};

const StudentDetails = () => {
  const { studentId } = useParams<UrlParams>();

  const [student, setStudent] = useState<Student>();
  const [schoolClass, setSchoolClass] = useState<SchoolClass>();
  const [parent, setParent] = useState<Parent>();
  const [address, setAddress] = useState<Address>();
  const [county, setCounty] = useState<County>();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  /* Get Student */
  useEffect(() => {
    const studentRequestConfig: AxiosRequestConfig = {
      url: `/students/${studentId}`,
      withCredentials: true,
    };

    setIsLoading(true);
    requestBackend(studentRequestConfig).then((studentResponse) => {
      const student = studentResponse.data as Student;
      setStudent(studentResponse.data);

      /* Get School Class */
      const schoolClassRequestConfig: AxiosRequestConfig = {
        url: `/school-classes/${student.schoolClassId}`,
        withCredentials: true,
      };

      requestBackend(schoolClassRequestConfig).then((schoolClassResponse) => {
        setSchoolClass(schoolClassResponse.data);
      });

      /* Get Parent */
      const parentRequestConfig: AxiosRequestConfig = {
        url: `/parents/${student.parentId}`,
        withCredentials: true,
      };

      requestBackend(parentRequestConfig).then((parentResponse) => {
        setParent(parentResponse.data);
      });

      /* Get Address */
      const addressRequestConfig: AxiosRequestConfig = {
        url: `/adresses/${student.addressId}`,
        withCredentials: true,
      };

      requestBackend(addressRequestConfig).then((addressResponse) => {
        setAddress(addressResponse.data);
        const address = addressResponse.data as Address;

        /* Get County */
        const countyRequestConfig: AxiosRequestConfig = {
          url: `/counties/${address.countyId}`,
          withCredentials: true,
        };

        requestBackend(countyRequestConfig)
          .then((countyResponse) => {
            setCounty(countyResponse.data);
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
    });
  }, [studentId]);

  const handleDelete = (studentId: number) => {
    setOpen(false);

    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/students/${studentId}`,
      withCredentials: true,
    };

    if (student) {
      requestBackend(config)
        .then(() => {
          history.push("/admin/students");
          toast.info(
            `O(a) aluno(a) ${
              student.name +
              " " +
              student.lastName +
              " - Matrícula: " +
              student.enrollment
            } foi excluído(a) com sucesso.`
          );
        })
        .catch(() => {
          toast.error("Erro ao excluir aluno(a).");
        });
    }
  };

  return (
    <div className="container mt-3 mb-5 py-lg-3">
      {isLoading ? (
        <AppLoader />
      ) : (
        <div className="card base-card std-details-card">
          <div className="card-body p-4">
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <h2 className="card-title m-0">
                {student?.name + " " + student?.lastName}
              </h2>
              <GoBackButton />
            </div>
            <h5 className="card-subtitle mb-2">
              Matrícula: {student?.enrollment}
            </h5>
            <p className="card-text d-flex flex-column flex-sm-row">
              <span className="fw-bold me-sm-1">Data de nascimento:</span>{" "}
              <span>{student ? formatDate(student.birthDate) : <></>}</span>
            </p>
            <p className="card-text">
              <span className="fw-bold">CPF:</span>{" "}
              {student ? formatCpf(student.cpf) : <></>}
            </p>
            <p className="card-text">
              <span className="fw-bold">Turma:</span>{" "}
              {schoolClass?.name + " - " + schoolClass?.period}
            </p>
            <p className="card-text">
              <span className="fw-bold">Responsável:</span>{" "}
              {parent?.name + " " + parent?.lastName} &#47;
              <span className="fw-bold"> Telefone:</span>{" "}
              {parent ? formatPhoneNumber(parent.phone) : <></>}
            </p>
            <p className="card-text">
              <span className="fw-bold">Endereço:</span> {address?.publicPlace},{" "}
              {address?.complement}, nº {address?.number}, CEP:{" "}
              {address ? formatCep(address.zipCode.toString()) : <></>}, Bairro:{" "}
              {address?.district}, {county?.name} - {county?.state}
            </p>
            <div className="mt-4 mt-sm-5 d-flex justify-content-between justify-content-sm-around">
              <Link to={`form`} className="card-link">
                <button
                  type="button"
                  className="btn btn-outline-secondary custom-btn me-2"
                >
                  Editar
                </button>
              </Link>
              <button
                onClick={() => setOpen(true)}
                type="button"
                className="btn btn-outline-danger custom-btn"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
      <AppModal
        open={open}
        onClose={() => setOpen(false)}
        text="Tem certeza de que deseja excluir este aluno(a)?"
        onConfirmation={() => handleDelete(student?.id!)}
      />
    </div>
  );
};

export default StudentDetails;
