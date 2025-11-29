import { useEffect, useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import EditModal from "../components/Modal.jsx";
import Loader from "../components/Loader.jsx";

const MOVIES_URL = "http://localhost:3000/movies";
const FAVORITES_URL = "http://localhost:3000/favorites";

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

    const getMovieById = (id) => movies.find((m) => String(m.id) === String(id));

    const deleteFavorite = async (id) => {
        try {
            await fetch(`${FAVORITES_URL}/${id}`, { method: "DELETE" });
            setFavorites(favorites.filter((f) => f.id !== id));
        } catch (err) {
            console.error(err);
            setError("Failed to delete favorite.");
        }
    };

    const openEdit = (favId) => {
        setActiveFavId(favId);
        setShowModal(true);
    };

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

    if (loading) return <Loader />;
    if (error) return <p className="text-danger text-center">{error}</p>;

    return (
        <div className="homepage">
            <div className="overlay">
                <Container className="py-5">
                    <h1 className="text-center text-light mb-5 fw-bold">❤️ My Favorites</h1>

                    {favorites.length === 0 && (
                        <p className="text-light text-center">
                            You have no favorites yet. Go to a movie and click “Add Favorite”.
                        </p>
                    )}

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
                                                        const ok = window.confirm(
                                                            `Are you sure you want to remove "${movie?.title || "this movie"
                                                            }" from favorites?`
                                                        );
                                                        if (ok) deleteFavorite(fav.id);
                                                    }}
                                                >
                                                    ❌ Delete
                                                </Button>

                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>

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
