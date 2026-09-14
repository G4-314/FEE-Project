import { useLocation } from 'react-router-dom'
import './Movies.css'

function Confirmation() {
  const location = useLocation()
  const rawBooking = location.state?.booking || {}

  const newBooking = {
    ...rawBooking,
    id: rawBooking.id || 'vibe-' + Date.now(),
    status: 'CONFIRMED',
    type: rawBooking.type || 'movie',
    createdAt: new Date().toISOString(),
  }

  try {
    const existing =
      JSON.parse(localStorage.getItem('vibeBookings')) || []

    const updated = Array.isArray(existing)
      ? [...existing, newBooking]
      : [newBooking]

    localStorage.setItem(
      'vibeBookings',
      JSON.stringify(updated)
    )
  } catch (error) {
    console.log('Could not save booking')
  }

  return (
    <div className="confirmation-page">
      <section className="confirmation-card">

        <div className="confirmation-head">
          <span className="section-label">Confirmation</span>

          <h1>Booking Confirmed</h1>

          <span className="confirmation-status">
            CONFIRMED
          </span>
        </div>

        <div className="confirmation-details">
          <p>
            <strong>Movie:</strong>{' '}
            {newBooking.eventName || 'Movie'}
          </p>

          <p>
            <strong>Date:</strong>{' '}
            {newBooking.date || 'Not available'}
          </p>

          <p>
            <strong>Seats:</strong>{' '}
            {newBooking.seats?.join(', ') || 'Not available'}
          </p>

          <p>
            <strong>Booking ID:</strong>{' '}
            {newBooking.id}
          </p>
        </div>

        <div className="confirmation-message">
          Your movie booking has been successfully confirmed.
        </div>

      </section>
    </div>
  )
}

export default Confirmation
