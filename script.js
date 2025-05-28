const apiKey = "e68f45a46dc1463f97575342252805";
const baseUrl = "https://api.weatherapi.com/v1";

let currentTempUnit = "C"; // 'C' or 'F'

// Convert 24-hour time to 12-hour am/pm format
function formatTime(timeStr) {
  const [date, time] = timeStr.split(' ');
  let [hour, minute] = time.split(':');
  hour = parseInt(hour);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

function toggleTempUnit() {
  currentTempUnit = currentTempUnit === "C" ? "F" : "C";
  // Re-fetch or re-render weather info based on current city input
  const city = document.getElementById("cityInput").value;
  if(city) {
    getWeather();
  } else {
    getCurrentLocationWeather();
  }
}

function getCurrentLocationWeather() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `${baseUrl}/forecast.json?key=${apiKey}&q=${lat},${lon}&days=1`;
      fetchAndDisplayWeather(url);
    },
    (error) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        default:
          alert("An unknown error occurred while retrieving location.");
          break;
      }
    }
  );
}

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `${baseUrl}/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=1`;
  fetchAndDisplayWeather(url);
}

async function fetchAndDisplayWeather(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      document.getElementById("weatherResult").innerText = data.error.message;
      return;
    }

    const current = data.current;
    const location = data.location;
    const hourly = data.forecast.forecastday[0].hour;

    const temp = currentTempUnit === "C" ? `${current.temp_c}°C` : `${current.temp_f}°F`;

    let html = `
      <p><strong>City:</strong> ${location.name}, ${location.country}</p>
      <p><strong>Temperature:</strong> ${temp}</p>
      <p><strong>Condition:</strong> ${current.condition.text}</p>
      <img src="${current.condition.icon}" alt="weather icon" />
      <p><strong>Wind Speed:</strong> ${current.wind_kph} kph</p>
      <p><strong>Humidity:</strong> ${current.humidity}%</p>
       <button id="toggleTempBtn">Show °${currentTempUnit === "C" ? "F" : "C"}</button>
      <h3>Hourly Forecast</h3>
    `;

    html += `<div class="hourly-container">`;

    hourly.forEach(hour => {
      const hourTemp = currentTempUnit === "C" ? `${hour.temp_c}°C` : `${hour.temp_f}°F`;
      html += `
        <div class="hour-box" title="${hour.condition.text}">
          <strong>${formatTime(hour.time)}</strong><br/>
          ${hourTemp}<br/>
          ${hour.condition.text}<br/>
          <img src="${hour.condition.icon}" alt="icon" />
        </div>
      `;
    });

    html += `</div>`;

    document.getElementById("weatherResult").innerHTML = html;

    document.getElementById("toggleTempBtn").addEventListener("click", toggleTempUnit);

  } catch (error) {
    document.getElementById("weatherResult").innerText = "Error fetching data.";
    console.error(error);
  }
}

// Keyboard Enter key support on city input
document.getElementById('cityInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    getWeather();
  }
});

// Format date, e.g., May 28, 2025
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

// Set today's date and quote
function setDateAndQuote() {
  const dateEl = document.getElementById('date');
  const quoteEl = document.getElementById('quote');

  const today = new Date();
  dateEl.textContent = `Today: ${formatDate(today)}`;

  const quotes = [
    "The best way to get started is to quit talking and begin doing.",
    "Don't watch the clock; do what it does. Keep going.",
    "Every moment is a fresh beginning.",
    "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "The future depends on what you do today."
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteEl.textContent = `Quote for the day: “${quotes[randomIndex]}”`;
}

// On page load
window.onload = () => {
  setDateAndQuote();
  getCurrentLocationWeather();
};
