// FILE: src/pages/Home.jsx

import { useEffect, useState } from "react";
import MovieList from "../components/MovieList.jsx";
import Loader from "../components/Loader.jsx";
import { Container } from "react-bootstrap";

// Use localhost for development, /db.json for production (Vercel)
const MOVIES_URL =
    import.meta.env.MODE === "production"
        ? "/db.json"   // Vercel serves db.json from public
        : "http://localhost:3000/movies"; // local dev server

export default function Home() {
    const [movies, setMovies] = useState([]); // List of all movies
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch movies when component mounts
    useEffect(() => {
        const loadMovies = async () => {
            try {
                const res = await fetch(MOVIES_URL);
                if (!res.ok) throw new Error("Failed to fetch movies");
                const data = await res.json();
                setMovies(data); // Set fetched movies to state
            } catch (err) {
                console.error(err);
                setError("Could not load movies. Please try again later.");
            } finally {
                setLoading(false); // Stop loading indicator
            }
        };
        loadMovies();
    }, []);

    // Show loader while fetching data
    if (loading) return <Loader />;

    // Show error message if fetch failed
    if (error) return <p className="text-danger text-center">{error}</p>;

    return (
        <div className="homepage">
            <div className="overlay">
                <Container className="py-5">
                    {/* Page heading */}
                    <h1 className="text-center text-warning fw-bold">🎬 Movies</h1>

                    {/* Render movie list */}
                    <MovieList movies={movies} />
                </Container>
            </div>
        </div>
    );
}
