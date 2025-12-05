// FILE: src/pages/Favorites.jsx

import { useEffect, useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import EditModal from "../components/Modal.jsx";
import Loader from "../components/Loader.jsx";

const MOVIES_URL = "http://localhost:3000/movies";
const FAVORITES_URL = "http://localhost:3000/favorites";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]); // User's favorite entries
    const [movies, setMovies] = useState([]);       // All movies
    const [loading, setLoading] = useState(true);   // Loading state
    const [error, setError] = useState(null);       // Error state

    const [showModal, setShowModal] = useState(false); // Controls EditModal visibility
    const [activeFavId, setActiveFavId] = useState(null); // Currently editing favorite ID

    // Load movies and favorites from server on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const [moviesRes, favRes] = await Promise.all([
                    fetch(MOVIES_URL),
                    fetch(FAVORITES_URL),
                ]);
                if (!moviesRes.ok || !favRes.ok) throw new Error("Failed to fetch data");

                const [moviesData, favData] = await Promise.all([
                    moviesRes.json(),
                    favRes.json(),
                ]);
                setMovies(moviesData);
                setFavorites(favData);
            } catch (err) {
                console.error(err);
                setError("Could not load favorites. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Helper to get movie details by ID
    const getMovieById = (id) => movies.find((m) => String(m.id) === String(id));

    // Remove a favorite from server and state
    const deleteFavorite = async (id) => {
        try {
            await fetch(`${FAVORITES_URL}/${id}`, { method: "DELETE" });
            setFavorites(favorites.filter((f) => f.id !== id));
        } catch (err) {
            console.error(err);
            setError("Failed to delete favorite.");
        }
    };

    // Open the edit modal for a specific favorite
    const openEdit = (favId) => {
        setActiveFavId(favId);
        setShowModal(true);
    };

    // Save updated note to server and update state
    const handleSaveNote = async (newNote) => {
        if (!activeFavId) return;
        try {
            await fetch(`${FAVORITES_URL}/${activeFavId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ note: newNote }),
            });
            setFavorites(favorites.map(f =>
                f.id === activeFavId ? { ...f, note: newNote } : f
            ));
        } catch (err) {
            console.error(err);
            setError("Failed to update note.");
        } finally {
            setShowModal(false);
            setActiveFavId(null);
        }
    };

    // Show loader while fetching data
    if (loading) return <Loader />;

    // Show error message if something went wrong
    if (error) return <p className="text-danger text-center">{error}</p>;

    return (
        <div className="homepage">
            <div className="overlay" style={{ minHeight: "100vh" }}>
                <Container className="py-5">

                    {/* Page title */}
                    <h1 className="text-center text-warning mb-5 fw-bold">❤️ My Favorites</h1>

                    {/* Show message if no favorites */}
                    {favorites.length === 0 ? (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "60vh",
                            }}
                        >
                            <p
                                className="fst-italic fw-bold text-center"
                                style={{
                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                    color: "#ffc107",
                                    padding: "15px 25px",
                                    borderRadius: "8px",
                                    fontSize: "1.2rem",
                                    maxWidth: "400px",
                                }}
                            >
                                You have no favorites yet. Go to a movie and click “Add Favorite”.
                            </p>
                        </div>
                    ) : (
                        // Display favorite movies
                        <div className="row">
                            {favorites.map((fav) => {
                                const movie = getMovieById(fav.movieId);
                                const placeholder = "https://via.placeholder.com/300x450?text=No+Image";
                                return (
                                    <div key={fav.id} className="col-md-3 mb-4">
                                        <Card className="shadow-lg h-100 border-0">
                                            {/* Movie poster */}
                                            <Card.Img
                                                variant="top"
                                                src={movie?.poster || placeholder}
                                                style={{ height: "350px", objectFit: "cover" }}
                                            />

                                            <Card.Body className="d-flex flex-column">
                                                {/* Movie title */}
                                                <Card.Title className="fw-bold">
                                                    {movie ? movie.title : "Unknown Movie"}
                                                </Card.Title>

                                                {/* User note */}
                                                <Card.Text className="text-muted">
                                                    <strong>Note:</strong> {fav.note || "No note yet."}
                                                </Card.Text>

                                                {/* Remove favorite button */}
                                                <div className="d-flex gap-2 mt-auto">
                                                    <Button
                                                        variant="danger"
                                                        className="flex-fill"
                                                        onClick={() => {
                                                            const ok = window.confirm(
                                                                `Are you sure you want to remove "${movie?.title || "this movie"}" from favorites?`
                                                            );
                                                            if (ok) deleteFavorite(fav.id);
                                                        }}
                                                    >
                                                        ❌ Remove from favorites
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Edit note modal */}
                    <EditModal
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        onSave={handleSaveNote}
                    />
                </Container>
            </div>
        </div>
    );
}
