import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { events } from '../data/events'

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const seatsPerRow = 10
const maxSeats = 6

// Some seats are already booked (fixed pattern, so it never changes)
const isBooked = (rowIndex, n) => (rowIndex * 7 + n * 3) % 5 === 0

export default function SeatSelection() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = events.find((e) => e.id === Number(id))
  const [selected, setSelected] = useState([])

  if (!event) {
    return (
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Event not found</h2>
        <Link to="/events" className="text-purple-600 hover:underline">
          ← Back to events
        </Link>
      </div>
    )
  }

  const vipPrice = Math.round(event.price * 1.5)
  const priceOf = (seatId) => (['A', 'B'].includes(seatId[0]) ? vipPrice : event.price)
  const total = selected.reduce((sum, s) => sum + priceOf(s), 0)

  const toggleSeat = (seatId) => {
    if (selected.includes(seatId)) {
      setSelected(selected.filter((s) => s !== seatId))
    } else if (selected.length < maxSeats) {
      setSelected([...selected, seatId])
    }
  }

  const handleContinue = () => {
    navigate('/checkout', {
      state: { eventId: event.id, seats: selected, total },
    })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to={`/events/${event.id}`} className="text-sm text-purple-600 hover:underline">
        ← Back to event
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-gray-800">Select Your Seats</h1>
      <p className="text-gray-500">
        {event.title} · {event.date} · {event.time}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Seat map */}
        <div className="overflow-x-auto rounded-xl bg-white p-6 shadow-md lg:col-span-2">
          {/* Stage */}
          <div className="mx-auto mb-8 w-3/4 rounded-b-3xl bg-gradient-to-b from-purple-600 to-purple-400 py-3 text-center text-sm font-semibold tracking-widest text-white">
            STAGE
          </div>

          {/* Rows */}
          <div className="flex min-w-max flex-col items-center gap-2">
            {rows.map((row, rowIndex) => (
              <div key={row} className="flex items-center gap-2">
                <span className="w-6 text-sm font-semibold text-gray-400">{row}</span>
                {Array.from({ length: seatsPerRow }, (_, i) => {
                  const n = i + 1
                  const seatId = `${row}${n}`
                  const booked = isBooked(rowIndex, n)
                  const isSelected = selected.includes(seatId)
                  const isVip = rowIndex < 2

                  let style = 'bg-gray-200 text-gray-700 hover:bg-purple-200'
                  if (isVip) style = 'bg-yellow-100 text-yellow-800 hover:bg-yellow-300'
                  if (isSelected) style = 'bg-purple-600 text-white'
                  if (booked) style = 'cursor-not-allowed bg-gray-400 text-gray-100'

                  return (
                    <button
                      key={seatId}
                      disabled={booked}
                      onClick={() => toggleSeat(seatId)}
                      title={seatId}
                      className={`h-9 w-9 rounded-t-lg text-xs font-medium transition ${style} ${
                        n === 5 ? 'mr-6' : ''
                      }`}
                    >
                      {n}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded bg-gray-200" /> Available
            </div>
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded bg-yellow-100" /> VIP (Rows A, B)
            </div>
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded bg-purple-600" /> Selected
            </div>
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded bg-gray-400" /> Booked
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl bg-white p-6 shadow-lg lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-gray-800">Booking Summary</h2>

          <div className="mt-4 space-y-1 text-sm text-gray-600">
            <p>Regular seat: Rs. {event.price}</p>
            <p>VIP seat: Rs. {vipPrice}</p>
            <p className="text-xs text-gray-400">Max {maxSeats} seats per booking</p>
          </div>

          <div className="mt-5 border-t pt-4">
            <p className="text-sm text-gray-500">Selected seats</p>
            {selected.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {selected.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-gray-400">No seats selected yet</p>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between border-t pt-4">
            <span className="text-gray-600">Total</span>
            <span className="text-2xl font-bold text-purple-600">Rs. {total}</span>
          </div>

          <button
            onClick={handleContinue}
            disabled={selected.length === 0}
            className="mt-5 w-full rounded-lg bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}