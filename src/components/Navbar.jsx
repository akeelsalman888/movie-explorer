// FILE: src/components/Navbar.jsx
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <BootstrapNavbar
            expand="lg"
            fixed="top"
            className="shadow-sm p-0 m-0"
            style={{
                background: "linear-gradient(90deg, #0d6efd, #6610f2)",
            }}
        >
            <Container>
                {/* Brand */}
                <BootstrapNavbar.Brand
                    as={NavLink}
                    to="/"
                    className="fw-bold text-light d-flex align-items-center"
                    style={{ letterSpacing: "1px" }}
                >
                    🎬 Movie Explorer
                </BootstrapNavbar.Brand>

                {/* Toggle for mobile */}
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />

                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link
                            as={NavLink}
                            to="/"
                            end
                            className="text-light"
                            style={({ isActive }) => ({
                                fontWeight: isActive ? "700" : "400",
                                borderBottom: isActive ? "2px solid #ffc107" : "none",
                            })}
                        >
                            Home
                        </Nav.Link>

                        <Nav.Link
                            as={NavLink}
                            to="/search"
                            className="text-light"
                            style={({ isActive }) => ({
                                fontWeight: isActive ? "700" : "400",
                                borderBottom: isActive ? "2px solid #ffc107" : "none",
                            })}
                        >
                            Search
                        </Nav.Link>

                        <Nav.Link
                            as={NavLink}
                            to="/favorites"
                            className="text-light"
                            style={({ isActive }) => ({
                                fontWeight: isActive ? "700" : "400",
                                borderBottom: isActive ? "2px solid #ffc107" : "none",
                            })}
                        >
                            Favorites
                        </Nav.Link>

                        <Nav.Link
                            as={NavLink}
                            to="/profile"
                            className="text-light"
                            style={({ isActive }) => ({
                                fontWeight: isActive ? "700" : "400",
                                borderBottom: isActive ? "2px solid #ffc107" : "none",
                            })}
                        >
                            Profile
                        </Nav.Link>

                        {/* New Coming Soon link */}
                        <Nav.Link
                            as={NavLink}
                            to="/coming-soon"
                            className="text-light"
                            style={({ isActive }) => ({
                                fontWeight: isActive ? "700" : "400",
                                borderBottom: isActive ? "2px solid #ffc107" : "none",
                                fontStyle: "italic",
                            })}
                        >
                            Coming Soon
                        </Nav.Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}
