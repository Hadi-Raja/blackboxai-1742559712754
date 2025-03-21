import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Rent() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [rentalData, setRentalData] = useState({
    location: searchParams.get('location') || '',
    duration: '1',
    paymentMethod: 'card',
  });

  useEffect(() => {
    // Update location if it changes in URL
    const locationParam = searchParams.get('location');
    if (locationParam) {
      setRentalData(prev => ({ ...prev, location: locationParam }));
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRentalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {['Location', 'Duration', 'Payment', 'QR Code'].map((label, index) => (
              <div 
                key={label}
                className={`flex flex-col items-center ${index < step ? 'text-primary' : 'text-gray-400'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${index < step ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-sm">{label}</span>
              </div>
            ))}
          </div>

          {/* Step 1: Location Confirmation */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Confirm Location</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Rental Location
                </label>
                <select
                  name="location"
                  value={rentalData.location}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">Select a location</option>
                  <option value="Downtown Station">Downtown Station</option>
                  <option value="Midtown Hub">Midtown Hub</option>
                  <option value="Upper East Side Point">Upper East Side Point</option>
                </select>
              </div>
              <button onClick={handleSubmit} className="btn-primary w-full">
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Duration Selection */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Select Duration</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Rental Duration
                </label>
                <select
                  name="duration"
                  value={rentalData.duration}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="1">1 Day ($5)</option>
                  <option value="2">2 Days ($9)</option>
                  <option value="3">3 Days ($12)</option>
                  <option value="7">1 Week ($25)</option>
                </select>
              </div>
              <button onClick={handleSubmit} className="btn-primary w-full">
                Continue to Payment
              </button>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={rentalData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="text-primary"
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wallet"
                      checked={rentalData.paymentMethod === 'wallet'}
                      onChange={handleInputChange}
                      className="text-primary"
                    />
                    <span>Digital Wallet</span>
                  </label>
                </div>
              </div>
              <button onClick={handleSubmit} className="btn-primary w-full">
                Complete Payment
              </button>
            </div>
          )}

          {/* Step 4: QR Code */}
          {step === 4 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Pick Up!</h2>
              <div className="bg-gray-100 p-8 rounded-lg mb-4">
                <div className="w-48 h-48 mx-auto bg-white p-4 rounded-lg shadow-inner">
                  {/* Placeholder for QR Code */}
                  <div className="w-full h-full border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                    QR Code
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Scan this QR code at the {rentalData.location} station to get your umbrella.
              </p>
              <button 
                onClick={() => window.location.href = '/bookings'} 
                className="btn-secondary"
              >
                View My Bookings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}