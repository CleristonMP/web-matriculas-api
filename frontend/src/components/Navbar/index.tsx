import 'bootstrap/js/src/collapse.js';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
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
              <NavLink to="/" className="nav-item nav-link active">
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
          </ul>
          <NavLink to="admin/auth" className="btn btn-primary px-4">
            Login
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
