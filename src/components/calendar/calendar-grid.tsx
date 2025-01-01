'use client';

import React, { useMemo, useCallback } from 'react';
import {
  CalendarEvent,
  CalendarSettings,
  CalendarTheme,
  CalendarCell,
} from '@/types/calendar';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/input';
import { Textarea } from '@/components/UI/Textarea'; // Ensure this is defined or replace it
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  addDays,
  endOfMonth,
  format,
  getDay,
  isSameMonth,
  isToday,
  startOfMonth,
} from 'date-fns';

interface CalendarGridProps {
  month: number;
  year: number;
  events: CalendarEvent[];
  isEditing: boolean;
  onAddEvent: (event: CalendarEvent) => void;
  onUpdateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  onRemoveEvent: (id: string) => void;
  theme?: CalendarTheme;
  settings: CalendarSettings;
}

interface CalendarDayProps {
  cell: CalendarCell;
  theme?: CalendarTheme;
  isEditing: boolean;
  onAddEvent: (event: CalendarEvent) => void;
  onRemoveEvent: (id: string) => void;
  onUpdateEvent: (id: string, event: Partial<CalendarEvent>) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  cell,
  theme,
  isEditing,
  onAddEvent,
  onRemoveEvent,
  onUpdateEvent,
}) => {
  const [isAddingEvent, setIsAddingEvent] = React.useState(false);
  const [newEventTitle, setNewEventTitle] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isAddingEvent && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingEvent]);

  const handleAddEvent = () => {
    if (!newEventTitle.trim()) return;

    onAddEvent({
      id: crypto.randomUUID(),
      title: newEventTitle,
      date: cell.date,
      type: 'event',
    });

    setNewEventTitle('');
    setIsAddingEvent(false);
  };

  return (
    <div
      className={cn(
        'group min-h-[120px] p-2',
        !cell.isCurrentMonth && 'opacity-50',
        isToday(cell.date) && 'bg-blue-50',
        isEditing && 'hover:bg-gray-50'
      )}
      style={{ backgroundColor: theme?.colors?.background }}
    >
      <div className="flex justify-between">
        <span className="text-sm">{format(cell.date, 'd')}</span>
        {isEditing && cell.isCurrentMonth && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAddingEvent(true)}
            className="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Plus className="h-3 w-3" />
          </Button>
        )}
      </div>

      <div className="mt-1 space-y-1">
        {cell.events.map((event) => (
          <div
            key={event.id}
            className="relative rounded-sm bg-blue-50/50 p-1"
          >
            <Textarea
              value={event.title}
              onChange={(e) =>
                onUpdateEvent(event.id, { title: e.target.value })
              }
              className="min-h-[20px] resize-none bg-transparent text-xs"
              disabled={!isEditing}
            />
            {isEditing && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onRemoveEvent(event.id)}
                className="absolute -right-1 -top-1 h-5 w-5 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {isAddingEvent && (
        <div className="absolute inset-0 z-10 bg-white p-2 shadow-lg">
          <Input
            ref={inputRef}
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newEventTitle.trim()) handleAddEvent();
              if (e.key === 'Escape') setIsAddingEvent(false);
            }}
            placeholder="Add event..."
            className="text-sm"
          />
          <div className="mt-2 flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAddingEvent(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleAddEvent}
              disabled={!newEventTitle.trim()}
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const CalendarGrid: React.FC<CalendarGridProps> = ({
  month,
  year,
  events,
  isEditing,
  onAddEvent,
  onUpdateEvent,
  onRemoveEvent,
  theme,
  settings,
}) => {
  const cells = useMemo(() => {
    const firstDay = startOfMonth(new Date(year, month));
    const lastDay = endOfMonth(firstDay);
    const startDate = addDays(firstDay, -getDay(firstDay));
    const days: CalendarCell[] = [];

    let currentDate = startDate;
    while (currentDate <= lastDay || days.length % 7 !== 0) {
      days.push({
        date: currentDate,
        isCurrentMonth: isSameMonth(currentDate, firstDay),
        events: events.filter(
          (event) =>
            format(event.date, 'yyyy-MM-dd') ===
            format(currentDate, 'yyyy-MM-dd')
        ),
      });
      currentDate = addDays(currentDate, 1);
    }
    return days;
  }, [month, year, events]);

  return (
    <div className="grid grid-cols-7 divide-x divide-y">
      {cells.map((cell, index) => (
        <CalendarDay
          key={index}
          cell={cell}
          theme={theme}
          isEditing={isEditing}
          onAddEvent={onAddEvent}
          onRemoveEvent={onRemoveEvent}
          onUpdateEvent={onUpdateEvent}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;