import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FAVORITES_URL = "https://69251d6282b59600d7226190.mockapi.io/favorites";

export default function FavoriteButton({ movie, isFavorite }) {
    const navigate = useNavigate();

    const handleFavorite = async () => {
        if (isFavorite) {
            // Confirm deletion
            const confirmed = window.confirm(
                `Are you sure you want to remove "${movie.title}" from favorites?`
            );
            if (!confirmed) return;

            try {
                // Assuming the movie object has an "id" in your favorites API
                await fetch(`${FAVORITES_URL}/${movie.id}`, { method: "DELETE" });
                alert(`${movie.title} removed from favorites!`);
                navigate("/favorites"); // redirect so user sees updated list
            } catch (error) {
                alert("Error removing favorite: " + error.message);
            }
        } else {
            try {
                await fetch(FAVORITES_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ movieId: movie.id, note: "Loved it!" })
                });
                alert(`${movie.title} added to favorites!`);
                navigate("/favorites"); // redirect so user sees the new favorite
            } catch (error) {
                alert("Error adding favorite: " + error.message);
            }
        }
    };

    return (
        <Button
            onClick={handleFavorite}
            variant={isFavorite ? "outline-danger" : "outline-warning"}
        >
            {isFavorite ? "💔 Remove Favorite" : "❤️ Add Favorite"}
        </Button>
    );
}
