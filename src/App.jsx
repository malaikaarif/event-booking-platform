import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import SeatSelection from './pages/SeatSelection'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import Login from './pages/Login'
import MyBookings from './pages/MyBookings'
import Profile from './pages/Profile'
import Footer from './components/Footer'

export default function App() {
    return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/seats/:id" element={<SeatSelection />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}