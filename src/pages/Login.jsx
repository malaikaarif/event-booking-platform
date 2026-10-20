import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [errors, setErrors] = useState({})

  const isLogin = mode === 'login'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const switchMode = (newMode) => {
    setMode(newMode)
    setErrors({})
  }

  const validate = () => {
    const err = {}
    if (!isLogin && form.name.trim().length < 3) err.name = 'Enter your full name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Enter a valid email'
    if (form.password.length < 6) err.password = 'Password must be at least 6 characters'
    if (!isLogin && form.confirm !== form.password) err.confirm = 'Passwords do not match'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length === 0) {
      // Demo only: save a fake user, then go to profile
      const user = {
        name: isLogin ? form.email.split('@')[0] : form.name,
        email: form.email,
      }
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/profile')
    }
  }

  const inputClass = (field) =>
    `mt-1 w-full rounded-lg border bg-white px-4 py-3 outline-none focus:border-purple-500 ${
      errors[field] ? 'border-red-500' : 'border-gray-300'
    }`

  return (
    <div className="mx-auto grid min-h-[80vh] max-w-5xl overflow-hidden px-4 py-10 md:grid-cols-2">
      {/* Left: branding */}
      <div className="hidden flex-col justify-center rounded-l-2xl bg-gradient-to-br from-purple-700 to-indigo-600 p-10 text-white md:flex">
        <h2 className="text-4xl font-extrabold">Evento</h2>
        <p className="mt-3 text-lg text-purple-100">
          Discover events. Pick your seat. Book in seconds.
        </p>
        <ul className="mt-8 space-y-3 text-purple-100">
          <li>✓ Hundreds of events near you</li>
          <li>✓ Choose your exact seat</li>
          <li>✓ Instant e-tickets with QR code</li>
        </ul>
      </div>

      {/* Right: form */}
      <div className="rounded-2xl bg-white p-8 shadow-xl md:rounded-l-none">
        {/* Toggle */}
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={
              isLogin
                ? 'flex-1 rounded-md bg-white py-2 font-semibold text-purple-600 shadow'
                : 'flex-1 py-2 text-gray-500'
            }
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => switchMode('signup')}
            className={
              !isLogin
                ? 'flex-1 rounded-md bg-white py-2 font-semibold text-purple-600 shadow'
                : 'flex-1 py-2 text-gray-500'
            }
          >
            Sign Up
          </button>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-800">
          {isLogin ? 'Welcome back 👋' : 'Create your account'}
        </h1>
        <p className="text-sm text-gray-500">
          {isLogin ? 'Login to see your bookings.' : 'It takes less than a minute.'}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {!isLogin && (
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
          )}

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
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className={inputClass('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-purple-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                name="confirm"
                type={showPassword ? 'text' : 'password'}
                value={form.confirm}
                onChange={handleChange}
                placeholder="Repeat your password"
                className={inputClass('confirm')}
              />
              {errors.confirm && <p className="mt-1 text-sm text-red-500">{errors.confirm}</p>}
            </div>
          )}

          {isLogin && (
            <div className="text-right">
              <Link to="/login" className="text-sm text-purple-600 hover:underline">
                Forgot password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3 text-sm text-gray-400">
          <div className="h-px flex-1 bg-gray-200" />
          or continue with
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Social buttons (demo only) */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="rounded-lg border border-gray-300 py-2 font-medium text-gray-700 hover:bg-gray-50"
          >
            🌐 Google
          </button>
          <button
            type="button"
            className="rounded-lg border border-gray-300 py-2 font-medium text-gray-700 hover:bg-gray-50"
          >
            📘 Facebook
          </button>
        </div>
      </div>
    </div>
  )
}