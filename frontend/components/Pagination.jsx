export default function Pagination({ todoList, page, setPage }) {
  const pages = Math.ceil(todoList.length / 15);

  const isValidPage = (page) => {
    if (page < 1) return false;
    if (page > pages) return false;
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
