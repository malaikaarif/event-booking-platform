import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-purple-600 font-semibold'
      : 'text-gray-600 hover:text-purple-600'

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          Evento
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/events" className={linkClass}>Events</NavLink>
          <NavLink to="/my-bookings" className={linkClass}>My Bookings</NavLink>
          <NavLink to="/profile" className={linkClass}>Profile</NavLink>
          <Link
            to="/login"
            className="rounded-lg bg-purple-600 px-5 py-2 text-white hover:bg-purple-700"
          >
            Login
          </Link>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-3xl md:hidden"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-4 border-t px-4 py-4 md:hidden">
          <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/events" className={linkClass} onClick={() => setOpen(false)}>Events</NavLink>
          <NavLink to="/my-bookings" className={linkClass} onClick={() => setOpen(false)}>My Bookings</NavLink>
          <NavLink to="/profile" className={linkClass} onClick={() => setOpen(false)}>Profile</NavLink>
          <Link to="/login" onClick={() => setOpen(false)} className="font-semibold text-purple-600">
            Login
          </Link>
        </div>
      )}
    </nav>
  )
}