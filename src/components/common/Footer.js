import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  return (
    <div className="main-footer bg-dark text-light py-3">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>Informacion de contacto</h4>
            <ul className="list-unstyled">
              <li>
                <i class="bi bi-whatsapp"></i> (0381)-152661535
              </li>
              <a
                target="_blank"
                className="text-decoration-none text-light"
                href="https://goo.gl/maps/KoHzMiLqZQFKvdkX7"
              >
                <i class="bi bi-pin-map"></i> Gral. Paz 576
              </a>
              <li>
                <i class="bi bi-globe2"></i> Tucumán, Argentina
              </li>
            </ul>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Links utiles</h4>
            <ui className="list-unstyled">
              <li>
                <Link
                  to="/error404"
                  className="text-light text-decoration-none"
                >
                  Politicas de privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/error404"
                  className="text-light text-decoration-none"
                >
                  Terminos y Condiciones
                </Link>
              </li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Seguinos en nuestras redes</h4>
            <ui className="list-unstyled">
              <li>
                <Link
                  to="/error404"
                  className="text-light text-decoration-none"
                >
                  <i class="bi bi-facebook"> Facebook</i>
                </Link>
              </li>
              <li>
                <Link
                  to="/error404"
                  className="text-light text-decoration-none"
                >
                  <i class="bi bi-instagram"> Instagram</i>
                </Link>
              </li>
              <li>
                <Link
                  to="/error404"
                  className="text-light text-decoration-none"
                >
                  <i class="bi bi-twitter"> Twitter</i>
                </Link>
              </li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row text-center">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} RollingNews | Todos los derechos
            reservados |
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
