// FILE: src/components/Footer.jsx

import { Container } from "react-bootstrap";

export default function Footer() {
    return (
        // Footer section displayed at the bottom of all pages
        <footer className="bg-dark text-light py-3 w-100">
            {/* Bootstrap container for centered text and spacing */}
            <Container fluid className="text-center">
                {/* Copyright text */}
                <p className="mb-0">© 2025 Movie Explorer By Akl_Sal</p>
            </Container>
        </footer>
    );
}
