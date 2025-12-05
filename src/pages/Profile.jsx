// FILE: src/pages/Profile.jsx
import { Container, Card, Row, Col, ListGroup } from "react-bootstrap";

export default function Profile() {
    return (
        <div className="profile-page">
            {/* Overlay for darkened background */}
            <div className="overlay"></div>

            {/* Main profile container */}
            <Container className="profile-container p-5 rounded shadow-lg bg-dark text-light">
                {/* Page heading */}
                <h1 className="text-center mb-4 fw-bold text-light">👤 My Profile</h1>

                {/* User Info Card */}
                <Card className="bg-dark text-light shadow-lg border-0 mb-4">
                    <Row className="g-0">
                        {/* Avatar Section */}
                        <Col md={4} className="d-flex align-items-center justify-content-center p-4">
                            <img
                                src="https://i.pravatar.cc/150?img=8"
                                alt="Profile Avatar"
                                className="rounded-circle shadow-lg"
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                        </Col>

                        {/* User Information Section */}
                        <Col md={8}>
                            <Card.Body className="p-4">
                                {/* Name and bio */}
                                <h3 className="fw-bold text-warning">Akeel Salman</h3>
                                <p className="fst-italic text-light">
                                    Movie enthusiast exploring new films every week.
                                </p>

                                {/* Basic Info List */}
                                <ListGroup variant="flush" className="mb-3">
                                    <ListGroup.Item className="bg-dark text-light border-0">
                                        📧 <strong className="text-warning">Email:</strong> akl_sal@gmail.com
                                    </ListGroup.Item>
                                    <ListGroup.Item className="bg-dark text-light border-0">
                                        🎥 <strong className="text-warning">Favorite Genre:</strong> Action & Sci‑Fi
                                    </ListGroup.Item>
                                    <ListGroup.Item className="bg-dark text-light border-0">
                                        ⭐ <strong className="text-warning">Member Since:</strong> 2021
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>

                {/* Favorites Movies Card */}
                <Card className="bg-dark text-light shadow-lg border-0 mb-3 p-3">
                    <strong className="text-warning mb-2 d-block">Favorites:</strong>
                    <ul className="mb-0 ps-3">
                        <li>Inception</li>
                        <li>The Dark Knight</li>
                        <li>Interstellar</li>
                    </ul>
                </Card>

                {/* Favorite Actors Card */}
                <Card className="bg-dark text-light shadow-lg border-0 mb-3 p-3">
                    <strong className="text-warning mb-2 d-block">Favorite Actors:</strong>
                    <ul className="mb-0 ps-3">
                        <li>Leonardo DiCaprio</li>
                        <li>Scarlett Johansson</li>
                        <li>Denzel Washington</li>
                    </ul>
                </Card>

                {/* Activity Stats Card */}
                <Card className="bg-dark text-light shadow-lg border-0 mb-3 p-3">
                    <strong className="text-warning mb-2 d-block">Activity Stats:</strong>
                    <ul className="mb-0 ps-3">
                        <li>⭐ Movies Rated: 32</li>
                        <li>❤️ Favorites Added: 15</li>
                        <li>🎬 Watchlist Items: 8</li>
                    </ul>
                </Card>
            </Container>
        </div>
    );
}
