// src/components/calendar/calendar-grid.tsx
'use client';

import React, { useMemo } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addDays,
  getDay,
  isSameDay
} from 'date-fns';
import { CalendarEvent, CalendarSettings, CalendarTheme } from '@/types/calendar';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/input';
import { Textarea } from '@/components/UI/Textarea';
import { useDroppable } from '@dnd-kit/core';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarGridProps {
  month: number;
  year: number;
  events: CalendarEvent[];
  settings: CalendarSettings;
  theme: CalendarTheme;
  isEditing: boolean;
  onAddEvent: (event: CalendarEvent) => void;
  onRemoveEvent: (id: string) => void;
  onUpdateEvent: (event: CalendarEvent) => void;
}

function CalendarDay({
  date,
  events,
  isCurrentMonth,
  theme,
  isEditing,
  onAddEvent,
  onRemoveEvent,
  onUpdateEvent
}: {
  date: Date;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  theme: CalendarTheme;
  isEditing: boolean;
  onAddEvent: (event: CalendarEvent) => void;
  onRemoveEvent: (id: string) => void;
  onUpdateEvent: (event: CalendarEvent) => void;
}) {
  const [isAddingEvent, setIsAddingEvent] = React.useState(false);
  const [newEventTitle, setNewEventTitle] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { setNodeRef, isOver } = useDroppable({
    id: format(date, 'yyyy-MM-dd'),
    data: { type: 'calendar-day', date }
  });

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
      date,
      type: 'event',
      color: theme.colors.primary
    });

    setNewEventTitle('');
    setIsAddingEvent(false);
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'group relative min-h-[120px] p-2',
        'transition-all duration-200',
        !isCurrentMonth && 'opacity-50 dark:opacity-40',
        isToday(date) && 'bg-primary/5 dark:bg-primary/10',
        isEditing && 'hover:bg-accent/5 dark:hover:bg-accent/10',
        isOver && 'bg-primary/10 dark:bg-primary/20'
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn(
          'text-sm',
          isToday(date) && 'font-semibold text-primary'
        )}>
          {format(date, 'd')}
        </span>
        {isEditing && isCurrentMonth && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsAddingEvent(true)}
            className="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Plus className="h-3 w-3" />
          </Button>
        )}
      </div>

      <div className="mt-1 space-y-1">
        {events.map((event) => (
          <div
            key={event.id}
            className={cn(
              'group/event relative rounded-sm p-1.5',
              'hover:bg-accent/10 dark:hover:bg-accent/20',
              'ring-border dark:ring-border hover:ring-1'
            )}
            style={{
              backgroundColor: `${event.color}10`,
              borderLeftColor: event.color,
              borderLeftWidth: '2px'
            }}
          >
            <Textarea
              value={event.title}
              onChange={(e) => onUpdateEvent({
                ...event,
                title: e.target.value
              })}
              className="min-h-[20px] resize-none bg-transparent text-xs"
              placeholder="Add note..."
              disabled={!isEditing}
            />
            {isEditing && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveEvent(event.id)}
                className="absolute -right-1 -top-1 h-5 w-5 p-0 opacity-0 group-hover/event:opacity-100"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {isAddingEvent && (
        <div className="glass-card absolute inset-0 z-10 p-2">
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
}

export function CalendarGrid({
  month,
  year,
  events,
  settings,
  theme,
  isEditing,
  onAddEvent,
  onRemoveEvent,
  onUpdateEvent
}: CalendarGridProps) {
  const calendarDates = useMemo(() => {
    const monthStart = startOfMonth(new Date(year, month));
    const monthEnd = endOfMonth(monthStart);
    const startDate = addDays(monthStart, -getDay(monthStart) + (settings.firstDayOfWeek ?? 0));
    const endDate = addDays(monthEnd, (6 - getDay(monthEnd)) + (settings.firstDayOfWeek ?? 0));

    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [month, year, settings.firstDayOfWeek]);

  const weekDays = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (settings.firstDayOfWeek === 1) {
      days.push(days.shift()!);
    }
    return days;
  }, [settings.firstDayOfWeek]);

  return (
    <div className="glass-card overflow-hidden rounded-lg">
      <div className="grid grid-cols-7 border-b">
        {settings.showWeekNumbers && (
          <div className="p-2 text-center text-sm font-medium text-muted-foreground">
            Wk
          </div>
        )}
        {weekDays.map((day) => (
          <div
            key={day}
            className="border-l p-2 text-center text-sm font-medium first:border-l-0"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendarDates.map((date) => {
          const dayEvents = events.filter(event => 
            isSameDay(new Date(event.date), date)
          );

          return (
            <div 
              key={format(date, 'yyyy-MM-dd')}
              className="border-l border-t first:border-l-0"
            >
              <CalendarDay
                date={date}
                events={dayEvents}
                isCurrentMonth={isSameMonth(date, new Date(year, month))}
                theme={theme}
                isEditing={isEditing}
                onAddEvent={onAddEvent}
                onRemoveEvent={onRemoveEvent}
                onUpdateEvent={onUpdateEvent}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;