
import { Link } from "react-router-dom";
import StudentCrudCard from "../StudentCrudCard";
import "./styles.css";

const StudentsList = () => {
  return (
    <div className="container mb-2 mb-xl-0 py-lg-3 pb-xl-0">
      <div className="container mb-3 text-center px-xl-5 text-lg-start">
        <a href="link">
          <button className="btn btn-primary text-white h-50px btn-crud-add">
            ADICIONAR
          </button>
        </a>
      </div>
      <div className="container">
        <div className="row justify-content-between px-xl-5">
          <Link to="1">
            <StudentCrudCard name="João" lastName="Silva" cpf="123.456.789-00" birthDate="10/09/2012" />
          </Link>
          <StudentCrudCard name="Maria" lastName="Nogueira" cpf="987.654.321-11" birthDate="12/10/2012" />
          <StudentCrudCard name="José" lastName="Pereira" cpf="456.789.123-22" birthDate="01/03/2012" />
          <StudentCrudCard name="Marcos" lastName="Oliveira" cpf="789.123.456-33" birthDate="23/07/2012" />
          <StudentCrudCard name="Pablo" lastName="Ferreira" cpf="654.321.987-44" birthDate="07/11/2012" />
          <StudentCrudCard name="Mayana" lastName="Fonseca" cpf="321.987.654-55" birthDate="30/07/2012" />
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
