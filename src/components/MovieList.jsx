// FILE: src/components/MovieList.jsx

import MovieCard from "./MovieCard.jsx";

export default function MovieList({ movies }) {
    // If there are no movies to show, display a friendly message
    if (!movies || movies.length === 0) {
        return (
            <p className="text-center text-muted mt-4">
                No movies found. Try searching for another title.
            </p>
        );
    }

    return (
        // Display list of MovieCards in a responsive flex layout
        <div className="d-flex flex-wrap gap-3 justify-content-start">
            {movies.map((movie) => (
                // Each movie gets its own card container
                <div key={movie.id} style={{ width: "220px" }}>
                    <MovieCard movie={movie} />
                </div>
            ))}
        </div>
    );
}
