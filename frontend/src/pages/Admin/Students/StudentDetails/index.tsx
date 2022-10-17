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

  /* Retrieving Student */
  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/students/${studentId}`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setStudent(response.data);
    });
  }, [studentId]);

  /* Retrieving School Class */
  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/school-classes/${student?.schoolClassId}`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setSchoolClass(response.data);
    });
  }, [student?.schoolClassId]);

  /* Retrieving Parent */
  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/parents/${student?.parentId}`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setParent(response.data);
    });
  }, [student?.parentId]);

  /* Retrieving Address */
  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/adresses/${student?.addressId}`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setAddress(response.data);
    });
  }, [student?.addressId]);

  /* Retrieving County */
  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/counties/${address?.countyId}`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setCounty(response.data);
    });
  }, [address?.countyId]);

  return (
    <div className="container mt-3 mb-5 py-lg-3">
      <div className="card base-card std-details-card">
        <div className="card-body p-4">
          <h2 className="card-title mb-3">
            {student?.name + " " + student?.lastName}
          </h2>
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
            <button
              type="button"
              className="btn btn-outline-secondary custom-btn me-2"
            >
              Editar
            </button>
            <button type="button" className="btn btn-outline-danger custom-btn">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
