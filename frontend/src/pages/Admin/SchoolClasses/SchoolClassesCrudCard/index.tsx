import { Link } from "react-router-dom";
import { SchoolClass } from "types/schoolClass";

import "./styles.css";

type Props = {
  schollClass: SchoolClass;
};

const SchoolClassesCrudCard = ({ schollClass }: Props) => {
  return (
    <div className="card-body flex-sm-column">
      <Link to={schollClass.id.toString()}>
        <h5 className="card-title">{schollClass.name}</h5>
        <h6 className="card-subtitle mb-3 text-muted">{`Turno: ${schollClass.period}`}</h6>
      </Link>
      <div className="d-flex justify-content-center">
        <button className="btn btn-outline-danger card-link">EXCLUIR</button>
        <a href="link" className="card-link">
          <button className="btn btn-outline-secondary">EDITAR</button>
        </a>
      </div>
    </div>
  );
};

export default SchoolClassesCrudCard;
