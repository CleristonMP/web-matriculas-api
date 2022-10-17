import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import SchoolClassesCrudCard from "../SchoolClassesCrudCard";
import { requestBackend } from "util/requests";
import { AxiosRequestConfig } from "axios";
import { SchoolClass } from "types/schoolClass";
import { SpringPage } from "types/vendor/spring";

const SchoolClassesList = () => {
  const [page, setPage] = useState<SpringPage<SchoolClass>>();
  
  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: "/school-classes",
      withCredentials: true
    }

    requestBackend(params).then(response => {
      setPage(response.data);
    });
  }, [])
  
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
            <div className="card base-card text-center school-class-card mb-3 col-sm-6 col-lg-4" key={sc.id}>
              <SchoolClassesCrudCard schollClass={sc} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolClassesList;
