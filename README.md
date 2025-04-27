# weather-app
# Weather App 🌦️

A simple and beautiful decoupled Weather Application built with:
- **Next.js** (Frontend, TypeScript, TailwindCSS with RippleUI)
- **Laravel** (Backend API)
- **OpenWeatherMap API** (Weather Data Source)

This project allows users to search for a city, view the current weather, switch between Celsius and Fahrenheit, and see the 3-day weather forecast, complete with icons, wind, and humidity information.

---

## ✨ Features
- 🔎 Search for weather by city name (using OpenWeatherMap Geocoding API)
- 🌡 Switch between °C and °F
- 🌤️ Current weather display (temperature, weather icon, description)
- 📅 Forecast for the next 3 days
- 💨 Wind and humidity information
- 🖌️ Beautiful UI built with TailwindCSS and RippleUI components
- ⚡ Fully decoupled architecture (Next.js Frontend + Laravel Backend)

---

## 📦 Technologies Used
- **Frontend:** Next.js (TypeScript), TailwindCSS, RippleUI
- **Backend:** Laravel 11 (HTTP Client)
- **APIs:** OpenWeatherMap Geocoding and OneCall APIs

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Composer
- PHP (v8.1+)
- MySQL or any basic web server (only if you deploy online)
- OpenWeatherMap API key (free at [OpenWeatherMap](https://openweathermap.org/api))

---

## 🛠 Installation Instructions

### Backend (Laravel API)

```bash
git clone https://github.com/yourname/weather-api.git
cd weather-api
composer install
cp .env.example .env
php artisan key:generate
