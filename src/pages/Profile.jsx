import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const savedUser = JSON.parse(localStorage.getItem('user') || 'null')
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')

  const [form, setForm] = useState({
    name: savedUser?.name || '',
    email: savedUser?.email || '',
    phone: savedUser?.phone || '',
    city: savedUser?.city || '',
  })
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState({})

  // Not logged in
  if (!savedUser) {
    return (
      <div className="mt-20 text-center">
        <div className="text-6xl">🔒</div>
        <h2 className="mt-3 text-2xl font-bold text-gray-700">You are not logged in</h2>
        <p className="text-gray-500">Please login to see your profile.</p>
        <Link
          to="/login"
          className="mt-4 inline-block rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
        >
          Go to Login
        </Link>
      </div>
    )
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSaved(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const err = {}
    if (form.name.trim().length < 3) err.name = 'Enter your full name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Enter a valid email'
    if (form.phone && !/^03\d{9}$/.test(form.phone)) err.phone = 'Use format 03001234567'
    setErrors(err)

    if (Object.keys(err).length === 0) {
      localStorage.setItem('user', JSON.stringify(form))
      setSaved(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const initials = form.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const inputClass = (field) =>
    `mt-1 w-full rounded-lg border bg-white px-4 py-3 outline-none focus:border-purple-500 ${
      errors[field] ? 'border-red-500' : 'border-gray-300'
    }`

  const links = [
    { icon: '🎟️', label: 'My Bookings', to: '/my-bookings' },
    { icon: '🔍', label: 'Browse Events', to: '/events' },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
      <p className="text-gray-500">Manage your account details.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left: profile card */}
        <div className="h-fit rounded-xl bg-white p-6 text-center shadow-md">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 text-3xl font-bold text-white">
            {initials || '?'}
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-800">{form.name}</h2>
          <p className="text-sm text-gray-500">{form.email}</p>

          <div className="mt-5 grid grid-cols-2 gap-3 border-t pt-5">
            <div>
              <p className="text-2xl font-bold text-purple-600">{bookings.length}</p>
              <p className="text-xs text-gray-400">Bookings</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {bookings.reduce((sum, b) => sum + b.seats.length, 0)}
              </p>
              <p className="text-xs text-gray-400">Seats</p>
            </div>
          </div>

          <div className="mt-5 space-y-2 border-t pt-5 text-left">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-purple-50"
              >
                <span>{l.icon}</span> {l.label}
              </Link>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className="mt-5 w-full rounded-lg border border-red-300 py-2 font-semibold text-red-500 hover:bg-red-50"
          >
            Logout
          </button>
        </div>

        {/* Right: edit form */}
        <form
          onSubmit={handleSave}
          className="rounded-xl bg-white p-6 shadow-md lg:col-span-2"
        >
          <h2 className="text-xl font-bold text-gray-800">Edit Details</h2>

          {saved && (
            <div className="mt-4 rounded-lg bg-green-100 p-3 text-sm font-medium text-green-700">
              ✓ Your profile was saved.
            </div>
          )}

          <div className="mt-5 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass('name')}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass('email')}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="03001234567"
                  className={inputClass('phone')}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">City</label>
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className={inputClass('city')}
              >
                <option value="">Select your city</option>
                <option>Lahore</option>
                <option>Karachi</option>
                <option>Islamabad</option>
                <option>Faisalabad</option>
                <option>Sahiwal</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 rounded-lg bg-purple-600 px-8 py-3 font-semibold text-white hover:bg-purple-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}