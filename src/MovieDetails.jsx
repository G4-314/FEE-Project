import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Movies.css'

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/movies.json')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load movie details')
        return response.json()
      })
      .then((data) => {
        const found = data.find((item) => item.id === id)
        if (!found) {
          setError('Movie not found')
          setLoading(false)
          return
        }
        setMovie(found)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Unable to load movie details')
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="movie-details-page page-loading"><span>Loading movie details...</span></div>
  if (error) return <div className="movie-details-page error-state"><span>{error}</span></div>

  return (
    <div className="movie-details-page">
      <div className="movie-detail-wrap">
        <div className="movie-detail-image">
          <img src={movie.image || '/images/fallback.svg'} alt={movie.title} onError={(event) => { event.target.src = '/images/fallback.svg' }} />
        </div>
        <div className="movie-detail-content">
          <div className="detail-top">
            <span className="movie-detail-tag">{movie.genre}</span>
            <span className="movie-detail-rating">{movie.rating}</span>
          </div>
          <h1>{movie.title}</h1>
          <div className="movie-detail-meta">
            <span>{movie.language}</span>
            <span>{movie.duration}</span>
            <span>{movie.city}</span>
          </div>
          <div className="movie-detail-info">
            <div><span className="info-label">Release Date</span><span className="info-value">{movie.releaseDate}</span></div>
            <div><span className="info-label">Theatre</span><span className="info-value">{movie.theatre}</span></div>
            <div><span className="info-label">City</span><span className="info-value">{movie.city}</span></div>
            <div><span className="info-label">Ticket Price</span><span className="info-value">₹{movie.price}</span></div>
          </div>
          <p className="movie-description">{movie.description}</p>
          <div className="movie-detail-actions">
            <Link className="movie-book-now" to={`/movie-seats/${movie.id}`}>Book Tickets</Link>
            <Link className="back-link" to="/movies">Back to Movies</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
