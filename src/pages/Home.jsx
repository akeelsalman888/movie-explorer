import { useEffect, useState } from "react";
import MovieList from "../components/MovieList.jsx";
import Loader from "../components/Loader.jsx";
import { Container } from "react-bootstrap";

const MOVIES_URL = "http://localhost:3000/movies";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const res = await fetch(MOVIES_URL);
                if (!res.ok) throw new Error("Failed to fetch movies");
                const data = await res.json();
                setMovies(data);
            } catch (err) {
                console.error(err);
                setError("Could not load movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        loadMovies();
    }, []);

    if (loading) return <Loader />;
    if (error) return <p className="text-danger text-center">{error}</p>;

    return (
        <div className="homepage">
            <div className="overlay">
                <Container className="py-5">
                    {/* ✅ Removed mb-5 so no extra gap below heading */}
                    <h1 className="text-center text-light fw-bold">🎬 Movies</h1>
                    <MovieList movies={movies} />
                </Container>
            </div>
        </div>
    );
}
