import { AxiosRequestConfig } from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Student } from "types/student";
import { formatCpf, formatDate } from "util/formatters";
import { requestBackend } from "util/requests";
import "./styles.css";

type Props = {
  student: Student;
  onDelete: Function;
};

const StudentCrudCard = ({ student, onDelete }: Props) => {
  const handleDelete = (studentId: number) => {
    if (!window.confirm("Tem certeza de que deseja excluir este aluno(a)?")) {
      return;
    }

    const params: AxiosRequestConfig = {
      method: "DELETE",
      url: `/students/${studentId}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        onDelete();
        toast.info(
          `O(A) aluno(a) ${
            student.name +
            " " +
            student.lastName +
            " - Matrícula: " +
            student.enrollment
          } foi excluído(a).`
        );
      })
      .catch(() => {
        toast.error("Erro ao excluir aluno(a).");
      });
  };

  return (
    <div className="card-body custom-card-body flex-sm-column text-sm-center">
      <Link to={student.id!.toString()}>
        <h5 className="card-title mb-sm-3">
          {`${student.name} ${student.lastName}`}
        </h5>
        <h6 className="card-subtitle text-muted mb-sm-2">{`CPF: ${formatCpf(student.cpf)}`}</h6>
      </Link>
      <p className="card-text mb-sm-3">{`Data de nascimento: ${formatDate(student.birthDate)}`}</p>
      <div className="d-flex justify-content-center">
        <button 
          className="btn btn-outline-danger me-4"
          onClick={() => handleDelete(student.id!)}
          >EXCLUIR</button>
        <Link to={`${student.id}/form`}>
          <button className="btn btn-outline-secondary">EDITAR</button>
        </Link>
      </div>
    </div>
  );
};

export default StudentCrudCard;
