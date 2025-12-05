// FILE: src/components/FavoriteButton.jsx

import { Button, Toast, ToastContainer } from "react-bootstrap";
import { useState, useEffect } from "react";

const FAVORITES_URL = "http://localhost:3000/favorites";

export default function FavoriteButton({ movie, size = "sm" }) {
    // Track if movie is already stored in favorites
    const [isFavorite, setIsFavorite] = useState(false);

    // Controls showing confirmation toast when adding a favorite
    const [showToast, setShowToast] = useState(false);

    // When component loads or movie.id changes, check if this movie is already a favorite
    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const res = await fetch(FAVORITES_URL);
                if (!res.ok) return; // Avoid breaking if server unavailable

                const data = await res.json();

                // Look for an item with same movie ID in the favorites list
                const found = data.find(fav => fav.movieId === movie.id);

                // Convert found item to boolean (true/false)
                setIsFavorite(!!found);
            } catch (err) {
                console.error(err); // Log any network errors
            }
        };

        checkFavorite();
    }, [movie.id]);

    // Handle adding or removing movie from favorites
    const handleFavorite = async () => {
        // Case 1: Movie is already a favorite → remove it
        if (isFavorite) {
            const confirmed = window.confirm(
                `Remove "${movie.title}" from favorites?`
            );
            if (!confirmed) return; // Stop if user cancels

            try {
                // First, fetch all favorites
                const res = await fetch(FAVORITES_URL);
                const data = await res.json();

                // Find this specific favorite entry
                const favItem = data.find(f => f.movieId === movie.id);

                // Remove it from the server if found
                if (favItem) {
                    await fetch(`${FAVORITES_URL}/${favItem.id}`, { method: "DELETE" });
                    setIsFavorite(false); // Update UI
                }
            } catch (err) {
                console.error(err);
            }
        }

        // Case 2: Movie is not a favorite → add it
        else {
            try {
                await fetch(FAVORITES_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ movieId: movie.id, note: "Loved it!" }),
                });

                setIsFavorite(true); // Update button appearance

                // Show success toast for 2.5 seconds
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);

            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <>
            {/* Button toggles between Add Favorite / Remove Favorite */}
            <Button
                onClick={handleFavorite}
                variant={isFavorite ? "outline-danger" : "outline-success"}
                size={size}
                className="text-truncate flex-fill"
                style={{ minWidth: "80px" }}
            >
                {isFavorite ? "Remove Favorite" : "Add Favorite"}
            </Button>

            {/* Toast Notification displayed when a movie is added */}
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    show={showToast}
                    bg="success"
                    onClose={() => setShowToast(false)}
                    delay={2500}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">Favorites</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        "{movie.title}" has been added to favorites!
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}
