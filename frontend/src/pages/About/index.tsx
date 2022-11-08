import AboutImg from "assets/images/about-img.jpg";
import AboutImg2 from "assets/images/about-img-2.jpg";

import "./styles.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section id="about-section">
      <header>
        <div className="container-fluid bg-primary">
          <div className="d-flex flex-column align-items-center justify-content-center min-h-400">
            <h3 className="display-3 font-weight-bold text-white">
              Sobre o sistema
            </h3>
            <div className="d-inline-flex text-white">
              <p>
                <Link to="/" className="text-white">
                  Home
                </Link>
              </p>
              <p className="px-2">/</p>
              <p>Sobre</p>
            </div>
          </div>
        </div>
      </header>
      <article className="container-fluid py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <img
                className="img-fluid rounded mb-5 mb-lg-0"
                src={AboutImg}
                alt="Pilha de livros"
              />
            </div>
            <div className="col-lg-7">
              <p className="section-title pr-5">
                <span className="pr-2">Saiba mais sobre o sistema</span>
              </p>
              <h1 className="mb-4">Sistema WebMatrículas</h1>
              <p>
                Sistema desenvolvido utilizando a linguagem Java no backend, com
                Spring Boot, e banco de dados PostgreSQL. Conta com autenticação
                e autorização de usuário &#40;OAuth2&#41;, além de validação dos
                campos com Bean Validation. Também, utilizando Postman para
                testar as requisições.
              </p>
              <p>
                O frontend foi desenvolvido utilizando a linguagem TypeScript
                &#47; JavaScript, com React. Requisições feitas com Axios e
                formulários com React Hook Form, além de outras tecnologias
                &#40;Bootstrap, React Router Dom, React Paginate, React Select,
                React To Print, React Toastify, Semantic-ui-css etc&#41;.
              </p>
              <div className="row pt-2 pb-4">
                <div className="col-6 col-md-4">
                  <img
                    className="img-fluid rounded"
                    src={AboutImg2}
                    alt="Crianças estudando"
                  />
                </div>
                <div className="col-6 col-md-8">
                  <ul className="list-inline m-0">
                    <li className="py-2 border-top border-bottom">
                      Java 11 / Springboot 2.4
                    </li>
                    <li className="py-2 border-bottom">
                      TypeScript &#47; JavaScript, React 18
                    </li>
                    <li className="py-2 border-bottom">
                      PostgreSQL
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default About;
