import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="px-4 py-24 text-center">
      <h1 className="text-8xl font-extrabold text-purple-600">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-gray-800">Page not found</h2>
      <p className="mt-2 text-gray-500">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-purple-600 px-8 py-3 font-semibold text-white hover:bg-purple-700"
      >
        Go Home
      </Link>
    </div>
  )
}