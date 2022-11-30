import {
  AiFillGithub,
  AiFillYoutube,
  AiFillLinkedin,
  AiOutlineGlobal,
} from "react-icons/ai";
function Footer(search: any) {
  return (
    <>
      <div className="container-fluid">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a
              href="/"
              className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
            ></a>
            <span className="text-muted">👨‍💻 2022 - Kléber</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://kleberalbinomoreira.com.br/"
                target="_blank"
              >
                <AiOutlineGlobal className="icon" />
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://github.com/kleber0a0m/"
                target="_blank"
              >
                <AiFillGithub className="icon" />
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://www.linkedin.com/in/kleber-albino-moreira/"
                target="_blank"
              >
                <AiFillLinkedin className="icon" />
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://www.youtube.com/channel/UCSufaUwwWC9yI7G_z48K8iA"
                target="_blank"
              >
                <AiFillYoutube className="icon" />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
export default Footer;
