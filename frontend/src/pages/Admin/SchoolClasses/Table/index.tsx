import { useParams } from "react-router-dom";
import { SchoolClass } from "types/schoolClass";
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";
import { formatCpf, formatDate } from "util/formatters";

import "./styles.css";
import { Link } from "react-router-dom";

type UrlParams = {
  schoolClassId: string;
};

const Table = () => {
  const { schoolClassId } = useParams<UrlParams>();
  const [schoolClass, setSchoolClass] = useState<SchoolClass>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/school-classes/${schoolClassId}`,
      withCredentials: true
    }

    requestBackend(params).then(response => {
      setSchoolClass(response.data)
    })
  }, [schoolClassId]);
  
  return (
    <div className="mb-4 p-2 p-sm-3">
      <h2>{`Turma: ${schoolClass?.name} - ${schoolClass?.period}`}</h2>
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
          {schoolClass?.students.map((std) => (
            <tr key={std.id}>
              <th scope="row">{std.enrollment}</th>
              <td> <Link to={`/admin/students/${std.id}`}> {std.name} </Link></td>
              <td>{std.lastName}</td>
              <td className="d-none d-sm-table-cell">{formatCpf(std.cpf)}</td>
              <td className="d-none d-md-table-cell">{formatDate(std.birthDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
