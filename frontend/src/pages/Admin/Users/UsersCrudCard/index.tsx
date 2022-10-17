import { AxiosRequestConfig } from "axios";
import { Link } from "react-router-dom";
import { User } from "types/user";
import { requestBackend } from "util/requests";
import { toast } from "react-toastify";

type Props = {
  user: User;
  onDelete: Function;
};

const UsersCrudCard = ({ user, onDelete }: Props) => {
  const handleDelete = (userId: number) => {
    if (!window.confirm("Tem certeza de que deseja deletar este usuário?")) {
      return;
    }

    const params: AxiosRequestConfig = {
      method: "DELETE",
      url: `/users/${userId}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        onDelete();
        toast.info(
          `O usuário ${user.name + " " + user.lastName} foi excluído.`
        );
      })
      .catch(() => {
        toast.error("Não foi possível excluir o usuário.");
      });
  };

  return (
    <div className="card base-card text-center school-class-card mb-3 col-sm-6 col-lg-4">
      <div className="card-body flex-sm-column">
        <Link to={user.id.toString()}>
          <h5 className="card-title">{`${user.name} ${user.lastName}`}</h5>
          <h6 className="card-subtitle mb-3 text-muted">{user.email}</h6>
        </Link>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-outline-danger card-link"
            onClick={() => handleDelete(user.id)}
          >
            EXCLUIR
          </button>
          <a href={`users/${user.id.toString()}/form`} className="card-link">
            <button className="btn btn-outline-secondary">EDITAR</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UsersCrudCard;
