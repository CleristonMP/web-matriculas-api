import { SchoolClass } from "types/schoolClass";
import { mockTableData } from "./mockTableData";
import "./styles.css";

const Table = () => {
  const mockData: SchoolClass = mockTableData;

  return (
    <div className="mb-4 p-2 p-sm-3">
      <h2>{`Turma: ${mockData.name} - ${mockData.period}`}</h2>
      <table className="table table-striped table-font">
        <thead>
          <tr>
            <th scope="col">Mat.</th>
            <th scope="col">Nome</th>
            <th scope="col" className="text-break">
              Sobrenome
            </th>
            <th scope="col" className="d-none d-sm-table-cell">
              CPF
            </th>
            <th scope="col" className="text-break d-none d-md-table-cell">
              Data de nascimento
            </th>
          </tr>
        </thead>
        <tbody>
          {mockData.students.map((std) => (
            <tr key={std.id}>
              <th scope="row">{std.enrollment}</th>
              <td>{std.name}</td>
              <td>{std.lastName}</td>
              <td className="d-none d-sm-table-cell">{std.cpf}</td>
              <td className="d-none d-md-table-cell">{std.birthDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
