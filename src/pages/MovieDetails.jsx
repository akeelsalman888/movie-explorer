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
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) return <Loader />;

  return (
    <div className="container mt-5 mb-5">
      <h2>{movie.title}</h2>
      <img
        src={movie.poster}
        alt={movie.title}
        className="img-fluid mb-3"
      />
      <p>{movie.overview}</p>
      <FavoriteButton movie={movie} />
    </div>
  );
}
