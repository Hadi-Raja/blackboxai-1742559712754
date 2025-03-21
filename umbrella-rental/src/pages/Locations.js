import LocationMap from '../components/map/LocationMap';

export default function Locations() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Rental Locations</h1>
          <p className="mt-4 text-lg text-gray-600">
            Find umbrella rental stations near you. Click on a marker to see availability and rent an umbrella.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <LocationMap />
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Downtown Station",
                  address: "123 Main St, New York, NY 10001",
                  available: 5
                },
                {
                  name: "Midtown Hub",
                  address: "456 Park Ave, New York, NY 10022",
                  available: 3
                },
                {
                  name: "Upper East Side Point",
                  address: "789 5th Ave, New York, NY 10065",
                  available: 7
                }
              ].map((location) => (
                <div 
                  key={location.name}
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900">{location.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {location.available} umbrellas available
                    </span>
                    <button 
                      className="btn-primary text-sm"
                      onClick={() => window.location.href = `/rent?location=${encodeURIComponent(location.name)}`}
                    >
                      Rent Here
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}