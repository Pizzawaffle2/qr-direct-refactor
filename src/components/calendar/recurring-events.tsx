// src/components/calendar/recurring-events.tsx
'use client';

import React, { useState } from 'react';
import { format, addDays, addWeeks, addMonths, addYears, isSameDay } from 'date-fns';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/Select';
import Switch from '@/components/UI/Switch';
import { Card } from '@/components/UI/Card';
import { Calendar } from '@/components/UI/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/UI/Popover';
import { CalendarEvent, RecurringEventProps, EventType } from '@/types/calendar';
import { Calendar as CalendarIcon, Repeat, X, AlertCircle } from 'lucide-react';

const FREQUENCY_OPTIONS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' }
];

const WEEKDAYS = [
  { value: 0, label: 'Sun', fullLabel: 'Sunday' },
  { value: 1, label: 'Mon', fullLabel: 'Monday' },
  { value: 2, label: 'Tue', fullLabel: 'Tuesday' },
  { value: 3, label: 'Wed', fullLabel: 'Wednesday' },
  { value: 4, label: 'Thu', fullLabel: 'Thursday' },
  { value: 5, label: 'Fri', fullLabel: 'Friday' },
  { value: 6, label: 'Sat', fullLabel: 'Saturday' }
];

export function createRecurringEvents(baseEvent: RecurringEventProps): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const {
    startDate,
    endDate,
    frequency,
    interval = 1,
    weekdays,
    monthDay,
    exceptions = [],
    occurrences,
    title,
    type,
    color
  } = baseEvent;

  // Calculate end date based on occurrences or endDate
  const maxDate = endDate || (occurrences
    ? addYears(startDate, 10) // Reasonable maximum
    : addYears(startDate, 1)); // Default to 1 year if no end specified

  let currentDate = startDate;
  let count = 0;

  while (currentDate <= maxDate && (!occurrences || count < occurrences)) {
    // Skip if date is in exceptions
    if (!exceptions.some(date => isSameDay(date, currentDate))) {
      switch (frequency) {
        case 'daily':
          events.push({
            id: crypto.randomUUID(),
            title,
            date: currentDate,
            type,
            color
          });
          currentDate = addDays(currentDate, interval);
          break;

        case 'weekly':
          if (weekdays && weekdays.length > 0) {
            weekdays.forEach(day => {
              const dayDate = addDays(currentDate, (day - currentDate.getDay() + 7) % 7);
              if (dayDate <= maxDate) {
                events.push({
                  id: crypto.randomUUID(),
                  title,
                  date: dayDate,
                  type,
                  color
                });
              }
            });
            currentDate = addWeeks(currentDate, interval);
          } else {
            events.push({
              id: crypto.randomUUID(),
              title,
              date: currentDate,
              type,
              color
            });
            currentDate = addWeeks(currentDate, interval);
          }
          break;

        case 'monthly':
          if (monthDay) {
            const targetDay = monthDay;
            const monthDate = new Date(currentDate);
            monthDate.setDate(targetDay);
            if (monthDate <= maxDate) {
              events.push({
                id: crypto.randomUUID(),
                title,
                date: monthDate,
                type,
                color
              });
            }
            currentDate = addMonths(currentDate, interval);
          } else {
            events.push({
              id: crypto.randomUUID(),
              title,
              date: currentDate,
              type,
              color
            });
            currentDate = addMonths(currentDate, interval);
          }
          break;

        case 'yearly':
          events.push({
            id: crypto.randomUUID(),
            title,
            date: currentDate,
            type,
            color
          });
          currentDate = addYears(currentDate, interval);
          break;
      }
      count++;
    } else {
      currentDate = addDays(currentDate, 1);
    }
  }

  return events;
}

interface RecurringEventFormProps {
  onSubmit: (events: CalendarEvent[]) => void;
  initialValues?: Partial<RecurringEventProps>;
}

export function RecurringEventForm({ onSubmit, initialValues }: RecurringEventFormProps) {
  const [values, setValues] = useState<RecurringEventProps>({
    startDate: new Date(),
    title: '',
    frequency: 'weekly',
    interval: 1,
    type: 'event',
    color: '#3B82F6',
    ...initialValues
  });

  const [showEndDate, setShowEndDate] = useState(false);
  const [showExceptions, setShowExceptions] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!values.title) {
      setError('Title is required');
      return;
    }

    try {
      const events = createRecurringEvents(values);
      onSubmit(events);
      // Reset form
      setValues({
        startDate: new Date(),
        title: '',
        frequency: 'weekly',
        interval: 1,
        type: 'event',
        color: '#3B82F6'
      });
      setError(null);
    } catch (err) {
      setError('Failed to create recurring events. Please check your inputs.');
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Repeat className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Recurring Event</h3>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-2 rounded">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* Basic Settings */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={values.title}
              onChange={(e) => setValues(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter event title"
            />
          </div>

          <div>
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(values.startDate, 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={values.startDate}
                  onSelect={(date) => date && setValues(prev => ({ ...prev, startDate: date }))}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Frequency</Label>
            <Select
              value={values.frequency}
              onValueChange={(val) => setValues(prev => ({ 
                ...prev, 
                frequency: val as RecurringEventProps['frequency']
              }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FREQUENCY_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Weekly Options */}
          {values.frequency === 'weekly' && (
            <div className="space-y-2">
              <Label>Repeat on</Label>
              <div className="flex flex-wrap gap-2">
                {WEEKDAYS.map((day) => (
                  <Button
                    key={day.value}
                    size="sm"
                    variant={values.weekdays?.includes(day.value) ? 'default' : 'outline'}
                    onClick={() => {
                      const weekdays = values.weekdays || [];
                      setValues(prev => ({
                        ...prev,
                        weekdays: weekdays.includes(day.value)
                          ? weekdays.filter(d => d !== day.value)
                          : [...weekdays, day.value]
                      }));
                    }}
                  >
                    {day.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Monthly Options */}
          {values.frequency === 'monthly' && (
            <div>
              <Label>Day of Month</Label>
              <Input
                type="number"
                min={1}
                max={31}
                value={values.monthDay || ''}
                onChange={(e) => setValues(prev => ({ 
                  ...prev, 
                  monthDay: parseInt(e.target.value) 
                }))}
              />
            </div>
          )}

          {/* Interval */}
          <div>
            <Label>Repeat every</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                min={1}
                value={values.interval}
                onChange={(e) => setValues(prev => ({ 
                  ...prev, 
                  interval: parseInt(e.target.value) || 1 
                }))}
                className="w-20"
              />
              <span className="text-sm text-gray-500">
                {values.frequency === 'daily' && 'days'}
                {values.frequency === 'weekly' && 'weeks'}
                {values.frequency === 'monthly' && 'months'}
                {values.frequency === 'yearly' && 'years'}
              </span>
            </div>
          </div>

          {/* End Settings */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Set End Date</Label>
              <Switch
                checked={showEndDate}
                onCheckedChange={setShowEndDate}
              />
            </div>

            {showEndDate && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {values.endDate ? format(values.endDate, 'PPP') : 'Pick an end date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={values.endDate}
                    onSelect={(date) => date && setValues(prev => ({ ...prev, endDate: date }))}
                    disabled={(date) => date < values.startDate}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Advanced Settings Toggle */}
          <div className="pt-2">
            <Button
              variant="ghost"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full justify-between"
            >
              Advanced Settings
              <span className={`transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </Button>
          </div>

          {/* Advanced Settings */}
          {showAdvanced && (
            <div className="space-y-4 pt-2">
              <div>
                <Label>Event Type</Label>
                <Select
                  value={values.type}
                  onValueChange={(val) => setValues(prev => ({ 
                    ...prev, 
                    type: val as EventType 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Color</Label>
                <Input
                  type="color"
                  value={values.color}
                  onChange={(e) => setValues(prev => ({ 
                    ...prev, 
                    color: e.target.value 
                  }))}
                  className="h-10"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={!values.title}
          >
            Create Recurring Event
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default RecurringEventForm;