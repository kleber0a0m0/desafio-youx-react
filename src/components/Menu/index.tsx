import "./styles.css";
import { ImCross } from "react-icons/im";
import logo from "../../assets/img/logo-youx.png";
import CardUsuario from "../UserCard";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="navbar background">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            data-bs-toggle="offcanvas"
            href="#offcanvas"
            role="button"
            aria-controls="offcanvas"
          >
            <img
              src={logo}
              alt="Logo"
              className="imgLogo d-inline-block align-text-top"
            />
          </a>

          <div className="d-flex justify-content-end">
            <CardUsuario />
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start "
        id="offcanvas"
        aria-labelledby="offcanvasLabel"
      >
        <div className="offcanvas-header background">
          <h5 className="offcanvas-title" id="offcanvasLabel"></h5>
          <div>
            <ImCross
              type="button"
              className="text-reset exitIcon "
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
        </div>
        <div className="offcanvas-body background">
          <div>
            <h3 className="ms-5 mb-4">GESTÃO DE CLIENTES</h3>
            <div data-bs-dismiss="offcanvas">
              <Link to="/" className="ms-5 navLink">
                Lista de clientes
              </Link>
            </div>

            <h3 className="ms-5 mt-5 mb-4">GESTÃO DE VENDAS</h3>
            <div data-bs-dismiss="offcanvas">
              <Link to="/sales" className="ms-5 navLink">
                Lista de vendas
              </Link>
            </div>

            <h3 className="ms-5 mt-5 mb-4">Relatórios</h3>
            <div data-bs-dismiss="offcanvas">
              <Link to="/reports" className="ms-5 navLink">
                Relatórios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default NavBar;
