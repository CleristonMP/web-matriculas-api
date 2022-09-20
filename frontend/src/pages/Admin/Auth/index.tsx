import Login from "./Login";

const Auth = () => {
  return (
    <section id="auth-section" className="container d-flex align-items-center">
      <div className="d-none d-lg-block col-lg-6">
        <h1>Hora de matricular</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          distinctio voluptas rerum assumenda nihil molestias officia voluptatem
          odio placeat rem autem dolorum quae sequi, aut voluptates cupiditate.
          Doloribus, fugiat esse?
        </p>
      </div>
      <div className="col-lg-6">
        <Login />
      </div>
    </section>
  );
};

export default Auth;
