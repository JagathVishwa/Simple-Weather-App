# Simple Weather App

## Overview  
This is a Simple Weather App built using **HTML**, **CSS**, and **JavaScript** that fetches real-time weather data from the free [WeatherAPI.com](https://www.weatherapi.com/) API. The app allows users to search weather information by city name or get weather data for their current location using browser geolocation.

---

## Features  
- Search current weather by city name  
- Get weather info based on user’s current location  
- Toggle temperature units between Celsius (°C) and Fahrenheit (°F)  
- Display includes temperature, weather condition, wind speed, humidity, and hourly forecast  
- Shows date and motivational daily quotes  
- Responsive and clean UI design

---

## How It Works  
1. **User Input**: Enter a city name or use the "Use My Location" button to fetch weather.  
2. **API Request**: The app sends a fetch request to WeatherAPI’s `forecast.json` endpoint using the API key.  
3. **Data Parsing**: Parses the JSON response to extract current and hourly weather data.  
4. **Display**: Renders weather details and hourly forecast on the page.  
5. **Temperature Toggle**: Users can switch between Celsius and Fahrenheit units.

---

## Getting Started

### Prerequisites  
- Modern web browser with JavaScript enabled  
- Internet connection to fetch data from WeatherAPI

### Installation  
1. Clone or download the repository  
2. Open `index.html` in a browser

### Usage  
- Enter a city name and press "Get Weather" or press Enter  
- Or click "Use My Location" to fetch weather based on your GPS coordinates  
- Click the temperature toggle button to switch between °C and °F

---

## API Setup  

### How to get your API key:  
1. Visit [WeatherAPI.com](https://www.weatherapi.com/)  
2. Sign up for a free account  
3. Navigate to your dashboard to find your API key  

### Integrate API key:  
- Replace the `apiKey` variable in `script.js` with your own API key.  
```js
const apiKey = "YOUR_API_KEY_HERE";
