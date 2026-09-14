import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Movies.css'

const rows = ['A', 'B', 'C', 'D', 'E']
const seatsPerRow = 8
const bookedSeats = new Set(['A3', 'B5', 'C2', 'D7'])

function MovieSeatSelection() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/movies.json')
      .then((response) => response.json())
      .then((data) => {
        const found = data.find((movieItem) => movieItem.id === id)
        if (!found) setError('Movie not found')
        else setMovie(found)
        setLoading(false)
      })
      .catch(() => {
        setError('Unable to load movie details')
        setLoading(false)
      })
  }, [id])

  const subtotal = useMemo(() => selectedSeats.length * (movie?.price || 0), [selectedSeats, movie])
  const bookingFee = selectedSeats.length ? 50 : 0
  const total = subtotal + bookingFee

  const toggleSeat = (seatKey) => {
    if (bookedSeats.has(seatKey)) return
    if (selectedSeats.includes(seatKey)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatKey))
      return
    }
    if (selectedSeats.length >= 6) return
    setSelectedSeats([...selectedSeats, seatKey])
  }

  const continueToBooking = () => {
    if (!movie || selectedSeats.length === 0) return

    const bookingData = {
      type: 'movie',
      eventName: movie.title,
      performer: '',
      category: movie.genre,
      venue: movie.theatre,
      city: movie.city,
      date: movie.releaseDate,
      time: '',
      image: movie.image,
      seats: selectedSeats,
      price: movie.price,
      subtotal,
      bookingFee: 50,
      total,
    }

    navigate('/booking-summary', { state: bookingData })
  }

  if (loading) return <div className="movie-seat-page loading">Loading seats...</div>
  if (error) return <div className="movie-seat-page error">{error}</div>
  if (!movie) return <div className="movie-seat-page error">Movie not found</div>

  return (
    <div className="movie-seat-page">
      <section className="seat-layout-wrap">
        <div className="seat-top-bar">
          <div>
            <span className="mini-label">{movie.genre}</span>
            <h1>{movie.title}</h1>
          </div>
          <div className="movie-seat-price">
            <span>₹{movie.price}</span>
            <small>per ticket</small>
          </div>
        </div>

        <div className="cinema-screen">
          <div className="screen-glass">SCREEN</div>
        </div>

        <div className="seat-grid">
          {rows.map((row) => (
            <div className="seat-row" key={row}>
              <span className="seat-row-label">{row}</span>
              {Array.from({ length: seatsPerRow }, (_, index) => {
                const seatNumber = index + 1
                const seatKey = `${row}${seatNumber}`
                const isBooked = bookedSeats.has(seatKey)
                const isSelected = selectedSeats.includes(seatKey)

                return (
                  <button key={seatKey} className={`seat ${isBooked ? 'seat-booked' : ''} ${isSelected ? 'seat-selected' : ''}`} disabled={isBooked} onClick={() => toggleSeat(seatKey)}>
                    {seatNumber}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        <div className="seat-legend">
          <span><span className="legend-sample available-sample"></span>Available</span>
          <span><span className="legend-sample selected-sample"></span>Selected</span>
          <span><span className="legend-sample booked-sample"></span>Booked</span>
        </div>

        <div className="seat-selection-summary">
          <div className="selected-seats">
            <span className="summary-label">Selected Seats</span>
            <span className="summary-value">{selectedSeats.length ? selectedSeats.join(', ') : 'Choose seats'}</span>
          </div>
          <div className="booking-notes">
            <span><b>Subtotal:</b> ₹{subtotal}</span>
            <span><b>Booking Fee:</b> ₹{bookingFee}</span>
            <span><b>Total:</b> ₹{total}</span>
          </div>
          <div className="seat-actions">
            <Link className="back-link" to={`/movie/${movie.id}`}>Back</Link>
            <button className="continue-btn" disabled={selectedSeats.length === 0} onClick={continueToBooking}>Continue</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MovieSeatSelection
