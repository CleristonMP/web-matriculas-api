import { Link } from "react-router-dom";
import { User } from "types/user";

type Props = {
  user: User;
};

const UsersCrudCard = ({ user }: Props) => {
  return (
    <div className="card base-card text-center school-class-card mb-3 col-sm-6 col-lg-4">
      <div className="card-body flex-sm-column">
        <Link to={user.id.toString()}>
          <h5 className="card-title">{`${user.name} ${user.lastName}`}</h5>
          <h6 className="card-subtitle mb-3 text-muted">{user.email}</h6>
        </Link>
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

export default UsersCrudCard;
