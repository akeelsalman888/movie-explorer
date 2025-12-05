// FILE: src/components/Pagination.jsx

import { Button } from "react-bootstrap";

export default function Pagination({ page, setPage }) {
  return (
    // Pagination controls centered below movie lists
    <div className="d-flex justify-content-center mt-3">
      {/* Previous page button, disabled on first page */}
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </Button>

      {/* Display current page number */}
      <span className="mx-3">Page {page}</span>

      {/* Next page button */}
      <Button onClick={() => setPage(page + 1)}>Next</Button>
    </div>
  );
}
