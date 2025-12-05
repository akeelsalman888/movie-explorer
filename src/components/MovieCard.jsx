// FILE: src/components/MovieCard.jsx

import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton.jsx";

export default function MovieCard({ movie }) {
    // Used for programmatic navigation (example: Edit button)
    const navigate = useNavigate();

    return (
        // Main movie card container
        <Card className="shadow-lg h-100 border-0">
            {/* Movie Poster - loaded lazily for better performance */}
            <Card.Img
                loading="lazy"
                variant="top"
                src={movie.poster} // Poster comes from local "images" folder
                style={{ height: "350px", objectFit: "cover" }}
            />

            <Card.Body className="d-flex flex-column">
                {/* Movie Title */}
                <Card.Title className="fw-bold">{movie.title}</Card.Title>

                {/* Short description preview */}
                <Card.Text className="text-muted">
                    {movie.overview?.slice(0, 80) || "No description available..."}
                </Card.Text>

                {/* Action Buttons Section */}
                <div className="d-flex gap-1 mt-auto">
                    {/* Navigate to movie details page */}
                    <Button
                        as={Link}
                        to={`/movie/${movie.id}`}
                        variant="outline-primary"
                        size="sm"
                        className="flex-fill"
                    >
                        Details
                    </Button>

                    {/* Add/remove movie from favorites */}
                    <FavoriteButton movie={movie} />

                    {/* Navigate to edit page for this movie */}
                    <Button
                        onClick={() => navigate(`/edit/${movie.id}`)}
                        variant="outline-warning"
                        size="sm"
                    >
                        Edit
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}
