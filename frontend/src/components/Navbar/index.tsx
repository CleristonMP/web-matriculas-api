import "bootstrap/js/src/collapse.js";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "contexts/AuthContext";
import { isAuthenticated } from "util/auth";
import { getTokenData } from "util/token";
import { removeAuthData } from "util/storage";
import { history } from "util/history";

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace("/auth/login");
  };

  return (
    <header className="container-fluid bg-light position-relative shadow">
      <nav className="navbar navbar-expand-md bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5">
        <NavLink to="/" className="navbar-brand fw-bold text-secondary">
          <span className="text-primary">WebMatrículas</span>
        </NavLink>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-expanded="false"
          aria-controls="navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarCollapse"
        >
          <ul className="navbar-nav font-weight-bold mx-auto py-0">
            <li>
              <NavLink end to="/" className="nav-item nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-item nav-link">
                Sobre
              </NavLink>
            </li>
            <li>
              <a href="link" className="nav-item nav-link disabled">
                Professores
              </a>
            </li>
            <li>
              <a href="link" className="nav-item nav-link disabled">
                Galeria
              </a>
            </li>
            <li>
              <a href="link" className="nav-item nav-link disabled">
                Contato
              </a>
            </li>
            {isAuthenticated() ? (
              <NavLink to="admin/welcome" className="nav-item nav-link">
                Admin
              </NavLink>
            ) : (
              <></>
            )}
          </ul>
          {authContextData.authenticated ? (
            <>
              <span className="d-none d-lg-inline me-lg-2">
                {authContextData.tokenData?.user_name}
              </span>
              <NavLink
                to="#logout"
                className="btn btn-primary px-4"
                onClick={handleLogoutClick}
              >
                LOGOUT
              </NavLink>
            </>
          ) : (
            <NavLink to="auth/login" className="btn btn-primary px-4">
              LOGIN
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
