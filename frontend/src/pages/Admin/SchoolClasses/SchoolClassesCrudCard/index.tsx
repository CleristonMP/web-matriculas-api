type Props = {
  name: string;
  period: string;
};

const SchoolClassesCrudCard = ({ name, period }: Props) => {
  return (
    <div className="card base-card mb-3">
      <div className="card-body custom-card-body">
        <h5 className="card-title">
          {name} {period}
        </h5>
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
