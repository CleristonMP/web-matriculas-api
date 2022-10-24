import { Link } from "react-router-dom";
import UsersCrudCard from "../UsersCrudCard";
import { useEffect, useState, useCallback } from "react";
import { SpringPage } from "types/vendor/spring";
import { User } from "types/user";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";
import { ControlComponentsData } from "types/controlComponentsData";
import Pagination from "components/Pagination";

const UsersList = () => {
  const [page, setPage] = useState<SpringPage<User>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({ activePage: 0 });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
    });
  };

  const getUsers = useCallback(() => {
    const config: AxiosRequestConfig = {
      url: "/users",
      withCredentials: true,
      params: {
        size: 6,
        page: controlComponentsData.activePage,
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData.activePage]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

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
              <UsersCrudCard user={user} onDelete={getUsers} key={user.id} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="row">
        <Pagination
          forcePage={page?.number}
          pageCount={page ? page.totalPages : 0}
          range={3}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UsersList;
