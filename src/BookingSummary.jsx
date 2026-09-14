import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Movies.css'

function BookingSummary() {
  const navigate = useNavigate()
  const location = useLocation()
  const booking = location.state || {}

  return (
    <div className="booking-summary-page">
      <section className="booking-summary-card">
        <div className="booking-summary-head">
          <div>
            <span className="section-label">Booking Summary</span>
            <h1>{booking.eventName || 'Movie Event'}</h1>
          </div>
          <span className="badge-type">{booking.type || 'movie'}</span>
        </div>

        <div className="summary-grid">
          <div className="summary-image">
            <img src={booking.image || '/images/fallback.svg'} alt={booking.eventName} onError={(event) => { event.target.src = '/images/fallback.svg' }} />
          </div>
          <div className="summary-details">
            <div className="summary-detail-row"><span className="summary-label">Category</span><span className="summary-value">{booking.category || 'Cinema'}</span></div>
            <div className="summary-detail-row"><span className="summary-label">Venue</span><span className="summary-value">{booking.venue || 'Cinema Hall'}</span></div>
            <div className="summary-detail-row"><span className="summary-label">City</span><span className="summary-value">{booking.city || 'City'}</span></div>
            <div className="summary-detail-row"><span className="summary-label">Date</span><span className="summary-value">{booking.date || '2026-09-13'}</span></div>
            <div className="summary-detail-row"><span className="summary-label">Seats</span><span className="summary-value">{(booking.seats || []).join(', ') || 'No seats selected'}</span></div>
          </div>
        </div>

        <div className="price-breakdown">
          <div><span>Subtotal</span><strong>₹{booking.subtotal || 0}</strong></div>
          <div><span>Booking Fee</span><strong>₹{booking.bookingFee || 50}</strong></div>
          <div><span>Total</span><strong>₹{booking.total || 0}</strong></div>
        </div>

        <div className="booking-summary-actions">
          <Link className="back-link" to="/movies">Back to Movies</Link>
          <button className="confirm-btn" onClick={() => navigate('/payment', { state: booking })}>Proceed to Payment</button>
        </div>
      </section>
    </div>
  )
}

export default BookingSummary
