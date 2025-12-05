// FILE: src/pages/MovieDetails.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FavoriteButton from "../components/FavoriteButton.jsx";
import Loader from "../components/Loader.jsx";

const MOVIES_URL = "http://localhost:3000/movies"; // Local API only

export default function MovieDetails() {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null); // Store movie details

  // Fetch movie details on mount or when ID changes
  useEffect(() => {
    fetch(`${MOVIES_URL}/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error(err));
  }, [id]);

  // Show loader while fetching data
  if (!movie) return <Loader />;

  return (
    <div className="homepage">
      <div className="overlay">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 text-light">
              {/* Movie title */}
              <h2 className="fw-bold mb-3" style={{ fontSize: "2.4rem" }}>
                {movie.title} ({movie.year || "N/A"})
              </h2>

              {/* Movie poster */}
              <img
                src={movie.poster}
                alt={movie.title}
                className="img-fluid rounded shadow mb-4"
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />

              {/* Overview */}
              <p className="lead mb-3" style={{ fontSize: "1.35rem", lineHeight: "1.6" }}>
                {movie.overview || "No description available."}
              </p>

              {/* Genre */}
              {movie.genre && (
                <p>
                  <strong>Genre:</strong> {movie.genre}
                </p>
              )}

              {/* Rating */}
              {movie.rating && (
                <p>
                  <strong>Rating:</strong> {movie.rating}/10
                </p>
              )}

              {/* Director */}
              {movie.director && (
                <p>
                  <strong>Director:</strong> {movie.director}
                </p>
              )}

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <div className="mb-3">
                  <strong>Cast:</strong>
                  <ul className="mb-0 ps-3">
                    {movie.cast.map((actor, idx) => (
                      <li key={idx}>{actor}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Favorite button */}
              <div className="mt-4">
                <FavoriteButton movie={movie} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
