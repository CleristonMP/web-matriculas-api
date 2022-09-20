import { ReactComponent as AddressMarkerIcon } from "assets/images/address-marker.svg";
import { ReactComponent as EmailIcon } from "assets/images/email-icon.svg";
import { ReactComponent as PhoneIcon } from "assets/images/phone-icon.svg";

import "./styles.css";

const Footer = () => {
  return (
    <footer className="container-fluid bg-secondary text-white py-5 px-sm-3 px-md-5">
      <div className="row pt-5">
        <div className="col-lg-4 col-md-6 mb-5">
          <a href="link" className="navbar-brand fw-bold text-primary mb-4">
            <span className="text-white">WebMatrículas</span>
          </a>
          <p>
            Labore dolor amet ipsum ea, erat sit ipsum duo eos. Volup amet ea
            dolor et magna dolor, elitr rebum duo est sed diam elitr. Stet elitr
            stet diam duo eos rebum ipsum diam ipsum elitr.
          </p>
        </div>
        <address className="col-lg-4 col-md-6 mb-5">
          <h3 className="text-primary mb-4">Get In Touch</h3>
          <div className="d-flex">
            <div className="footer-svg-ctr">
              <AddressMarkerIcon width={20} />
            </div>
            <div className="ps-3">
              <h5 className="text-white">Address</h5>
              <p>123 Street, New York, USA</p>
            </div>
          </div>
          <div className="d-flex">
            <div className="footer-svg-ctr">
              <EmailIcon width={25} />
            </div>

            <div className="ps-3">
              <h5 className="text-white">Email</h5>
              <p>info@example.com</p>
            </div>
          </div>
          <div className="d-flex">
            <div className="footer-svg-ctr">
              <PhoneIcon width={20} />
            </div>
            <div className="ps-3">
              <h5 className="text-white">Phone</h5>
              <p>+012 345 67890</p>
            </div>
          </div>
        </address>
        <div className="col-lg-4 col-md-6 mb-5">
          <h3 className="text-primary mb-4">Links</h3>
          <div className="d-flex flex-column justify-content-start">
            <a className="text-white mb-2 nav-link" href="link">
              Home
            </a>
            <a className="text-white mb-2 nav-link" href="link">
              Sobre
            </a>
            <a className="text-white mb-2 nav-link disabled" href="link">
              Professores
            </a>
            <a className="text-white nav-link disabled" href="link">
              Contato
            </a>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-5">
        <p className="text-center text-white">
          &copy;
          <a className="text-primary font-weight-bold" href="link">
            WebMatrículas
          </a>
          . All Rights Reserved. Designed by&nbsp;
          <a
            className="text-primary font-weight-bold"
            href="https://htmlcodex.com"
          >
            HTML Codex
          </a>
          <br />
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
