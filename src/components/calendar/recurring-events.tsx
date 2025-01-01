// src/components/calendar/recurring-events.tsx
'use client';

import React, { useState } from 'react';
import { CalendarEvent } from '@/types/calendar';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/Select';

interface RecurringEventsProps {
  onAddRecurringEvent: (event: CalendarEvent) => void;
}

const RECURRENCE_OPTIONS = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
];

const RecurringEvents: React.FC<RecurringEventsProps> = ({ onAddRecurringEvent }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [recurrence, setRecurrence] = useState('daily');
  const [endDate, setEndDate] = useState('');

  const handleAddRecurringEvent = () => {
    if (!title || !startDate || !recurrence) return;

    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title,
      date: new Date(startDate),
      type: 'event',
      description: `Repeats ${recurrence}`,
    };

    onAddRecurringEvent(newEvent);
    setTitle('');
    setStartDate('');
    setRecurrence('daily');
    setEndDate('');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Add Recurring Event</h3>
      <div className="space-y-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
        />
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <Select
          value={recurrence}
          onValueChange={(val) => setRecurrence(val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select recurrence" />
          </SelectTrigger>
          <SelectContent>
            {RECURRENCE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date (optional)"
        />
      </div>
      <Button onClick={handleAddRecurringEvent} className="w-full">
        Add Recurring Event
      </Button>
    </div>
  );
};

export default RecurringEvents;
