import { Link } from 'react-router-dom'
import { events, categories } from '../data/events'
import EventCard from '../components/EventCard'

export default function Home() {
  const featured = events.slice(0, 4)

  const steps = [
    { icon: '🔍', title: 'Find an Event', text: 'Browse music, tech, comedy, sports, and more.' },
    { icon: '💺', title: 'Pick Your Seat', text: 'Choose the exact seats you like.' },
    { icon: '🎟️', title: 'Get Your Ticket', text: 'Pay and get your ticket instantly.' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-600 px-4 py-20 text-center text-white">
        <h1 className="text-4xl font-extrabold md:text-6xl">
          Book Your Next Experience
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-purple-100">
          Discover the best events near you. Pick your seat. Book in seconds.
        </p>

        <div className="mx-auto mt-8 flex max-w-xl overflow-hidden rounded-lg bg-white">
          <input
            type="text"
            placeholder="Search events..."
            className="flex-1 px-4 py-3 text-gray-800 outline-none"
          />
          <Link
            to="/events"
            className="bg-yellow-400 px-6 py-3 font-semibold text-gray-900 hover:bg-yellow-500"
          >
            Search
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              to="/events"
              className="rounded-full border border-purple-300 bg-white px-5 py-2 text-purple-700 hover:bg-purple-600 hover:text-white"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured events */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Featured Events</h2>
          <Link to="/events" className="text-purple-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-gray-800">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.title} className="rounded-xl bg-gray-50 p-6 text-center shadow-sm">
                <div className="text-5xl">{s.icon}</div>
                <h3 className="mt-3 text-lg font-bold text-gray-800">{s.title}</h3>
                <p className="mt-1 text-gray-500">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Ready to go out?</h2>
        <p className="mt-2 text-gray-500">Create a free account and book your first event.</p>
        <Link
          to="/login"
          className="mt-6 inline-block rounded-lg bg-purple-600 px-8 py-3 font-semibold text-white hover:bg-purple-700"
        >
          Get Started
        </Link>
      </section>
    </div>
  )
}