// Presentational card for a single movie. Kept dumb on purpose so the feature
// file (StarRating.jsx) only worries about the interactive star widget.
export default function MovieCard({ movie }) {
  return (
    <div className="mr-card" data-testid="movie-card">
      <img src={movie.image} alt={movie.title} className="mr-card-img" />
      <div className="mr-card-body">
        <h3 className="mr-card-title" data-testid="movie-name">
          {movie.title}
        </h3>
        <p className="mr-card-meta">
          {movie.genre} · {movie.year}
        </p>
      </div>
    </div>
  );
}
