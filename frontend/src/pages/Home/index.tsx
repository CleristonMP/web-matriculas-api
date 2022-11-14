import HomeImg from "assets/images/home-img.png";

const Home = () => {
  return (
    <section id="welcome-section" className="container-fluid bg-primary px-0 px-md-5">
      <div className="row align-items-center px-3">
        <div className="col-lg-6 text-center text-lg-left">
          <h4 className="text-white mb-4 mt-5 mt-lg-0">Escola Padrão</h4>
          <h1 className="display-3 fw-bold text-white">
            Novo sistema de matrículas
          </h1>
          <p className="text-white mb-4">
            Sistema desenvolvido com o objetivo de facilitar e automatizar o
            processo de matrículas escolares.
          </p>
          <a href="link" className="btn btn-secondary mt-1 py-3 px-5">
            Saiba Mais
          </a>
        </div>
        <div className="col-lg-6 text-center text-lg-right mb-5">
          <img className="img-fluid mt-5" src={HomeImg} alt="Criança lendo um livro em uma biblioteca" />
        </div>
      </div>
    </section>
  );
};

export default Home;
