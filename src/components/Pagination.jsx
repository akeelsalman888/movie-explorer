import { Button } from "react-bootstrap";

export default function Pagination({ page, setPage }) {
  return (
    <div className="d-flex justify-content-center mt-3">
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</Button>
      <span className="mx-3">Page {page}</span>
      <Button onClick={() => setPage(page + 1)}>Next</Button>
    </div>
  );
}
