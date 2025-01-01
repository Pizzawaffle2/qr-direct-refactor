// src/components/calendar/weather-display.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/UI/Button';
import { Loader } from 'lucide-react';

interface WeatherDisplayProps {
  location: string;
}

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ location }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      // Replace this URL with a real API endpoint
      const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();
      setWeather({
        temperature: data.temperature,
        condition: data.condition,
        icon: data.icon,
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="text-sm text-gray-500">Weather data not available</div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <img src={weather.icon} alt={weather.condition} className="h-12 w-12" />
      <div>
        <h3 className="text-lg font-medium">{location}</h3>
        <p className="text-sm text-gray-500">{weather.condition}</p>
        <p className="text-lg font-bold">{weather.temperature}°C</p>
      </div>
      <Button size="sm" onClick={fetchWeather} className="ml-auto">
        Refresh
      </Button>
    </div>
  );
};

export default WeatherDisplay;
