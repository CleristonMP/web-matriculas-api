import SchoolClassesCrudCard from "../SchoolClassesCrudCard";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { requestBackend } from "util/requests";
import { AxiosRequestConfig } from "axios";
import { SchoolClass } from "types/schoolClass";
import { SpringPage } from "types/vendor/spring";
import Pagination from "components/Pagination";

type ControlComponentsData = {
  activePage: number;
  name?: string;
};

const SchoolClassesList = () => {
  const [page, setPage] = useState<SpringPage<SchoolClass>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({ activePage: 0 });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
    });
  };

  const getSchoolClasses = useCallback(() => {
    const config: AxiosRequestConfig = {
      url: "/school-classes",
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 6,
      }
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData.activePage]);

  useEffect(() => {
    getSchoolClasses();
  }, [getSchoolClasses]);

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
        <div className="row justify-content-sm-between px-xl-5">
          {page?.content.map((sc) => (
            <div
              className="card base-card text-center school-class-card mb-3 col-sm-6 col-lg-4"
              key={sc.id}
            >
              <SchoolClassesCrudCard
                schollClass={sc}
                onDelete={getSchoolClasses}
              />
            </div>
          ))}
        </div>
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

export default SchoolClassesList;
