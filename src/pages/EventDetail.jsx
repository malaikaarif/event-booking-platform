import { useParams, Link } from 'react-router-dom'
import { events } from '../data/events'

export default function EventDetail() {
  const { id } = useParams()
  const event = events.find((e) => e.id === Number(id))

  if (!event) {
    return (
      <div className="mt-20 text-center">
        <div className="text-6xl">😕</div>
        <h2 className="mt-3 text-2xl font-bold text-gray-700">Event not found</h2>
        <Link to="/events" className="mt-4 inline-block text-purple-600 hover:underline">
          ← Back to events
        </Link>
      </div>
    )
  }

  const related = events
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 2)

  const info = [
    { icon: '📅', label: 'Date', value: event.date },
    { icon: '⏰', label: 'Time', value: event.time },
    { icon: '📍', label: 'Venue', value: event.venue },
    { icon: '🏷️', label: 'Category', value: event.category },
  ]

  const reviews = [
    { name: 'Ayesha', rating: 5, text: 'Amazing experience. Well organized!' },
    { name: 'Ali', rating: 4, text: 'Great event. Seats were comfortable.' },
    { name: 'Sara', rating: 5, text: 'Loved every moment. Will book again.' },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/events" className="text-sm text-purple-600 hover:underline">
        ← Back to events
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-3">
        {/* Left side */}
        <div className="lg:col-span-2">
          <img
            src={event.image}
            alt={event.title}
            className="h-80 w-full rounded-xl object-cover shadow-md"
          />

          <span className="mt-6 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
            {event.category}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-gray-800">{event.title}</h1>

          <h2 className="mt-6 text-xl font-bold text-gray-800">About this event</h2>
          <p className="mt-2 text-gray-600">{event.description}</p>
          <p className="mt-2 text-gray-600">
            Doors open 30 minutes early. Please bring a valid ID and your ticket.
            Food and drinks will be available at the venue.
          </p>

          {/* Reviews */}
          <h2 className="mt-8 text-xl font-bold text-gray-800">Reviews</h2>
          <div className="mt-3 space-y-4">
            {reviews.map((r) => (
              <div key={r.name} className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">{r.name}</span>
                  <span className="text-yellow-500">
                    {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                  </span>
                </div>
                <p className="mt-1 text-gray-600">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: booking card */}
        <div className="h-fit rounded-xl bg-white p-6 shadow-lg lg:sticky lg:top-24">
          <p className="text-sm text-gray-500">Ticket price</p>
          <p className="text-3xl font-bold text-purple-600">Rs. {event.price}</p>

          <div className="mt-5 space-y-3 border-t pt-5">
            {info.map((i) => (
              <div key={i.label} className="flex items-start gap-3">
                <span className="text-xl">{i.icon}</span>
                <div>
                  <p className="text-xs text-gray-400">{i.label}</p>
                  <p className="font-medium text-gray-800">{i.value}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to={`/seats/${event.id}`}
            className="mt-6 block rounded-lg bg-purple-600 py-3 text-center font-semibold text-white hover:bg-purple-700"
          >
            Select Seats
          </Link>
        </div>
      </div>

      {/* Related events */}
      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-4 text-xl font-bold text-gray-800">You may also like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <Link
                key={e.id}
                to={`/events/${e.id}`}
                className="flex overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl"
              >
                <img src={e.image} alt={e.title} className="h-28 w-28 object-cover" />
                <div className="p-3">
                  <h3 className="font-bold text-gray-800">{e.title}</h3>
                  <p className="text-sm text-gray-500">{e.date}</p>
                  <p className="font-semibold text-purple-600">Rs. {e.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}