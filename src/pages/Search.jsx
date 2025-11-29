import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import MovieList from "../components/MovieList.jsx";
import { Container } from "react-bootstrap";

const MOVIES_URL = "http://localhost:3000/movies";

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        fetch(`${MOVIES_URL}?title=${query}`)
            .then((res) => res.json())
            .then((data) => setResults(data))
            .catch((err) => console.error("Search failed:", err));
    };

    return (
        <div className="search-page">
            {/* Dark overlay for readability */}
            <div className="overlay"></div>

            <Container className="search-container p-5 rounded shadow-lg">
                <h1 className="text-center mb-4 text-light fw-bold">🔍 Search Movies</h1>

                {/* Search bar */}
                <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

                {/* Results */}
                <div className="mt-4">
                    {results.length > 0 ? (
                        <MovieList movies={results} />
                    ) : (
                        <p className="text-center text-light fst-italic">
                            No movies found. Try another search.
                        </p>
                    )}
                </div>
            </Container>
        </div>
    );
}
