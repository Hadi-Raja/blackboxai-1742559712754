import { useEffect, useRef } from 'react';

export default function LocationMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current) return;

    // Default center (can be updated based on user's location)
    const defaultCenter = { lat: 40.7128, lng: -74.0060 }; // New York City

    // Create map instance
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 13,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    // Example umbrella rental locations
    const locations = [
      { lat: 40.7128, lng: -74.0060, title: "Downtown Station" },
      { lat: 40.7580, lng: -73.9855, title: "Midtown Hub" },
      { lat: 40.7829, lng: -73.9654, title: "Upper East Side Point" }
    ];

    // Add markers for each location
    locations.forEach(location => {
      const marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: mapInstanceRef.current,
        title: location.title,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }
      });

      // Add click listener to marker
      marker.addListener('click', () => {
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-bold">${location.title}</h3>
              <p class="text-sm">Umbrellas available: 5</p>
              <button 
                class="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg text-sm"
                onclick="window.location.href='/rent?location=${location.title}'"
              >
                Rent Here
              </button>
            </div>
          `
        });
        infoWindow.open(mapInstanceRef.current, marker);
      });
    });

    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          mapInstanceRef.current.setCenter(userLocation);
          
          // Add user's location marker
          new window.google.maps.Marker({
            position: userLocation,
            map: mapInstanceRef.current,
            title: "Your Location",
            icon: {
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }
          });
        },
        () => {
          console.log("Error: The Geolocation service failed.");
        }
      );
    }
  };

  return (
    <div className="w-full h-[600px] relative">
      <div ref={mapRef} className="w-full h-full rounded-lg shadow-lg" />
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
        <h3 className="font-bold text-sm mb-2">Legend</h3>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-sm">Rental Location</span>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-sm">Your Location</span>
        </div>
      </div>
    </div>
  );
}