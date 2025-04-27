'use client';

import { useState } from "react";

interface CurrentWeather {
  temp: number;
  description: string;
  icon: string;
  wind_speed: number;
  humidity: number;
  date: string;
}

interface ForecastWeather {
  date: string;
  temp: number;
  description: string;
  icon: string;
}

interface WeatherData {
  location: string;
  country: string;
  current: CurrentWeather;
  forecast: ForecastWeather[];
}

export default function Home() {
  const [city, setCity] = useState('');
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/weather?city=${city}&units=${units}`);
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.error('Failed to fetch weather', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-200 to-purple-300">
      <h1 className="text-4xl font-bold mb-6">Weather App 🌦</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input input-bordered"
        />
        <select
          value={units}
          onChange={(e) => setUnits(e.target.value as 'metric' | 'imperial')}
          className="select select-bordered"
        >
          <option value="metric">°C</option>
          <option value="imperial">°F</option>
        </select>
        <button onClick={fetchWeather} className="btn btn-primary">
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {weather && (
        <div className="card shadow-lg bg-white p-6 w-full max-w-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{weather.location}, {weather.country}</h2>
              <p className="text-gray-500">{weather.current.date}</p>
            </div>
            <img
              src={`http://openweathermap.org/img/wn/${weather.current.icon}@2x.png`}
              alt="weather icon"
              className="w-20"
            />
          </div>

          <div className="text-center my-6">
            <p className="text-5xl font-bold">{weather.current.temp}°</p>
            <p className="text-gray-700 capitalize">{weather.current.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-bold">Wind</p>
              <p>{weather.current.wind_speed} m/s</p>
            </div>
            <div>
              <p className="font-bold">Humidity</p>
              <p>{weather.current.humidity}%</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-6">Next 3 Days</h3>
          <div className="flex gap-4 mt-4">
            {weather.forecast.map((day, index) => (
              <div key={index} className="flex-1 text-center bg-blue-100 rounded-lg p-2">
                <p className="font-bold">{day.date}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt="forecast icon"
                  className="mx-auto w-12"
                />
                <p>{day.temp}°</p>
                <p className="text-xs capitalize">{day.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
