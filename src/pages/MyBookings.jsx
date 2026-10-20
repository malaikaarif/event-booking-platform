import { useState } from 'react'
import { Link } from 'react-router-dom'
import { events } from '../data/events'

export default function MyBookings() {
  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem('bookings') || '[]')
  )

  const cancelBooking = (bookingId) => {
    if (!window.confirm('Cancel this booking?')) return
    const updated = bookings.filter((b) => b.bookingId !== bookingId)
    setBookings(updated)
    localStorage.setItem('bookings', JSON.stringify(updated))
  }

  const totalSpent = bookings.reduce((sum, b) => sum + b.total, 0)
  const totalSeats = bookings.reduce((sum, b) => sum + b.seats.length, 0)

  const stats = [
    { icon: '🎟️', label: 'Bookings', value: bookings.length },
    { icon: '💺', label: 'Seats Booked', value: totalSeats },
    { icon: '💰', label: 'Total Spent', value: `Rs. ${totalSpent}` },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
      <p className="text-gray-500">All your tickets in one place.</p>

      {bookings.length > 0 ? (
        <>
          {/* Stats */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm"
              >
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <p className="text-sm text-gray-400">{s.label}</p>
                  <p className="text-xl font-bold text-gray-800">{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Booking list */}
          <div className="mt-8 space-y-4">
            {bookings.map((b) => {
              const event = events.find((e) => e.id === b.eventId)
              return (
                <div
                  key={b.bookingId}
                  className="overflow-hidden rounded-xl bg-white shadow-md md:flex"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-40 w-full object-cover md:h-auto md:w-56"
                  />

                  <div className="flex-1 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                          {event.category}
                        </span>
                        <h2 className="mt-2 text-xl font-bold text-gray-800">
                          {event.title}
                        </h2>
                      </div>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        ● Confirmed
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                      <div>
                        <p className="text-gray-400">Date</p>
                        <p className="font-semibold text-gray-800">{event.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Venue</p>
                        <p className="font-semibold text-gray-800">{event.venue}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Seats</p>
                        <p className="font-semibold text-gray-800">{b.seats.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Paid</p>
                        <p className="font-semibold text-purple-600">Rs. {b.total}</p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                      <p className="text-sm text-gray-400">
                        Booking ID:{' '}
                        <span className="font-bold tracking-wider text-gray-700">
                          {b.bookingId}
                        </span>
                      </p>
                      <div className="flex gap-3">
                        <Link
                          to={`/events/${event.id}`}
                          className="rounded-lg border border-purple-600 px-4 py-2 text-sm font-semibold text-purple-600 hover:bg-purple-50"
                        >
                          View Event
                        </Link>
                        <button
                          onClick={() => cancelBooking(b.bookingId)}
                          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div className="mt-16 text-center">
          <div className="text-6xl">🎫</div>
          <h3 className="mt-3 text-xl font-bold text-gray-700">No bookings yet</h3>
          <p className="text-gray-500">Your booked tickets will show up here.</p>
          <Link
            to="/events"
            className="mt-5 inline-block rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
          >
            Browse Events
          </Link>
        </div>
      )}
    </div>
  )
}