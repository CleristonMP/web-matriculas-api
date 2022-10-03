import { ReactComponent as AuthImage } from "../../../assets/images/auth-image.svg";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <section id="auth-section" className="container d-flex align-items-center">
      <div className="d-none d-lg-block col-lg-6 container py-5">
        <h1 className="m-0">Hora de matricular</h1>
        <div>
          <AuthImage />
        </div>
      </div>
      <div className="col-lg-6">
        <Outlet />
      </div>
    </section>
  );
};

export default Auth;
