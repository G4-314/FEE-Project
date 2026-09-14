import { Link } from 'react-router-dom'

function MovieCard({ movie }) {
  const imageFallback = '/images/fallback.svg'

  return (
    <article className="movie-card">
      <div className="movie-poster-wrap">
        <img className="movie-poster" src={movie.image || imageFallback} alt={movie.title} onError={(event) => { event.target.src = imageFallback }} />
        <span className="movie-genre">{movie.genre}</span>
      </div>
      <div className="movie-card-content">
        <div className="movie-card-header">
          <div>
            <h3 className="movie-title">{movie.title}</h3>
            <div className="movie-metadata">
              <span>{movie.rating}</span>
              <span>{movie.language}</span>
            </div>
          </div>
          <span className="movie-duration">{movie.duration}</span>
        </div>
        <div className="movie-card-meta-grid">
          <span><b>City:</b> {movie.city}</span>
          <span><b>Price:</b> ₹{movie.price}</span>
        </div>
        <div className="movie-card-actions">
          <Link className="movie-details-btn" to={`/movie/${movie.id}`}>Details</Link>
          <Link className="movie-book-btn" to={`/movie-seats/${movie.id}`}>Book Tickets</Link>
        </div>
      </div>
    </article>
  )
}

export default MovieCard
