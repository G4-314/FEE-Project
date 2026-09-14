import { useEffect, useState } from 'react'
import MovieCard from './MovieCard.jsx'
import './Movies.css'

function Movies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
 
  

  useEffect(() => {
    fetch('/movies.json')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load movies')
        return response.json()
      })
      .then((data) => {
        setMovies(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Unable to load movies')
        setLoading(false)
      })
  }, [])

  
  const filteredMovies = movies.filter((movie) => {
    const term = search.trim().toLowerCase()

    return (
      movie.title.toLowerCase().includes(term) 
    )
  })

  if (loading) {
    return (
      <div className="movies-page page-loading">
        <span className="movie-loader">Loading movies...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="movies-page error-state">
        <span className="movie-error">{error}</span>
      </div>
    )
  }

  return (
    <div className="movies-page">

      <section className="movies-hero">
        <div className="movie-landing-left">
          <span className="kicker">VIBE CINEMA</span>

          <h1>Lights. Camera. Book!</h1>

          <p className="movie-intro">
            Discover stories, stars, and seats for your next night out.
          </p>
        </div>

        <div className="movie-landing-right">
          <div className="cinema-card">
            <span className="cinema-card-label">Now Showing</span>

            <span className="cinema-card-count">
              {movies.length}
            </span>

            <span className="cinema-card-text">
              movie experiences
            </span>
          </div>
        </div>
      </section>

      <section className="movie-filter-panel">

        <div className="movie-search">
          <input
            type="search"
            placeholder="Search movie"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </section>

      {filteredMovies.length === 0 ? (

        <section className="empty-state">
          <div className="empty-card">
            <h3>No movies found</h3>

            <p>
              Try changing your search or filters.
            </p>
          </div>
        </section>

      ) : (

        <section className="movie-grid">

          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}

        </section>

      )}

    </div>
  )
}

export default Movies