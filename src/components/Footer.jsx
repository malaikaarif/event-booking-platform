import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-bold text-white">Evento</h3>
          <p className="mt-2 text-sm">
            Discover events. Pick your seat. Book in seconds.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white">Quick Links</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link to="/events" className="hover:text-white">Events</Link></li>
            <li><Link to="/my-bookings" className="hover:text-white">My Bookings</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Contact</h4>
          <p className="mt-2 text-sm">support@evento.com</p>
          <p className="text-sm">+92 300 0000000</p>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © 2026 Evento. All rights reserved.
      </div>
    </footer>
  )
}