// // src/components/MovieCard.jsx
// import { Card, Button } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import FavoriteButton from "./FavoriteButton.jsx";

// export default function MovieCard({ movie }) {
//     const navigate = useNavigate();
//     const defaultPoster = "https://i.ibb.co/4F3z4qX/no-poster.png";

//     return (
//         <Card className="shadow-sm border-0 h-100">
//             <Card.Img
//                 loading="lazy"
//                 variant="top"
//                 src={movie.poster || defaultPoster}
//                 style={{ height: "300px", objectFit: "cover" }}
//                 onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = defaultPoster;
//                 }}
//             />
//             <Card.Body className="d-flex flex-column">
//                 <Card.Title className="fw-bold mb-2" style={{ fontSize: "1rem" }}>
//                     {movie.title} ({movie.year})
//                 </Card.Title>

//                 <Card.Text className="text-muted mb-3" style={{ fontSize: "0.85rem", flexGrow: 1 }}>
//                     {movie.overview?.length > 80
//                         ? movie.overview.slice(0, 80) + "..."
//                         : movie.overview || "No description available..."}
//                 </Card.Text>

//                 <div className="d-flex justify-content-between gap-1">
//                     <Button
//                         as={Link}
//                         to={`/movie/${movie.id}`}
//                         variant="outline-primary"
//                         size="sm"
//                     >
//                         Details
//                     </Button>

//                     {/* Make FavoriteButton small */}
//                     <FavoriteButton movie={movie} size="sm" className="p-0" />

//                     <Button
//                         onClick={() => navigate(`/edit/${movie.id}`)}
//                         variant="outline-warning"
//                         size="sm"
//                     >
//                         Edit
//                     </Button>
//                 </div>
//             </Card.Body>
//         </Card>
//     );
// }


// src/components/MovieCard.jsx
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton.jsx";

export default function MovieCard({ movie }) {
    const navigate = useNavigate();
    const defaultPoster = "https://i.ibb.co/4F3z4qX/no-poster.png";

    return (
        <Card className="shadow-lg h-100 border-0">
            <Card.Img
                loading="lazy"
                variant="top"
                src={movie.poster || defaultPoster}
                style={{ height: "350px", objectFit: "cover" }}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultPoster;
                }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{movie.title}</Card.Title>
                <Card.Text className="text-muted">
                    {movie.overview?.slice(0, 80) || "No description available..."}
                </Card.Text>

                <div className="d-flex gap-1 mt-auto">
                    {/* Details button */}
                    <Button
                        as={Link}
                        to={`/movie/${movie.id}`}
                        variant="outline-primary"
                        size="sm"
                        className="flex-fill"
                    >
                        Details
                    </Button>

                    {/* FavoriteButton now fully controlled */}
                    <FavoriteButton movie={movie} />

                    {/* Edit button */}
                    <Button
                        onClick={() => navigate(`/edit/${movie.id}`)}
                        variant="outline-warning"
                        size="sm"
                    >
                        Edit
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}
