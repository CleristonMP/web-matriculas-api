import GoBackButton from "components/GoBackButton";

import "./styles.css";

const Recover = () => {
  return (
    <div className="card base-card p-5 my-5 mx-auto rcvr-card">
      <div className="card-body">
        <h2 className="card-title h1 mb-4">Recuperação de senha</h2>
        <p className="card-text fs-5">
          Para recuperar sua senha, entre em contato com um dos administradores
          do sistema.
        </p>
      <GoBackButton />
      </div>
    </div>
  );
};

export default Recover;
