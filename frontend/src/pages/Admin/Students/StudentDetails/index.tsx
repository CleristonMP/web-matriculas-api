import { Student } from "types/student";

const StudentDetails = () => {
  const student: Student = {
    id: 1,
    enrollment: 9271,
    name: "Rose",
    lastName: "Spence",
    cpf: "68561068993",
    birthDate: "2010-06-19T03:00:00Z",
    addressId: 66,
    schoolClassId: 4,
    parentId: 15,
  };

  return (
    <div className="container mt-3 mb-5 py-lg-3">
      <div className="card base-card">
        <div className="card-body">
          <h5 className="card-title">
            {student.name + " " + student.lastName}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {student.enrollment}
          </h6>
          <p className="card-text">{student.birthDate}</p>
          <a href="link" className="card-link">
            Card link
          </a>
          <a href="link" className="card-link">
            Another link
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
