import {
  formatCep,
  formatCpf,
  formatDate,
  formatPhoneNumber,
} from "util/formatters";
import { mockStudentDetailsData } from "./mockStudentDetailsData";

import "./styles.css";

const StudentDetails = () => {
  const student = mockStudentDetailsData;

  return (
    <div className="container mt-3 mb-5 py-lg-3">
      <div className="card base-card std-details-card">
        <div className="card-body p-4">
          <h2 className="card-title mb-3">
            {student.name + " " + student.lastName}
          </h2>
          <h5 className="card-subtitle mb-2">
            Matrícula: {student.enrollment}
          </h5>
          <p className="card-text d-flex flex-column flex-sm-row">
            <span className="fw-bold me-sm-1">Data de nascimento:</span>{" "}
            <span>{formatDate(student.birthDate)}</span>
          </p>
          <p className="card-text">
            <span className="fw-bold">CPF:</span> {formatCpf(student.cpf)}
          </p>
          <p className="card-text">
            <span className="fw-bold">Turma:</span>{" "}
            {student.schoolClass.name + " - " + student.schoolClass.period}
          </p>
          <p className="card-text">
            <span className="fw-bold">Responsável:</span>{" "}
            {student.parent.name + " " + student.parent.lastName} &#47;
            <span className="fw-bold"> Telefone:</span>{" "}
            {formatPhoneNumber(student.parent.phone)}
          </p>
          <p className="card-text">
            <span className="fw-bold">Endereço:</span>{" "}
            {student.address.publicPlace}, {student.address.complement}, nº{" "}
            {student.address.number}, CEP: {formatCep(student.address.zipCode)},
            Bairro: {student.address.district}, {student.address.county.name} -{" "}
            {student.address.county.state}
          </p>
          <div className="mt-4 mt-sm-5 d-flex justify-content-between justify-content-sm-around">
            <button type="button" className="btn btn-outline-secondary custom-btn me-2">
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
