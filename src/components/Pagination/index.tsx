import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { array } from "yup";

const MAX_ITEMS = 5;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination = ({ size, totalElements, offset, setOffset }: any) => {
  const current = offset ? offset / size + 1 : 1;
  const pages = Math.ceil(totalElements / size);
  const first = Math.max(current - MAX_LEFT, 1);
  function onPageChange(page: any) {
    setOffset((page - 1) * size);
  }
  return (
    <>
      <p className="currentPage">
        Exibindo de {offset + 0} a{" "}
        {offset + size > totalElements ? totalElements : offset + size} de{" "}
        {totalElements + 0} registros
      </p>
      <nav aria-label="navigation" className="navigation">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <button
              onClick={() => onPageChange(1)}
              disabled={current === 1}
              className={current === 1 ? "page-link disabled" : "page-link"}
            >
              <AiOutlineDoubleLeft />
            </button>
          </li>
          <li className="page-item">
            <button
              onClick={() => onPageChange(current - 1)}
              disabled={current === 1}
              className={current === 1 ? "page-link disabled" : "page-link"}
            >
              <AiOutlineLeft />
            </button>
          </li>
          {Array.from({ length: Math.min(MAX_ITEMS, pages) })
            .map((_, index) => index + first)
            .map((page) => (
              <li key={page} className="page-item">
                <button
                  onClick={() => onPageChange(page)}
                  className={
                    page === current || current >= pages
                      ? "pagination__item--active page-link disabled"
                      : "page-link"
                  }
                  disabled={page === current || current >= pages}
                >
                  {page}
                </button>
              </li>
            ))}
          <li className="page-item">
            <button
              onClick={() => onPageChange(current + 1)}
              disabled={current >= pages}
              className={current >= pages ? "page-link disabled" : "page-link"}
            >
              <AiOutlineRight />
            </button>
          </li>
          <li className="page-item">
            <button
              onClick={() => onPageChange(pages)}
              disabled={current >= pages}
              className={current >= pages ? "page-link disabled" : "page-link"}
            >
              <AiOutlineDoubleRight />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Pagination;
