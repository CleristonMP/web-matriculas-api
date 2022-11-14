import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Welcome from "./Welcome";

const Admin = () => {
  const location = useLocation();
  const [pathAdmin, setPathAdmin] = useState(true);
  
  useEffect(() => {
    setPathAdmin(true);
    if (location.pathname !== "/admin") {
      setPathAdmin(false);
    }
  }, [location]);

  return (
    <div className="d-flex flex-column flex-lg-row">
      <Navbar />
      <div className="col-lg-10">
        {pathAdmin ? <Welcome /> : <Outlet />}
      </div>
    </div>
  );
};

export default Admin;
