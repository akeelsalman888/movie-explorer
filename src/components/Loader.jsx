// FILE: src/components/Loader.jsx

import { Spinner } from "react-bootstrap";

export default function Loader() {
    return (
        // Centered loading indicator shown while data is being fetched
        <div className="text-center my-4">
            {/* Bootstrap spinner animation */}
            <Spinner animation="border" role="status" />

            {/* Simple loading text */}
            <span className="ms-2">Loading...</span>
        </div>
    );
}
