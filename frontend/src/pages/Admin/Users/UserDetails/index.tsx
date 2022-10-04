import { User } from "types/user";
import { formatRole } from "util/formatters";

import "./styles.css";

const UserDetails = () => {
  const mockData: User = {
    id: 1,
    name: "Maria",
    lastName: "Silva",
    email: "maria@gmail.com",
    roles: [
      {
        id: 1,
        authority: "ROLE_ADMIN",
      },
      {
        id: 2,
        authority: "ROLE_OPERATOR",
      },
    ],
  };

  return (
    <div className="container mt-3 mb-5 py-lg-3">
      <div className="card base-card user-details-card">
        <div className="card-body">
          <h2 className="card-title">{`${mockData.name} ${mockData.lastName}`}</h2>
          <h5 className="card-subtitle mb-2 text-muted">{mockData.email}</h5>
          <p className="card-text">
            <span className="fw-bold">Funções: </span>
            {mockData.roles.map((role) => (
              <span key={role.id}>
                {formatRole(role.authority)}
                {mockData.roles.length > 1 ? " / " : ""}
              </span>
            ))}
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

export default UserDetails;
