import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { User } from "types/user";
import { formatRole } from "util/formatters";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";

import "./styles.css";

type UrlParams = {
  userId: string;
};

const UserDetails = () => {
  const { userId } = useParams<UrlParams>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/users/${userId}`,
      withCredentials: true
    }

    requestBackend(params).then(response => {
      setUser(response.data)
    })
  }, [userId]);

  return (
    <div className="container mt-3 mb-5 py-lg-3">
      <div className="card base-card user-details-card">
        <div className="card-body">
          <h2 className="card-title">{`${user?.name} ${user?.lastName}`}</h2>
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
