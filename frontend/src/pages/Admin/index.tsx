import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Admin = () => {
  return (
    <div className="d-flex flex-column flex-lg-row">
      <Navbar />
      <div className="col-lg-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
