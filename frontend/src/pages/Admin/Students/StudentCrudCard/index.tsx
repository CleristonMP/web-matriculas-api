import "./styles.css";

type Props = {
  name: string;
  lastName: string;
  cpf: string;
  birthDate: string;
};

const StudentCrudCard = ({ name, lastName, cpf, birthDate }: Props) => {
  return (
    <div className="card base-card std-card mb-3 mb-xl-5 col-sm-6 col-xl-4">
      <div className="card-body custom-card-body flex-sm-column">
        <h5 className="card-title mb-sm-3">
          {name} {lastName}
        </h5>
        <h6 className="card-subtitle text-muted mb-sm-2">CPF: {cpf}</h6>
        <p className="card-text text-sm-center mb-sm-3">Data de nascimento: {birthDate}</p>
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

export default StudentCrudCard;
