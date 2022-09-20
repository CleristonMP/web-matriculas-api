import AboutImg from "assets/images/about-img.jpg";
import AboutImg2 from "assets/images/about-img-2.jpg";

import "./styles.css";

const About = () => {
  return (
    <section id="about-section">
      <header>
        <div className="container-fluid bg-primary">
          <div className="d-flex flex-column align-items-center justify-content-center min-h-400">
            <h3 className="display-3 font-weight-bold text-white">Sobre nós</h3>
            <div className="d-inline-flex text-white">
              <p>
                <a className="text-white" href="link">
                  Home
                </a>
              </p>
              <p className="px-2">/</p>
              <p>Sobre nós</p>
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
                alt=""
              />
            </div>
            <div className="col-lg-7">
              <p className="section-title pr-5">
                <span className="pr-2">Learn About Us</span>
              </p>
              <h1 className="mb-4">Best School For Your Kids</h1>
              <p>
                Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo
                dolor lorem ipsum ut sed eos, ipsum et dolor kasd sit ea justo.
                Erat justo sed sed diam. Ea et erat ut sed diam sea ipsum est
                dolor
              </p>
              <div className="row pt-2 pb-4">
                <div className="col-6 col-md-4">
                  <img
                    className="img-fluid rounded"
                    src={AboutImg2}
                    alt=""
                  />
                </div>
                <div className="col-6 col-md-8">
                  <ul className="list-inline m-0">
                    <li className="py-2 border-top border-bottom">
                      Labore eos amet dolor amet diam
                    </li>
                    <li className="py-2 border-bottom">
                      Etsea et sit dolor amet ipsum
                    </li>
                    <li className="py-2 border-bottom">
                      Diam dolor diam elitripsum vero.
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
