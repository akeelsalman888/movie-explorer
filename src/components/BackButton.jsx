// FILE: src/components/BackButton.jsx
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <Button variant="primary" onClick={() => navigate(-1)}>
            ← Back
        </Button>
    );
}
