import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { events } from '../data/events'

export default function Checkout() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    method: 'card',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })
  const [errors, setErrors] = useState({})

  // If someone opens /checkout directly, there is no booking data
  if (!state) {
    return (
      <div className="mt-20 text-center">
        <div className="text-6xl">🎟️</div>
        <h2 className="mt-3 text-2xl font-bold text-gray-700">No seats selected</h2>
        <p className="text-gray-500">Please pick an event and seats first.</p>
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
  const fee = state.seats.length * 50
  const grandTotal = state.total + fee

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const err = {}
    if (form.name.trim().length < 3) err.name = 'Enter your full name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Enter a valid email'
    if (!/^03\d{9}$/.test(form.phone)) err.phone = 'Use format 03001234567'

    if (form.method === 'card') {
      if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, '')))
        err.cardNumber = 'Card number must be 16 digits'
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry))
        err.expiry = 'Use format MM/YY'
      if (!/^\d{3}$/.test(form.cvv)) err.cvv = 'CVV must be 3 digits'
    }
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length === 0) {
      const bookingId = 'EVT' + Math.floor(100000 + Math.random() * 900000)
      navigate('/confirmation', {
        state: {
          bookingId,
          eventId: event.id,
          seats: state.seats,
          total: grandTotal,
          name: form.name,
          email: form.email,
        },
      })
    }
  }

  const inputClass = (field) =>
    `mt-1 w-full rounded-lg border bg-white px-4 py-3 outline-none focus:border-purple-500 ${
      errors[field] ? 'border-red-500' : 'border-gray-300'
    }`

  const methods = [
    { value: 'card', label: '💳 Card' },
    { value: 'jazzcash', label: '📱 JazzCash' },
    { value: 'easypaisa', label: '📱 Easypaisa' },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
      <p className="text-gray-500">Almost done. Fill in your details.</p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left: form */}
        <div className="space-y-8 lg:col-span-2">
          {/* Contact details */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-800">Your Details</h2>

            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Malaika Khan"
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
                    placeholder="you@example.com"
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
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>

            <div className="mt-4 flex flex-wrap gap-3">
              {methods.map((m) => (
                <button
                  type="button"
                  key={m.value}
                  onClick={() => setForm({ ...form, method: m.value })}
                  className={
                    form.method === m.value
                      ? 'rounded-lg border-2 border-purple-600 bg-purple-50 px-5 py-3 font-semibold text-purple-700'
                      : 'rounded-lg border-2 border-gray-200 px-5 py-3 text-gray-600 hover:border-purple-300'
                  }
                >
                  {m.label}
                </button>
              ))}
            </div>

            {form.method === 'card' ? (
              <div className="mt-5 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className={inputClass('cardNumber')}
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Expiry</label>
                    <input
                      name="expiry"
                      value={form.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={inputClass('expiry')}
                    />
                    {errors.expiry && <p className="mt-1 text-sm text-red-500">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">CVV</label>
                    <input
                      name="cvv"
                      value={form.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={3}
                      className={inputClass('cvv')}
                    />
                    {errors.cvv && <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-5 rounded-lg bg-purple-50 p-4 text-sm text-purple-700">
                You will get a payment request on your phone number after you confirm.
              </p>
            )}
          </div>
        </div>

        {/* Right: order summary */}
        <div className="h-fit rounded-xl bg-white p-6 shadow-lg lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>

          <div className="mt-4 flex gap-3">
            <img
              src={event.image}
              alt={event.title}
              className="h-20 w-20 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-bold text-gray-800">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.date} · {event.time}</p>
              <p className="text-sm text-gray-500">{event.venue}</p>
            </div>
          </div>

          <div className="mt-5 space-y-2 border-t pt-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Seats</span>
              <span className="font-semibold">{state.seats.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span>Tickets ({state.seats.length})</span>
              <span>Rs. {state.total}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>Rs. {fee}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <span className="font-semibold text-gray-700">Total</span>
            <span className="text-2xl font-bold text-purple-600">Rs. {grandTotal}</span>
          </div>

          <button
            type="submit"
            className="mt-5 w-full rounded-lg bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700"
          >
            Pay Rs. {grandTotal}
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">🔒 Secure checkout (demo only)</p>
        </div>
      </form>
    </div>
  )
}