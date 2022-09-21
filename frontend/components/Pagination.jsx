import { useEffect, useState } from "react";
import { get } from "../lib/fetch";

export default function Pagination({ setTodoList }) {
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    get("http://localhost:3000/tasks_total").then((data) =>
      setPages(data.pages)
    );
  }, []);

  useEffect(() => {
    get("http://localhost:3000/tasks/" + page).then((data) =>
      setTodoList(data.tasks)
    );
  }, [page]);

  const isValidPage = (newPage) => {
    if (newPage < 1) return false;
    if (newPage > pages) return false;
    return true;
  };

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <ul className="pagination-list">
        <li>
          <a className="pagination-link" onClick={() => setPage(1)}>
            first
          </a>
        </li>

        {isValidPage(page - 2) && (
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
        )}

        {isValidPage(page - 1) && (
          <li>
            <a className="pagination-link" onClick={() => setPage(page - 1)}>
              {page - 1}
            </a>
          </li>
        )}

        <li>
          <a className="pagination-link is-current">{page}</a>
        </li>

        {isValidPage(page + 1) && (
          <li>
            <a className="pagination-link" onClick={() => setPage(page + 1)}>
              {page + 1}
            </a>
          </li>
        )}

        {isValidPage(page + 2) && (
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
        )}

        <li>
          <a className="pagination-link" onClick={() => setPage(pages)}>
            last
          </a>
        </li>
      </ul>
    </nav>
  );
}
