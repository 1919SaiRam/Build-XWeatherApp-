// App.js
import React, { useState } from 'react';
import './App.css';

const API_KEY = 'b354ff978b7c4ee5a45141610241403';
const API_ENDPOINT = 'https://api.weatherapi.com/v1/current.json';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!city) return;
    setLoading(true);
    fetchWeatherData(city);
  };

  const fetchWeatherData = (city) => {
    fetch(`${API_ENDPOINT}?key=${API_KEY}&q=${city}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p className="loading-message">Loading data...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <p>Temperature: {weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <p>Humidity: {weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <p>Condition: {weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
