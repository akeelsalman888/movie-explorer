// FILE: src/pages/Favorites.jsx

import { useEffect, useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import EditModal from "../components/Modal.jsx";
import Loader from "../components/Loader.jsx";

// Fetch from static JSON in prod, localhost in dev
const DATA_URL =
    import.meta.env.MODE === "production"
        ? "/db.json"
        : "http://localhost:3000/movies";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [activeFavId, setActiveFavId] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch(DATA_URL);
                if (!res.ok) throw new Error("Failed to fetch data");
                const data = await res.json();

                setMovies(data.movies || []);
                setFavorites(data.favorites || []);
            } catch (err) {
                console.error(err);
                setError("Could not load favorites. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const getMovieById = (id) => movies.find((m) => String(m.id) === String(id));

    const deleteFavorite = (id) => setFavorites(favorites.filter((f) => f.id !== id));

    const openEdit = (favId) => {
        setActiveFavId(favId);
        setShowModal(true);
    };

    const handleSaveNote = (newNote) => {
        if (!activeFavId) return;
        setFavorites(
            favorites.map((f) => (f.id === activeFavId ? { ...f, note: newNote } : f))
        );
        setShowModal(false);
        setActiveFavId(null);
    };

    if (loading) return <Loader />;
    if (error) return <p className="text-danger text-center">{error}</p>;

    return (
        <div className="homepage">
            <div className="overlay" style={{ minHeight: "100vh" }}>
                <Container className="py-5">
                    <h1 className="text-center text-warning mb-5 fw-bold">❤️ My Favorites</h1>

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
                        <div className="row">
                            {favorites.map((fav) => {
                                const movie = getMovieById(fav.movieId);
                                const placeholder = "https://via.placeholder.com/300x450?text=No+Image";
                                return (
                                    <div key={fav.id} className="col-md-3 mb-4">
                                        <Card className="shadow-lg h-100 border-0">
                                            <Card.Img
                                                variant="top"
                                                src={movie?.poster || placeholder}
                                                style={{ height: "350px", objectFit: "cover" }}
                                            />
                                            <Card.Body className="d-flex flex-column">
                                                <Card.Title className="fw-bold">
                                                    {movie ? movie.title : "Unknown Movie"}
                                                </Card.Title>
                                                <Card.Text className="text-muted">
                                                    <strong>Note:</strong> {fav.note || "No note yet."}
                                                </Card.Text>
                                                <div className="d-flex gap-2 mt-auto">
                                                    <Button
                                                        variant="danger"
                                                        className="flex-fill"
                                                        onClick={() => {
                                                            if (
                                                                window.confirm(
                                                                    `Remove "${movie?.title || "this movie"}"?`
                                                                )
                                                            )
                                                                deleteFavorite(fav.id);
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
