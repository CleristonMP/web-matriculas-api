import StudentCrudCard from "../StudentCrudCard";
import { mockStudentsListData } from "./mockStudentsListData";
import "./styles.css";

const StudentsList = () => {
  const mockData = mockStudentsListData;

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
          {mockData.map((std) => (
            <div className="card base-card std-card mb-3 mb-xl-5 col-sm-6 col-xl-4" key={std.id}>
              <StudentCrudCard student={std} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
