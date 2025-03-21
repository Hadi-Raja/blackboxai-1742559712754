import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './pages/Home';
import Locations from './pages/Locations';
import Rent from './pages/Rent';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Placeholder components
const HowItWorks = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        How Coverly Works
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="text-blue-600 mb-6">
            <i className="fas fa-map-marker-alt text-4xl"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">1. Find a Location</h3>
          <p className="text-gray-600 leading-relaxed">
            Use our interactive map to find the nearest Coverly station. We have multiple locations across the city.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="text-blue-600 mb-6">
            <i className="fas fa-credit-card text-4xl"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">2. Rent & Pay</h3>
          <p className="text-gray-600 leading-relaxed">
            Choose your rental duration and complete a secure payment. We accept all major payment methods.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="text-blue-600 mb-6">
            <i className="fas fa-qrcode text-4xl"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">3. Pick Up & Return</h3>
          <p className="text-gray-600 leading-relaxed">
            Scan the QR code to unlock your umbrella. Return it to any Coverly station when you're done.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Profile = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Profile</h1>
      <div className="space-y-6">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
            <i className="fas fa-user text-4xl text-blue-600"></i>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Account Details</h3>
          <div className="space-y-3">
            <p className="text-gray-600">Member since: January 2024</p>
            <p className="text-gray-600">Last rental: 2 days ago</p>
            <p className="text-gray-600">Total rentals: 5</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Bookings = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Rentals</h1>
      <div className="space-y-4">
        <div className="border rounded-xl p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Downtown Station</h3>
              <p className="text-gray-600">Rental Duration: 2 hours</p>
              <p className="text-gray-500 text-sm">Started: Today, 2:30 PM</p>
            </div>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Active
            </span>
          </div>
        </div>
        <div className="border rounded-xl p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Central Park Station</h3>
              <p className="text-gray-600">Rental Duration: 3 hours</p>
              <p className="text-gray-500 text-sm">Completed: Yesterday, 4:15 PM</p>
            </div>
            <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/rent" element={
              <ProtectedRoute>
                <Rent />
              </ProtectedRoute>
            } />
            <Route path="/locations" element={
              <ProtectedRoute>
                <Locations />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/bookings" element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
