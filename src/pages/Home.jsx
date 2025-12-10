// FILE: src/pages/Home.jsx

import { useEffect, useState } from "react";
import MovieList from "../components/MovieList.jsx";
import Loader from "../components/Loader.jsx";
import { Container } from "react-bootstrap";

// Fetch movies: local server in dev, static JSON on Vercel in prod
const MOVIES_URL =
    import.meta.env.MODE === "production"
        ? "/db.json"          // db.json directly in public folder
        : "http://localhost:3000/movies";

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
                // db.json has { movies: [...], favorites: [...] } structure
                setMovies(data.movies || []);
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
                    <h1 className="text-center text-warning fw-bold">🎬 Movies</h1>
                    <MovieList movies={movies} />
                </Container>
            </div>
        </div>
    );
}
