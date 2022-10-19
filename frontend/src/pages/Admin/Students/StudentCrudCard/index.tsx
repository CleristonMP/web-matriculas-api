import { Link } from "react-router-dom";
import { Student } from "types/student";
import "./styles.css";

type Props = {
  student: Student;
};

const StudentCrudCard = ({ student }: Props) => {
  return (
    <div className="card-body custom-card-body flex-sm-column text-sm-center">
      <Link to={student.id!.toString()}>
        <h5 className="card-title mb-sm-3">
          {`${student.name} ${student.lastName}`}
        </h5>
        <h6 className="card-subtitle text-muted mb-sm-2">{`CPF: ${student.cpf}`}</h6>
      </Link>
      <p className="card-text mb-sm-3">{`Data de nascimento: ${student.birthDate}`}</p>
      <div className="d-flex justify-content-center">
        <button className="btn btn-outline-danger card-link">EXCLUIR</button>
        <Link to={`${student.id}/form`} className="card-link">
          <button className="btn btn-outline-secondary">EDITAR</button>
        </Link>
      </div>
    </div>
  );
};

export default StudentCrudCard;
