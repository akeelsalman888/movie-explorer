// FILE: src/pages/EditMovie.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import BackButton from "../components/BackButton.jsx"; // ✅ Import BackButton

export default function EditMovie() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({ title: "", year: "", poster: "" });

    useEffect(() => {
        fetch(`http://localhost:3000/movies/${id}`)
            .then((res) => res.json())
            .then((data) => setMovie(data))
            .catch((err) => console.error(err));
    }, [id]);

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/movies/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movie),
        })
            .then(() => navigate(-1))
            .catch((err) => console.error(err));
    };

    return (
        <div className="homepage">
            <div className="overlay" style={{ minHeight: "100vh" }}>
                <Container className="py-5 position-relative">
                    {/* BackButton at top-left corner */}
                    <BackButton />

                    <h2 className="text-light mb-4">Edit Movie</h2>

                    <Form onSubmit={handleSubmit} className="mt-3">
                        <Form.Group className="mb-3">
                            <Form.Label className="text-light">Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={movie.title}
                                onChange={handleChange}
                                placeholder="Enter movie title"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-light">Year</Form.Label>
                            <Form.Control
                                type="text"
                                name="year"
                                value={movie.year}
                                onChange={handleChange}
                                placeholder="Enter release year"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-light">Poster URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="poster"
                                value={movie.poster}
                                onChange={handleChange}
                                placeholder="Enter poster URL"
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            Update Movie
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>
    );
}
