import React, { useState } from 'react';
import { Cloud, Sun, Search, Wind, Droplets, Thermometer } from 'lucide-react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Free API key for demo purposes

  const getWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (data.cod === '404') {
        setError('City not found. Please try again.');
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center mb-8">
          <Sun className="text-yellow-500 w-10 h-10 mr-2" />
          <Cloud className="text-blue-500 w-10 h-10" />
          <h1 className="text-3xl font-bold text-gray-800 ml-3">WeatherNow</h1>
        </div>

        <form onSubmit={getWeather} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {loading && (
          <div className="text-center text-gray-600">
            Loading weather data...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 mb-4">
            {error}
          </div>
        )}

        {weather && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {weather.name}, {weather.sys.country}
            </h2>
            
            <div className="flex justify-center mb-6">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="w-24 h-24"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-lg">
                <Thermometer className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-xl font-bold text-gray-800">
                  {Math.round(weather.main.temp)}°C
                </p>
                <p className="text-sm text-gray-600">Temperature</p>
              </div>
              
              <div className="bg-blue-100 p-4 rounded-lg">
                <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-xl font-bold text-gray-800">
                  {weather.main.humidity}%
                </p>
                <p className="text-sm text-gray-600">Humidity</p>
              </div>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg mb-4">
              <Wind className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-800">
                {Math.round(weather.wind.speed)} m/s
              </p>
              <p className="text-sm text-gray-600">Wind Speed</p>
            </div>

            <p className="text-lg text-gray-800 capitalize">
              {weather.weather[0].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;