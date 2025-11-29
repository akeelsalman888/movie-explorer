// src/pages/MovieDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FavoriteButton from "../components/FavoriteButton.jsx";
import Loader from "../components/Loader.jsx";

const MOVIES_URL = "http://localhost:3000/movies";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`${MOVIES_URL}/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!movie) return <Loader />;

  return (
    <div className="container mt-5 mb-5">
      <h2>{movie.title} ({movie.year || "N/A"})</h2>
      <img src={movie.poster} alt={movie.title} className="img-fluid mb-3" />
      <p>{movie.overview || "No description available."}</p>
      {movie.genre && <p><strong>Genre:</strong> {movie.genre}</p>}
      {movie.rating && <p><strong>Rating:</strong> {movie.rating}/10</p>}
      <FavoriteButton movie={movie} />
    </div>
  );
}
