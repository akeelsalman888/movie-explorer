// FILE: src/pages/Search.jsx

import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import MovieList from "../components/MovieList.jsx";
import { Container } from "react-bootstrap";

const MOVIES_URL = import.meta.env.MODE === "production" ? "/public/db.json" : "http://localhost:3000/movies";

export default function Search() {
    const [query, setQuery] = useState(""); // Search input
    const [results, setResults] = useState([]); // Search results

    // Trigger search on button click or Enter key
    const handleSearch = () => {
        fetch(`${MOVIES_URL}?title=${query}`)
            .then((res) => res.json())
            .then((data) => setResults(data))
            .catch((err) => console.error("Search failed:", err));
    };

    return (
        <div
            className="search-page"
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 20px",
            }}
        >
            {/* Dark overlay for readability */}
            <div
                className="overlay"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    zIndex: 0,
                }}
            ></div>

            <Container
                className="search-container p-5 rounded shadow-lg"
                style={{ position: "relative", zIndex: 1 }}
            >
                {/* Heading */}
                <h1 className="text-center mb-4 text-warning fw-bold">
                    🔍 Search Movies
                </h1>

                {/* Search bar component */}
                <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

                {/* Search results */}
                <div className="mt-4" style={{ display: "flex", justifyContent: "center" }}>
                    {results.length > 0 ? (
                        <MovieList movies={results} /> // Display results if available
                    ) : (
                        // Placeholder message when no results
                        <div
                            className="fst-italic fw-bold text-center"
                            style={{
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                                color: "#ffc107",
                                padding: "15px 25px",
                                borderRadius: "8px",
                                fontSize: "1.2rem",
                                textAlign: "center",
                                maxWidth: "400px",
                            }}
                        >
                            Enter your movie to watch<br />
                            or click search to show all movies
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}
