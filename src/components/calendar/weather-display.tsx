// src/components/calendar/weather-display.tsx
'use client';

import React from 'react';
import { WeatherData } from '@/types/calendar';
import { cn } from '@/lib/utils';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Wind,
  Loader2
} from 'lucide-react';

interface WeatherDisplayProps {
  weather: WeatherData;
  isLoading?: boolean;
  compact?: boolean;
  className?: string;
}

// Weather condition mapping to icons
const WEATHER_ICONS = {
  clear: Sun,
  cloudy: Cloud,
  rain: CloudRain,
  snow: CloudSnow,
  storm: CloudLightning,
  drizzle: CloudDrizzle,
  windy: Wind
} as const;

export function WeatherDisplay({
  weather,
  isLoading = false,
  compact = false,
  className
}: WeatherDisplayProps) {
  if (isLoading) {
    return (
      <div className={cn(
        "flex items-center justify-center text-gray-400",
        compact ? "h-6" : "h-8",
        className
      )}>
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  const WeatherIcon = WEATHER_ICONS[weather.condition as keyof typeof WEATHER_ICONS] || Cloud;

  return (
    <div className={cn(
      "flex items-center gap-1.5",
      compact ? "text-xs" : "text-sm",
      className
    )}>
      <WeatherIcon 
        className={cn(
          "text-gray-500",
          compact ? "h-4 w-4" : "h-5 w-5"
        )} 
      />
      {!compact && (
        <div className="flex items-center gap-1">
          <span className="font-medium">
            {Math.round(weather.temperature)}°
          </span>
          <span className="text-gray-500">
            {weather.condition}
          </span>
        </div>
      )}
    </div>
  );
}

// Mini version for calendar cells
export function WeatherCell({
  date,
  weather,
  isLoading,
  className
}: {
  date: Date;
  weather?: WeatherData;
  isLoading?: boolean;
  className?: string;
}) {
  if (!weather) return null;

  return (
    <div className={cn(
      "absolute top-1 right-1",
      className
    )}>
      <WeatherDisplay
        weather={weather}
        isLoading={isLoading}
        compact
      />
    </div>
  );
}

// Weekly forecast display
export function WeatherForecast({
  forecasts,
  isLoading,
  className
}: {
  forecasts: WeatherData[];
  isLoading?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(
      "grid grid-cols-7 gap-2",
      className
    )}>
      {forecasts.map((forecast, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-1 text-center"
        >
          <WeatherDisplay
            weather={forecast}
            isLoading={isLoading}
            compact
          />
          <div className="text-xs font-medium">
            {Math.round(forecast.temperature)}°
          </div>
        </div>
      ))}
    </div>
  );
}

// Detailed weather card
export function WeatherCard({
  weather,
  isLoading,
  className
}: {
  weather: WeatherData;
  isLoading?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(
      "rounded-lg border bg-white p-4",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-500">
            Current Weather
          </div>
          <div className="text-2xl font-bold">
            {Math.round(weather.temperature)}°
          </div>
          <div className="text-sm text-gray-500 capitalize">
            {weather.condition}
          </div>
        </div>
        
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
          <WeatherDisplay
            weather={weather}
            isLoading={isLoading}
            compact
          />
        </div>
      </div>
    </div>
  );
}

// Weather service types
export type WeatherCondition = keyof typeof WEATHER_ICONS;

export interface WeatherService {
  getCurrentWeather: (lat: number, lon: number) => Promise<WeatherData>;
  getForecast: (lat: number, lon: number, days: number) => Promise<WeatherData[]>;
}

// Example weather service implementation
export const mockWeatherService: WeatherService = {
  getCurrentWeather: async (lat: number, lon: number): Promise<WeatherData> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      temperature: 22,
      condition: 'clear'
    };
  },
  getForecast: async (lat: number, lon: number, days: number): Promise<WeatherData[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Array(days).fill(null).map(() => ({
      temperature: Math.round(15 + Math.random() * 10),
      condition: 'clear'
    }));
  }
};

export default WeatherDisplay;