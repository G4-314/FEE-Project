import { useLocation, useNavigate } from 'react-router-dom'
import './Movies.css'

function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const booking = location.state || {}

  const handlePayment = (event) => {
    event.preventDefault()
    const confirmationBooking = {
      ...booking,
      status: 'CONFIRMED',
      type: 'movie',
      id: 'vibe-' + Date.now(),
    }
    navigate('/confirmation', { state: { booking: confirmationBooking } })
  }

  return (
    <div className="payment-page">
      <section className="payment-card">
        <div className="payment-head">
          <span className="section-label">Payment</span>
          <h1>Complete Payment</h1>
        </div>
        <div className="payment-info">
          <div>
            <span className="summary-label">Event</span>
            <span className="summary-value">{booking.eventName || 'Movie'}</span>
          </div>
          <div>
            <span className="summary-label">Seats</span>
            <span className="summary-value">{(booking.seats || []).join(', ') || 'Tickets'}</span>
          </div>
          <div>
            <span className="summary-label">Total</span>
            <span className="summary-value">₹{booking.total || 0}</span>
          </div>
        </div>

        <form className="payment-form" onSubmit={handlePayment}>
          <div className="form-grid">
            <label><span>Name on Card</span><input type="text" defaultValue="Vibe Guest" required /></label>
            <label><span>Card Number</span><input type="text" defaultValue="•••• •••• •••• 4598" required /></label>
            <label><span>Expiry</span><input type="text" defaultValue="12/29" required /></label>
            <label><span>CVV</span><input type="password" defaultValue="123" required /></label>
          </div>
          <div className="payment-actions">
            <button type="button" className="back-link" onClick={() => navigate('/booking-summary', { state: booking })}>Back</button>
            <button type="submit" className="confirm-btn">Pay Simulated ₹{booking.total || 0}</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Payment
