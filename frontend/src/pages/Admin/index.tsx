import Navbar from "./Navbar";
import List from "./Students/List";

const Admin = () => {
  return (
      <div className="d-flex flex-column flex-lg-row">
        <Navbar />
        <div className="col-lg-10">
          <List />
        </div>
      </div>
  );
};

export default Admin;
