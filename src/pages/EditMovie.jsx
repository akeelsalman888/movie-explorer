// FILE: src/pages/EditMovie.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

export default function EditMovie() {
    const { id } = useParams(); // Get movie ID from URL
    const navigate = useNavigate(); // Used to navigate after update
    const [movie, setMovie] = useState({ title: "", year: "", poster: "" }); // Local state for movie data

    // Fetch movie data on component mount or when ID changes
    useEffect(() => {
        fetch(`http://localhost:3000/movies/${id}`)
            .then((res) => res.json())
            .then((data) => setMovie(data)) // Populate form fields with existing movie data
            .catch((err) => console.error(err));
    }, [id]);

    // Handle input changes and update state
    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    // Handle form submission to update movie
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/movies/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movie),
        })
            .then(() => navigate("/")) // Redirect to home after successful update
            .catch((err) => console.error(err));
    };

    return (
        <div className="container mt-4">
            {/* Page title */}
            <h2>Edit Movie</h2>

            {/* Edit form */}
            <Form onSubmit={handleSubmit} className="mt-3">
                {/* Movie title input */}
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={movie.title}
                        onChange={handleChange}
                        placeholder="Enter movie title"
                        required
                    />
                </Form.Group>

                {/* Movie year input */}
                <Form.Group className="mb-3">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        type="text"
                        name="year"
                        value={movie.year}
                        onChange={handleChange}
                        placeholder="Enter release year"
                        required
                    />
                </Form.Group>

                {/* Movie poster input */}
                <Form.Group className="mb-3">
                    <Form.Label>Poster URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="poster"
                        value={movie.poster}
                        onChange={handleChange}
                        placeholder="Enter poster URL"
                    />
                </Form.Group>

                {/* Submit button */}
                <Button type="submit" variant="primary">
                    Update Movie
                </Button>
            </Form>
        </div>
    );
}
