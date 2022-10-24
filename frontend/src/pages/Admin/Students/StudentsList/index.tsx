import { Link } from "react-router-dom";
import StudentCrudCard from "../StudentCrudCard";
import { useEffect, useState, useCallback } from "react";
import { SpringPage } from "types/vendor/spring";
import { Student } from "types/student";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";

import "./styles.css";

const StudentsList = () => {
  const [page, setPage] = useState<SpringPage<Student>>();

  const getStudents = useCallback(() => {
    const config: AxiosRequestConfig = {
      url: "/students",
      withCredentials: true,
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, []);

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  return (
    <div className="container mb-2 mb-xl-0 py-lg-3 pb-xl-0">
      <div className="container mb-3 text-center px-xl-5 text-lg-start">
        <Link to="create/form">
          <button className="btn btn-primary text-white h-50px btn-crud-add">
            ADICIONAR
          </button>
        </Link>
      </div>
      <div className="container">
        <div className="row justify-content-between px-xl-5">
          {page?.content.map((std) => (
            <div
              className="card base-card std-card mb-3 mb-xl-5 col-sm-6 col-xl-4"
              key={std.id}
            >
              <StudentCrudCard onDelete={getStudents} student={std} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
