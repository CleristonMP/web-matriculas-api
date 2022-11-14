import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "types/user";
import { formatRole } from "util/formatters";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";
import { Link } from "react-router-dom";
import { history } from "util/history";
import { toast } from "react-toastify";
import AppModal from "components/AppModal";
import GoBackButton from "components/GoBackButton";
import AppLoader from "components/AppLoader";

import "./styles.css";

type UrlParams = {
  userId: string;
};

const UserDetails = () => {
  const { userId } = useParams<UrlParams>();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      url: `/users/${userId}`,
      withCredentials: true,
    };

    setIsLoading(true);
    requestBackend(config)
      .then((response) => {
        setUser(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  const handleDelete = (userId: number) => {
    setOpen(false);

    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/users/${userId}`,
      withCredentials: true,
    };

    if (user) {
      requestBackend(config)
        .then(() => {
          toast.info(
            `O(a) usuário(a) ${
              user.name + " " + user.lastName
            } foi excluído(a) com sucesso.`
          );
          history.push("/admin/users");
        })
        .catch(() => {
          toast.error("Erro ao excluir usuário(a).");
        });
    }
  };

  return (
    <div className="container mt-3 mb-5 py-lg-3">
      {isLoading ? (
        <AppLoader />
      ) : (
        <div className="card base-card user-details-card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="card-title">{`${user?.name} ${user?.lastName}`}</h2>
              <GoBackButton />
            </div>
            <h5 className="card-subtitle mb-2 text-muted">{user?.email}</h5>
            <p className="card-text">
              <span className="fw-bold">Funções: </span>
              {user?.roles.map((role) => (
                <span key={role.id}>
                  {formatRole(role.authority)}
                  {user.roles.length > 1 ? " / " : ""}
                </span>
              ))}
            </p>
            <div className="mt-4 mt-sm-5 d-flex justify-content-between justify-content-sm-around">
              <Link to="form" className="card-link">
                <button
                  type="button"
                  className="btn btn-outline-secondary custom-btn me-2"
                >
                  Editar
                </button>
              </Link>
              <button
                onClick={() => setOpen(true)}
                type="button"
                className="btn btn-outline-danger custom-btn"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
      <AppModal
        open={open}
        onClose={() => setOpen(false)}
        text="Tem certeza de que deseja excluir este usuário?"
        onConfirmation={() => handleDelete(user?.id!)}
      />
    </div>
  );
};

export default UserDetails;
