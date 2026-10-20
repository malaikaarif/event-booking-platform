import { useState } from 'react'
import { events, categories } from '../data/events'
import EventCard from '../components/EventCard'

export default function Events() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('date')

  let filtered = events.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || e.category === category
    return matchSearch && matchCategory
  })

  if (sort === 'low') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sort === 'date') filtered = [...filtered].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800">All Events</h1>
      <p className="mt-1 text-gray-500">Find something you will love.</p>

      {/* Search and sort */}
      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-purple-500"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-purple-500"
        >
          <option value="date">Sort: Soonest</option>
          <option value="low">Sort: Price Low to High</option>
          <option value="high">Sort: Price High to Low</option>
        </select>
      </div>

      {/* Category buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={
              category === cat
                ? 'rounded-full bg-purple-600 px-5 py-2 text-white'
                : 'rounded-full border border-purple-300 bg-white px-5 py-2 text-purple-700 hover:bg-purple-100'
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="mt-6 text-sm text-gray-500">
        Showing {filtered.length} event{filtered.length !== 1 && 's'}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <div className="text-6xl">😕</div>
          <h3 className="mt-3 text-xl font-bold text-gray-700">No events found</h3>
          <p className="text-gray-500">Try a different search or category.</p>
        </div>
      )}
    </div>
  )
}