// src/components/calendar/holiday-display.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { CalendarEvent } from '@/types/calendar';
import { Button } from '@/components/UI/Button';

interface HolidayDisplayProps {
  month: number;
  year: number;
  onAddCustomHoliday: (holiday: CalendarEvent) => void;
}

interface Holiday {
  name: string;
  date: string;
}

const HolidayDisplay: React.FC<HolidayDisplayProps> = ({ month, year, onAddCustomHoliday }) => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHolidays = async () => {
      setLoading(true);
      try {
        // Replace this URL with a real API endpoint
        const response = await fetch(`/api/holidays?month=${month + 1}&year=${year}`);
        if (!response.ok) throw new Error('Failed to fetch holidays');
        const data = await response.json();
        setHolidays(data.holidays);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [month, year]);

  const handleAddHoliday = (holiday: Holiday) => {
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title: holiday.name,
      date: new Date(holiday.date),
      type: 'holiday',
    };
    onAddCustomHoliday(newEvent);
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Loading holidays...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Holidays</h3>
      {holidays.length === 0 ? (
        <p className="text-sm text-gray-500">No holidays found for this month</p>
      ) : (
        <ul className="space-y-2">
          {holidays.map((holiday) => (
            <li key={holiday.date} className="flex justify-between items-center">
              <div>
                <p className="font-medium text-base">{holiday.name}</p>
                <p className="text-sm text-gray-500">{new Date(holiday.date).toLocaleDateString()}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAddHoliday(holiday)}
              >
                Add to Calendar
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HolidayDisplay;
