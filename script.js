// Initialize Firebase (from your firebase-config.js)
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Booking Form Submission
const bookingForm = document.getElementById('bookingForm');
const successMsg = document.getElementById('successMsg');

bookingForm.addEventListener('submit', (e) => {
e.preventDefault();

const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const service = document.getElementById('service').value;
const location = document.getElementById('booking-location').value;

db.collection('bookings').add({
name,
email,
service,
location,
timestamp: firebase.firestore.FieldValue.serverTimestamp()
})
.then(() => {
successMsg.textContent = "Booking submitted successfully!";
bookingForm.reset();
})
.catch(err => {
console.error(err);
successMsg.textContent = "Error submitting booking. Try again.";
});
});

// Leaflet Map Initialization
const map = L.map('map').setView([37.85, -85.45], 11); // Center between areas

// Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19
}).addTo(map);

// Area Polygons (approximate, can refine later)
const areas = [
{ name: "Meade County", coords: [[37.95,-85.85],[37.95,-85.35],[37.6,-85.35],[37.6,-85.85]], color: "green" },
{ name: "Bullitt County", coords: [[37.98,-85.9],[37.98,-85.5],[37.55,-85.5],[37.55,-85.9]], color: "blue" },
{ name: "Radcliff", coords: [[37.82,-85.95],[37.82,-85.75],[37.78,-85.75],[37.78,-85.95]], color: "red" },
{ name: "Elizabethtown", coords: [[37.7,-85.9],[37.7,-85.7],[37.65,-85.7],[37.65,-85.9]], color: "orange" },
{ name: "Mt. Washington", coords: [[38.02,-85.55],[38.02,-85.45],[37.95,-85.45],[37.95,-85.55]], color: "purple" },
{ name: "Hillview", coords: [[38.05,-85.55],[38.05,-85.45],[38.0,-85.45],[38.0,-85.55]], color: "pink" }
];

areas.forEach(area => {
const polygon = L.polygon(area.coords, { color: area.color, fillOpacity: 0.3 }).addTo(map);
polygon.bindPopup(area.name);
polygon.on('click', () => {
document.getElementById('booking-location').value = area.name;
polygon.openPopup();
});
});
