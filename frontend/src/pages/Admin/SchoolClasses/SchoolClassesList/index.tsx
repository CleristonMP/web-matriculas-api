import { Link } from "react-router-dom";
import SchoolClassesCrudCard from "../SchoolClassesCrudCard";

import "./styles.css";

const SchoolClassesList = () => {
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
          <Link to="1">
            <SchoolClassesCrudCard name="101 ECH" period="matutino" />
          </Link>
          <SchoolClassesCrudCard name="102 HCD" period="matutino" />
          <SchoolClassesCrudCard name="103 HPD" period="matutino" />
          <SchoolClassesCrudCard name="201 ECH" period="vespertino" />
          <SchoolClassesCrudCard name="202 HCD" period="vespertino" />
          <SchoolClassesCrudCard name="203 HPD" period="vespertino" />
          <SchoolClassesCrudCard name="301 ECH" period="noturno" />
          <SchoolClassesCrudCard name="302 HCD" period="noturno" />
          <SchoolClassesCrudCard name="303 HPD" period="noturno" />
        </div>
      </div>
    </div>
  );
};

export default SchoolClassesList;
