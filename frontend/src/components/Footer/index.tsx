import { ReactComponent as EmailIcon } from "assets/images/email-icon.svg";
import { ReactComponent as WhatsAppIcon } from "assets/images/whatsapp.svg";
import { ReactComponent as InstagramIcon } from "assets/images/instagram.svg";
import { ReactComponent as FacebookIcon } from "assets/images/facebook.svg";

import "./styles.css";

const Footer = () => {
  return (
    <footer className="container-fluid bg-secondary text-white py-5 px-sm-3 px-md-5">
      <div className="row mt-2">
        <div className="col-lg-4 col-md-6 mb-5">
          <a href="/" className="navbar-brand fw-bold text-primary mb-4">
            <span className="text-primary h3">WebMatrículas</span>
          </a>
          <p>
            Sistema desenvolvido nas linguagens Java e JavaScript para facilitar
            e automatizar o processo de matículas escolares e apresentar as
            turmas com layout simples e fácil de usar.
          </p>
        </div>
        <address className="col-lg-4 col-md-6 mb-5 d-flex flex-column">
          <h3 className="text-primary mb-4">Contatos do Desenvolvedor</h3>
          <div className="d-flex">
            <div className="footer-svg-ctr me-4">
              <a href="mailto:cmelopereira@outlook.com?subject=Quero entrevistá-lo&body=Gostei do seu trabalho, vamos conversar&#63;">
                <EmailIcon width={25} />
              </a>
            </div>
            <div className="footer-svg-ctr me-4">
              <a href="tel:+5598981999361">
                <WhatsAppIcon width={25} />
              </a>
            </div>
            <div className="footer-svg-ctr me-4">
              <a
                href="https://www.instagram.com/c.m.peras/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon width={25} />
              </a>
            </div>
            <div className="footer-svg-ctr">
              <a
                href="https://www.facebook.com/profile.php?id=100072653596522"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon width={25} />
              </a>
            </div>
          </div>
        </address>
        <div className="col-lg-4 col-md-6 mb-5">
          <h3 className="text-primary mb-4">Links</h3>
          <div className="d-flex flex-column justify-content-start">
            <a href="/" className="text-white mb-2 nav-link">
              Home
            </a>
            <a href="/about" className="text-white mb-2 nav-link">
              Sobre
            </a>
            {/*
              <a className="text-white mb-2 nav-link disabled" href="link">
              Professores
            </a>
            <a className="text-white mb-2 nav-link disabled" href="link">
              Contato
            </a>
            */}
            <a href="/admin" className="text-white nav-link">
              Login
            </a>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-5">
        <p className="text-center text-white m-0">
          &copy;
          <a href="/" className="text-primary font-weight-bold">
            WebMatrículas
          </a>
          . All Rights Reserved.
        </p>
        <p className="m-0 text-center">
          Developed by&nbsp;
          <a
            className="text-primary font-weight-bold"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/profile.php?id=100072653596522"
          >
            Cleriston Pereira
          </a>
        </p>
        <p className="m-0 text-center">
          Designed by&nbsp;
          <a
            className="text-primary font-weight-bold"
            href="https://htmlcodex.com"
          >
            HTML Codex
          </a>
        </p>
        <p className="m-0 text-center">
        Distributed By:&nbsp;
        <a href="https://themewagon.com" rel="noreferrer" target="_blank">
          ThemeWagon
        </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
