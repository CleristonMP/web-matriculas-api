import "./styles.css";

const Navbar = () => {
  return (
    <nav className="d-flex p-md-3 px-lg-2 col-lg-2">
      <ul className="navbar-nav admin-navbar list-group">
        <li className="nav-item text-center admin-nav-item">
          <a className="nav-link list-group-item list-group-item-action" aria-current="page" href="link">
            Turmas
          </a>
        </li>
        <li className="nav-item text-center admin-nav-item">
          <a className="nav-link list-group-item list-group-item-action" href="link">
            Alunos
          </a>
        </li>
        <li className="nav-item text-center admin-nav-item">
          <a className="nav-link list-group-item list-group-item-action" href="link">
            Usuários
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
