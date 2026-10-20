import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { events } from '../data/events'

export default function Confirmation() {
  const { state } = useLocation()

  // Save the booking so "My Bookings" can show it later
  useEffect(() => {
    if (!state) return
    const saved = JSON.parse(localStorage.getItem('bookings') || '[]')
    if (saved.some((b) => b.bookingId === state.bookingId)) return
    localStorage.setItem(
      'bookings',
      JSON.stringify([
        ...saved,
        {
          bookingId: state.bookingId,
          eventId: state.eventId,
          seats: state.seats,
          total: state.total,
          name: state.name,
        },
      ])
    )
  }, [state])

  if (!state) {
    return (
      <div className="mt-20 text-center">
        <div className="text-6xl">🎟️</div>
        <h2 className="mt-3 text-2xl font-bold text-gray-700">No booking found</h2>
        <Link
          to="/events"
          className="mt-4 inline-block rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
        >
          Browse Events
        </Link>
      </div>
    )
  }

  const event = events.find((e) => e.id === state.eventId)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Success message */}
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">
          ✓
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-800">Booking Confirmed!</h1>
        <p className="mt-1 text-gray-500">
          Thank you, {state.name}. A copy was sent to {state.email}.
        </p>
      </div>

      {/* Ticket */}
      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-xl md:flex">
        {/* Left part */}
        <div className="flex-1 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-600">
            Evento · E-Ticket
          </p>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">{event.title}</h2>

          <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Date</p>
              <p className="font-semibold text-gray-800">{event.date}</p>
            </div>
            <div>
              <p className="text-gray-400">Time</p>
              <p className="font-semibold text-gray-800">{event.time}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-400">Venue</p>
              <p className="font-semibold text-gray-800">{event.venue}</p>
            </div>
            <div>
              <p className="text-gray-400">Seats</p>
              <p className="font-semibold text-gray-800">{state.seats.join(', ')}</p>
            </div>
            <div>
              <p className="text-gray-400">Total Paid</p>
              <p className="font-semibold text-purple-600">Rs. {state.total}</p>
            </div>
          </div>
        </div>

        {/* Dashed divider */}
        <div className="border-t-2 border-dashed border-gray-300 md:border-l-2 md:border-t-0" />

        {/* Right part: QR */}
        <div className="flex flex-col items-center justify-center bg-purple-50 p-6">
          <QRCodeSVG value={state.bookingId} size={120} />
          <p className="mt-3 text-xs text-gray-400">Booking ID</p>
          <p className="font-bold tracking-wider text-gray-800">{state.bookingId}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          onClick={() => window.print()}
          className="rounded-lg border-2 border-purple-600 px-6 py-3 font-semibold text-purple-600 hover:bg-purple-50"
        >
          🖨️ Print Ticket
        </button>
        <Link
          to="/my-bookings"
          className="rounded-lg bg-purple-600 px-6 py-3 text-center font-semibold text-white hover:bg-purple-700"
        >
          View My Bookings
        </Link>
        <Link
          to="/events"
          className="rounded-lg px-6 py-3 text-center font-semibold text-gray-600 hover:bg-gray-100"
        >
          Book Another Event
        </Link>
      </div>
    </div>
  )
}
