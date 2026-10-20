import { Link } from 'react-router-dom'

export default function EventCard({ event }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="h-48 w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white">
          {event.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
        <p className="mt-1 text-sm text-gray-500">
          📅 {event.date} · {event.time}
        </p>
        <p className="text-sm text-gray-500">📍 {event.venue}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-purple-600">
            Rs. {event.price}
          </span>
          <Link
            to={`/events/${event.id}`}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}