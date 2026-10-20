import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex gap-6 bg-purple-700 p-4 text-white">
      <Link to="/">Home</Link>
      <Link to="/events">Events</Link>
      <Link to="/my-bookings">My Bookings</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
    </nav>
  )
}