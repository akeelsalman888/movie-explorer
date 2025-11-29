import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const FAVORITES_URL = "http://localhost:3000/favorites";

export default function MovieCard({ movie }) {
    const [isFavorite, setIsFavorite] = useState(false);

    // Default poster if missing
    const defaultPoster = "https://i.ibb.co/4F3z4qX/no-poster.png";

    // Check if movie is already in favorites
    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const res = await fetch(FAVORITES_URL);
                if (!res.ok) return;
                const data = await res.json();
                const found = data.find((fav) => fav.movieId === movie.id);
                setIsFavorite(!!found);
            } catch (error) {
                console.error("Error checking favorite:", error);
            }
        };
        checkFavorite();
    }, [movie.id]);

    // Add or remove favorite
    const handleFavorite = async () => {
        if (isFavorite) {
            const confirmed = window.confirm(
                `Are you sure you want to remove "${movie.title}" from favorites?`
            );
            if (!confirmed) return;

            try {
                const res = await fetch(FAVORITES_URL);
                if (!res.ok) {
                    alert("Cannot fetch favorites right now. Try again later.");
                    return;
                }
                const data = await res.json();
                const favItem = data.find((fav) => fav.movieId === movie.id);

                if (favItem) {
                    const delRes = await fetch(`${FAVORITES_URL}/${favItem.id}`, {
                        method: "DELETE",
                    });
                    if (!delRes.ok) {
                        alert("Could not remove favorite. Maybe rate limit exceeded.");
                        return;
                    }
                    alert(`${movie.title} removed from favorites!`);
                    setIsFavorite(false);
                }
            } catch (error) {
                alert("Error removing favorite: " + error.message);
            }
        } else {
            try {
                const addRes = await fetch(FAVORITES_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ movieId: movie.id, note: "Loved it!" }),
                });

                if (!addRes.ok) {
                    alert("Could not add favorite. Maybe rate limit exceeded.");
                    return;
                }

                alert(`${movie.title} added to favorites!`);
                setIsFavorite(true);
            } catch (error) {
                alert("Error adding favorite: " + error.message);
            }
        }
    };

    return (
        <Card className="shadow-lg h-100 border-0">
            <Card.Img
                loading="lazy"
                variant="top"
                src={movie.poster || defaultPoster}
                style={{ height: "350px", objectFit: "cover" }}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultPoster;
                }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{movie.title}</Card.Title>
                <Card.Text className="text-muted">
                    {movie.overview?.slice(0, 80) || "No description available..."}
                </Card.Text>
                <div className="d-flex gap-2 mt-auto">
                    <Button
                        as={Link}
                        to={`/movie/${movie.id}`}
                        variant="outline-primary"
                        size="sm"
                        className="flex-fill"
                    >
                        Details
                    </Button>
                    <Button
                        onClick={handleFavorite}
                        variant={isFavorite ? "outline-danger" : "outline-success"}
                        size="sm"
                        className="flex-fill"
                    >
                        {isFavorite ? "Remove Favorite" : "Add Favorite"}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}
