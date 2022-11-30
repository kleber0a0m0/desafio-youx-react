import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import person from "../../assets/img/person.png";
import { ImExit } from "react-icons/im";

function CardUsuario() {
  return (
    <>
      <div className="container">
        <table>
          <tbody>
            <tr>
              <td>
                <img
                  className="profilePhoto"
                  src={person}
                  alt="Foto de perfil"
                />
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <p className="name">Kléber Moreira</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="office">Administrador</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <a href="#sair">
                  <ImExit className="iconExit" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default CardUsuario;
