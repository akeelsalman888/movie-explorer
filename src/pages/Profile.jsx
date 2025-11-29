import { Container, Card, Row, Col, Button, ListGroup, Badge } from "react-bootstrap";

export default function Profile() {
    return (
        <div className="profile-page">
            <div className="overlay"></div>

            <Container className="profile-container p-5 rounded shadow-lg bg-dark text-light">
                <h1 className="text-center mb-4 fw-bold text-light">👤 My Profile</h1>

                <Card className="bg-dark text-light shadow-lg border-0">
                    <Row className="g-0">
                        {/* Avatar */}
                        <Col md={4} className="d-flex align-items-center justify-content-center p-4">
                            <img
                                src="https://i.pravatar.cc/150?img=8"
                                alt="Profile Avatar"
                                className="rounded-circle shadow-lg"
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                        </Col>

                        {/* Info */}
                        <Col md={8}>
                            <Card.Body className="p-4">
                                <h3 className="fw-bold text-warning">Akl_Sal</h3>
                                <p className="fst-italic text-muted">
                                    Movie enthusiast exploring new films every week.
                                </p>

                                <ListGroup variant="flush" className="mb-3">
                                    <ListGroup.Item className="bg-dark text-light border-0">
                                        📧 <strong>Email:</strong> akl_sal@example.com
                                    </ListGroup.Item>
                                    <ListGroup.Item className="bg-dark text-light border-0">
                                        🎥 <strong>Favorite Genre:</strong> Action & Sci‑Fi
                                    </ListGroup.Item>
                                    <ListGroup.Item className="bg-dark text-light border-0">
                                        ⭐ <strong>Member Since:</strong> 2025
                                    </ListGroup.Item>
                                </ListGroup>

                                <div className="mb-3">
                                    <strong>Favorites:</strong>
                                    <ul className="mb-0">
                                        <li>Inception</li>
                                        <li>The Dark Knight</li>
                                        <li>Interstellar</li>
                                    </ul>
                                </div>

                                <div className="mb-3">
                                    <strong>Watchlist:</strong>
                                    <ul className="mb-0">
                                        <li>Dune: Part Two</li>
                                        <li>Avatar: The Way of Water</li>
                                        <li>Tenet</li>
                                    </ul>
                                </div>

                                <div className="mb-3">
                                    <strong>Activity Stats:</strong>
                                    <ul className="mb-0">
                                        <li>⭐ Movies Rated: 32</li>
                                        <li>❤️ Favorites Added: 15</li>
                                        <li>🎬 Watchlist Items: 8</li>
                                    </ul>
                                </div>

                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    );
}
