import "./styles.css";

const Table = () => {
  return (
    <div className="mb-4 p-2 p-sm-3">
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
            <th scope="col" className="text-break">
              Data de nascimento
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td className="d-none d-sm-table-cell">123.456.789-00</td>
            <td>20/09/2012</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td className="d-none d-sm-table-cell">987.654.321-11</td>
            <td>12/10/2012</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>James</td>
            <td className="d-none d-sm-table-cell">456.789.123-22</td>
            <td>10/09/2012</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
