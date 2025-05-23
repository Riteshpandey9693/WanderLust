const key = mapApiKey; // Use the API key passed from the server

// Parse the coordinates and place name from the server-side variables
let coordinates = JSON.parse(coordinate); // Ensure this is passed as a JSON string
let placeName = place;

coordinates.reverse(); // Leaflet expects [latitude, longitude]

// Initialize the map
const map = L.map("map").setView(coordinates, 9); // Starting position
L.tileLayer(
  `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,
  {
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    crossOrigin: true,
  }
).addTo(map);

// Add a light pink radius
L.circle(coordinates, {
  color: "rgba(249, 205, 209,0.9)",
  fillColor: "#ffc0cb",
  fillOpacity: 0.4,
  radius: 25000, // 25km radius
}).addTo(map);

// Create a custom divIcon for the marker
const customIcon = L.divIcon({
  className: "custom-marker",
  html: `
    <div class="marker-wrapper">
      <div class="marker-icon">
        <span class="airbnb-logo"><i class="fa-brands fa-airbnb fa-lg"></i></span>
        <span class="home-logo"><i class="fa-solid fa-house"></i></span>
      </div>
      <div class="marker-tooltip">
        <p class="marker-note">Exact location provided after booking.</p>
        <h4>${placeName}</h4>
      </div>
    </div>
  `,
  iconSize: [40, 40], // Custom size
  iconAnchor: [20, 20], // Center bottom anchor
});

// Add the custom marker to the map
L.marker(coordinates, { icon: customIcon }).addTo(map);

// Add a geocoding control
L.control.maptilerGeocoding({ apiKey: key }).addTo(map);
