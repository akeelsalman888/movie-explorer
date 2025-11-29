// src/components/FavoriteButton.jsx
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const FAVORITES_URL = "http://localhost:3000/favorites";

export default function FavoriteButton({ movie, size = "sm" }) {
    const [isFavorite, setIsFavorite] = useState(false);

    // Check if movie is already a favorite
    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const res = await fetch(FAVORITES_URL);
                if (!res.ok) return;
                const data = await res.json();
                const found = data.find(fav => fav.movieId === movie.id);
                setIsFavorite(!!found);
            } catch (err) {
                console.error(err);
            }
        };
        checkFavorite();
    }, [movie.id]);

    const handleFavorite = async () => {
        if (isFavorite) {
            const confirmed = window.confirm(
                `Remove "${movie.title}" from favorites?`
            );
            if (!confirmed) return;

            try {
                const res = await fetch(FAVORITES_URL);
                const data = await res.json();
                const favItem = data.find(f => f.movieId === movie.id);

                if (favItem) {
                    await fetch(`${FAVORITES_URL}/${favItem.id}`, { method: "DELETE" });
                    setIsFavorite(false);
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                await fetch(FAVORITES_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ movieId: movie.id, note: "Loved it!" }),
                });
                setIsFavorite(true);
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <Button
            onClick={handleFavorite}
            variant={isFavorite ? "outline-danger" : "outline-success"}
            size={size}
            className="text-truncate flex-fill"
            style={{ minWidth: "80px" }}
        >
            {isFavorite ? "Remove Favorite" : "Add Favorite"}
        </Button>
    );
}
