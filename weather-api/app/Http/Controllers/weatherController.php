<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $city = $request->query('city');
        $units = $request->query('units', 'metric'); // default to Celsius

        if (!$city) {
            return response()->json(['error' => 'City parameter is required'], 400);
        }

        $apiKey = env('OPENWEATHERMAP_API_KEY');

        // 1. Get coordinates using Geocoding API
        $geoResponse = Http::get('http://api.openweathermap.org/geo/1.0/direct', [
            'q' => $city,
            'limit' => 1,
            'appid' => $apiKey,
        ]);

        if ($geoResponse->failed() || empty($geoResponse->json())) {
            return response()->json(['error' => 'Location not found'], 404);
        }

        $geoData = $geoResponse->json()[0];
        $lat = $geoData['lat'];
        $lon = $geoData['lon'];

        // 2. Get weather using One Call API
        $weatherResponse = Http::get('https://api.openweathermap.org/data/2.5/onecall', [
            'lat' => $lat,
            'lon' => $lon,
            'exclude' => 'minutely,hourly,alerts',
            'appid' => $apiKey,
            'units' => $units,
        ]);

        if ($weatherResponse->failed()) {
            return response()->json(['error' => 'Failed to fetch weather data'], 500);
        }

        $weatherData = $weatherResponse->json();

        // 3. Structure the response
        $response = [
            'location' => $geoData['name'] ?? $city,
            'country' => $geoData['country'] ?? '',
            'current' => [
                'temp' => $weatherData['current']['temp'],
                'description' => $weatherData['current']['weather'][0]['description'],
                'icon' => $weatherData['current']['weather'][0]['icon'],
                'wind_speed' => $weatherData['current']['wind_speed'],
                'humidity' => $weatherData['current']['humidity'],
                'date' => date('l, F j', $weatherData['current']['dt']),
            ],
            'forecast' => array_slice(array_map(function ($day) {
                return [
                    'date' => date('l', $day['dt']),
                    'temp' => $day['temp']['day'],
                    'description' => $day['weather'][0]['description'],
                    'icon' => $day['weather'][0]['icon'],
                ];
            }, $weatherData['daily']), 1, 3) // Next 3 days
        ];

        return response()->json($response);
    }
}
