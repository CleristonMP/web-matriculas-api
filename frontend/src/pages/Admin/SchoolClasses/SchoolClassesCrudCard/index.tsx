import { AxiosRequestConfig } from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SchoolClass } from "types/schoolClass";
import { requestBackend } from "util/requests";

import "./styles.css";

type Props = {
  schollClass: SchoolClass;
  onDelete: Function;
};

const SchoolClassesCrudCard = ({ schollClass, onDelete }: Props) => {
  const handleDelete = (schoolClassId: number) => {
    if (!window.confirm('Tem certeza de que deseja excluir esta turma?')) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/school-classes/${schoolClassId}`,
      withCredentials: true,
    };

    requestBackend(config)
      .then(() => {
        onDelete();
        toast.info(`A turma ${schollClass.name} foi excluída.`);
      })
      .catch(() => {
        toast.error('Há alunos cadastrados nessa turma.');
      });
  };

  return (
    <div className="card-body flex-sm-column">
      <Link to={schollClass.id!.toString()}>
        <h5 className="card-title">{schollClass.name}</h5>
        <h6 className="card-subtitle mb-3 text-muted">{`Período: ${schollClass.period}`}</h6>
      </Link>
      <div className="d-flex justify-content-center justify-content-sm-between justify-content-md-center">
        <button
          className="btn btn-outline-danger me-4 me-sm-0 me-md-4"
          onClick={() => handleDelete(schollClass.id!)}
        >
          EXCLUIR
        </button>
        <Link to={`${schollClass.id}/form`}>
          <button className="btn btn-outline-secondary">EDITAR</button>
        </Link>
      </div>
    </div>
  );
};

export default SchoolClassesCrudCard;
