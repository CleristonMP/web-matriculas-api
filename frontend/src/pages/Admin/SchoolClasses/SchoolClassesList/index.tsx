import { Link } from "react-router-dom";
import SchoolClassesCrudCard from "../SchoolClassesCrudCard";

import "./styles.css";

const SchoolClassesList = () => {
  const mockData = [
    {
      id: 1,
      name: "101 EHC",
      period: "Vespertino",
      students: [],
    },
    {
      id: 2,
      name: "202 ABC",
      period: "Vespertino",
      students: [],
    },
    {
      id: 3,
      name: "303 JPG",
      period: "Matutino",
      students: [],
    },
    {
      id: 4,
      name: "404 TBT",
      period: "Noturno",
      students: [],
    },
  ];

  return (
    <div className="container mb-2 py-lg-3">
      <div className="container mb-3 text-center text-lg-start px-xl-5">
        <a href="link">
          <button className="btn btn-primary text-white h-50px btn-crud-add">
            ADICIONAR
          </button>
        </a>
      </div>
      <div className="container">
        <div className="row justify-content-sm-between px-xl-5">
          {mockData.map((sc) => (
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
