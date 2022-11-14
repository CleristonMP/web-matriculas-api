import { ReactComponent as WelcomeImg } from "assets/images/welcome-image.svg";

const Welcome = () => {
  return (
    <div className="container mt-3 py-lg-3 d-flex justify-content-between">
        <div className="w-50 d-flex justify-content-center flex-column ps-5">
            <h1>Seja bem-vindo&#40;a&#41;!</h1>
            <p>Comece os registros pelas turmas.</p>
        </div>
        <div className="w-50">
            <WelcomeImg />
        </div>
    </div>
  )
}

export default Welcome;
