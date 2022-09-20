import SchoolClassesCrudCard from "../SchoolClassesCrudCard";

import "./styles.css";

const List = () => {
  return (
    <div className="container mb-2 py-lg-3">
      <div className="container mb-3 text-center text-md-start px-xl-5">
        <a href="link">
          <button className="btn btn-primary text-white h-50px btn-crud-add">
            ADICIONAR
          </button>
        </a>
      </div>
      <div className="container">
        <div className="row px-xl-5">
          <SchoolClassesCrudCard name="6A" period="matutino" />
          <SchoolClassesCrudCard name="7A" period="matutino" />
          <SchoolClassesCrudCard name="8A" period="matutino" />
          <SchoolClassesCrudCard name="6B" period="vespertino" />
          <SchoolClassesCrudCard name="7B" period="vespertino" />
          <SchoolClassesCrudCard name="8B" period="vespertino" />
          <SchoolClassesCrudCard name="6C" period="noturno" />
          <SchoolClassesCrudCard name="7C" period="noturno" />
          <SchoolClassesCrudCard name="8C" period="noturno" />
        </div>
      </div>
    </div>
  );
};

export default List;
