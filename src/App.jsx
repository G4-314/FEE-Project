import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Movies from './Movies.jsx'
import MovieDetails from './MovieDetails.jsx'
import MovieSeatSelection from './MovieSeatSelection.jsx'
import BookingSummary from './BookingSummary.jsx'
import Payment from './Payment.jsx'
import Confirmation from './Confirmation.jsx'

import './App.css'

/*function Login() {
  return (
    <div className="login-page">
      <section className="login-card">
        <span className="section-label">VIBE</span>
        <h1>Welcome back</h1>
        <form className="login-form">
          <label>
            <span>Email</span>
            <input type="email" defaultValue="guest@vibe.com" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" defaultValue="password" />
          </label>
          <Link className="confirm-btn" to="/movies">Login</Link>
        </form>
      </section>
    </div>
  )
}*/

{/*function Home() {
  return (
    <div className="home-page">
      <section className="home-card">
        <span className="section-label">VIBE</span>
        <h1>Events. Movies. Community.</h1>
        <div className="home-actions">
          <Link className="movie-book-btn" to="/movies">Explore Movies</Link>
        
        </div>
      </section>
    </div>
  )
}*/}

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar">
        <Link className="brand" to="/">VIBE</Link>
        <div className="nav-links">
          {/*<Link className="nav-link" to="/">Home</Link>*/}
          <Link className="nav-link" to="/movies">Movies</Link>
         
         {/* <Link className="nav-link" to="/login">Login</Link>*/}
        </div>
      </nav>

      <Routes>
       {/* <Route path="/" element={<Home />} /> */}
       <Route path="/" element={<Movies />} />
<Route path="/movies" element={<Movies />} />
       {/* <Route path="/login" element={<Login />} /> */}
       {/* <Route path="/movies" element={<Movies />} />*/}
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie-seats/:id" element={<MovieSeatSelection />} />
        <Route path="/booking-summary" element={<BookingSummary />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
     
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App

