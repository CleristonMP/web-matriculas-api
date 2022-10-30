import { ReactComponent as GoBack } from "assets/images/go-back.svg";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleBack = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div className="goback-btn-ctr">
      <button className="btn btn-primary p-0" onClick={(event) => handleBack(event)}>
        <span className="tooltip-text">Voltar</span>
        <GoBack />
      </button>
    </div>
  );
};

export default GoBackButton;
