// src/components/calendar/month-grid.tsx
import React from 'react';
import {CalendarDay } from './calendar-day';
import type { WeatherData, CalendarEvent } from '@/types/calendar';

interface MonthGridProps {
  year: number;
  month: number;
  events: Record<number, CalendarEvent[]>;
  weather: Record<number, WeatherData>;
  onAddEvent: (day: number, event: CalendarEvent) => void;
  onRemoveEvent: (day: number, eventId: string) => void;
  onUpdateEvents: (day: number, events: CalendarEvent[]) => void;
  isEditing: boolean;
}

export const MonthGrid: React.FC<MonthGridProps> = ({
  year,
  month,
  events,
  weather,
  onAddEvent,
  onRemoveEvent,
  onUpdateEvents,
  isEditing,
}) => {
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthDays = [];

  for (let i = 0; i < firstDay; i++) {
    monthDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    monthDays.push(day);
  }

  return (
    <div className="month-grid grid grid-cols-7 gap-px bg-gray-200">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className="bg-gray-100 p-2 text-center text-sm font-medium">
          {day}
        </div>
      ))}
      {monthDays.map((day, idx) => (
        <div key={idx} className="bg-white">
          {day && (
            <CalendarDay
              onRemoveEvent={(eventId) => onRemoveEvent(day, eventId)}
              onUpdateEvents={(events) => onUpdateEvents(day, events)}
              weather={weather[day]}
              events={events[day] || []}
              onAddEvent={(event) => onAddEvent(day, event)}
              isEditing={isEditing}
            />
          )}
        </div>
      ))}
    </div>
  );
};
