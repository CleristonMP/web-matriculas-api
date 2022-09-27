import "./styles.css";

type Props = {
  name: string;
  period: string;
};

const SchoolClassesCrudCard = ({ name, period }: Props) => {
  return (
    <div className="card base-card text-center school-class-card mb-3 col-sm-6 col-lg-4">
      <div className="card-body flex-sm-column">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-3 text-muted">Turno: {period}</h6>
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-danger card-link">EXCLUIR</button>
          <a href="link" className="card-link">
            <button className="btn btn-outline-secondary">EDITAR</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SchoolClassesCrudCard;
