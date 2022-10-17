import { Link } from "react-router-dom";
import UsersCrudCard from "../UsersCrudCard";
import { useEffect, useState } from "react";
import { SpringPage } from "types/vendor/spring";
import { User } from "types/user";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";

const UsersList = () => {
  const [page, setPage] = useState<SpringPage<User>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: "/users",
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <div className="container mb-2 py-lg-3">
      <div className="container mb-3 text-center text-lg-start px-xl-5">
        <Link to="create/form">
          <button className="btn btn-primary text-white h-50px btn-crud-add">
            ADICIONAR
          </button>
        </Link>
      </div>
      <div className="container">
        {page ? (
          <div className="row px-xl-5 justify-content-sm-between">
            {page.content.map((user) => (
              <UsersCrudCard user={user} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UsersList;
