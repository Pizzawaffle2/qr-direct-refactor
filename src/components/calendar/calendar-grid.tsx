'use client';

import * as React from 'react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { format, startOfMonth, endOfMonth, isSameMonth, isToday, addDays } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/input';
import { cn } from '@/lib/utils';
import { CalendarEvent } from '@/types/calendar-types';
import { Plus } from 'lucide-react';
import {
  ThemeFrame,
  DATE_DECORATIONS,
  getFrameTypeForDate,
  getDecorationForDate,
} from './calendar-frames';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from '@/components/UI/context-menu';

interface CalendarGridProps {
  month: number;
  year: number;
  events: CalendarEvent[];
  isEditing: boolean;
  onAddEvent: (event: CalendarEvent) => void;
  onUpdateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  onRemoveEvent: (id: string) => void;
  theme?: {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      border: string;
    };
  };
  settings: {
    firstDayOfWeek: 0 | 1; // 0 for Sunday, 1 for Monday
    showWeekNumbers: boolean;
    showHolidays: boolean;
    showLunarPhases: boolean;
  };
  onDateSelect: (date: Date) => void;
  onNextMonth: () => void;
  onPrevMonth: () => void;
}

function getDatesInRange(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  let currentDate = start;

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  return dates;
}

const DEFAULT_THEME = {
  colors: {
    primary: '#000000',
    secondary: '#000000',
    background: '#ffffff',
    text: '#000000',
    border: '#000000',
  },
};

export function CalendarGrid({
  month,
  year,
  events = [],
  isEditing = false,
  onAddEvent,
  onUpdateEvent,
  onRemoveEvent,
  theme = DEFAULT_THEME,
  settings,
  onDateSelect,
  onNextMonth,
  onPrevMonth,
}: CalendarGridProps) {
  // Memoize calendar dates calculation
  const calendarDates = useMemo(
    () => calculateCalendarDates(year, month, settings.firstDayOfWeek),
    [year, month, settings.firstDayOfWeek]
  );

  // Memoize weeks array
  const weeks = useMemo(() => {
    const result = [];
    for (let i = 0; i < calendarDates.length; i += 7) {
      result.push(calendarDates.slice(i, i + 7));
    }
    return result;
  }, [calendarDates]);

  // Get frame type
  const frameType = useMemo(() => getFrameTypeForDate(new Date(year, month)), [year, month]);

  // WeekdayHeader component
  function WeekdayHeader({ dates, theme = DEFAULT_THEME }: { dates: Date[]; theme: CalendarGridProps['theme'] }) {
    return (
      <div className="grid grid-cols-7 divide-x divide-border border-b">
        {dates.map((date, index) => (
          <div
            key={index}
            className="p-2 text-center text-sm font-medium"
            style={{ color: theme?.colors?.text || DEFAULT_THEME.colors.text }}
          >
            {format(date, 'EEE')}
          </div>
        ))}
      </div>
    );
  }

  return (
    <ThemeFrame
      type={frameType}
      cornerStyle={frameType === 'christmas' || frameType === 'autumn' ? frameType : undefined}
      className="overflow-hidden rounded-xl"
      color={theme?.colors?.primary || DEFAULT_THEME.colors.primary}
    >
      {/* Header */}
      <WeekdayHeader dates={weeks[0]} theme={theme} />

      {/* Grid */}
      <div className="grid grid-cols-7 divide-x divide-y divide-border">
        {weeks.map((week, weekIndex) => (
          <WeekRow
            key={`week-${weekIndex}`}
            week={week}
            weekNumber={weekIndex}
            showWeekNumbers={settings.showWeekNumbers}
            events={events}
            isEditing={isEditing}
            theme={theme}
            settings={settings}
            onAddEvent={onAddEvent}
            onUpdateEvent={onUpdateEvent}
            onRemoveEvent={onRemoveEvent}
            year={year}
            month={month}
          />
        ))}
      </div>
    </ThemeFrame>
  );
}

interface WeekRowProps {
  week: Date[];
  weekNumber: number;
  showWeekNumbers: boolean;
  events: CalendarEvent[];
  isEditing: boolean;
  theme?: CalendarGridProps['theme'];
  settings: CalendarGridProps['settings'];
  onAddEvent: (event: CalendarEvent) => void;
  onUpdateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  onRemoveEvent: (id: string) => void;
}

// Helper function to calculate calendar dates
function calculateCalendarDates(year: number, month: number, firstDayOfWeek: 0 | 1): Date[] {
  const monthStart = startOfMonth(new Date(year, month));
  const monthEnd = endOfMonth(monthStart);
  const dates = getDatesInRange(monthStart, monthEnd);

  const startDay = monthStart.getDay();
  const daysToPrefix = (startDay - firstDayOfWeek + 7) % 7;
  const prefixDates = Array.from({ length: daysToPrefix }, (_, i) =>
    new Date(year, month, -daysToPrefix + i + 1)
  );

  return [...prefixDates, ...dates];
}

function WeekRow({
  week,
  events,
  isEditing,
  theme,
  settings,
  onAddEvent,
  onUpdateEvent,
  onRemoveEvent,
  year,
  month,
}: WeekRowProps & { year: number; month: number }) {
  return (
    <>
      {week.map((date, dayIndex) => {
        const dayEvents = events.filter(
          (event) => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        );
        const isCurrentMonth = isSameMonth(date, new Date(year, month));
        const isHoliday = false; // Replace with actual holiday check if available
        const hasEvents = dayEvents.length > 0;
        const decoration = getDecorationForDate(date, isHoliday, hasEvents);

        return (
          <CalendarCell
            key={`day-${dayIndex}`}
            date={date}
            events={dayEvents}
            isEditing={isEditing}
            onAddEvent={onAddEvent}
            onUpdateEvent={onUpdateEvent}
            onRemoveEvent={onRemoveEvent}
            theme={theme}
            isCurrentMonth={isCurrentMonth}
            decoration={decoration}
          />
        );
      })}
    </>
  );
}

interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isEditing: boolean;
  onAddEvent: (event: CalendarEvent) => void;
  onUpdateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  onRemoveEvent: (id: string) => void;
  theme: CalendarGridProps['theme'];
  isCurrentMonth: boolean;
  decoration: keyof typeof DATE_DECORATIONS;
}

function CalendarCell({
  date,
  events,
  isEditing,
  onAddEvent,
  onUpdateEvent,
  onRemoveEvent,
  theme,
  isCurrentMonth,
  decoration,
}: CalendarCellProps) {
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '' });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAddingEvent && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingEvent]);

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) return;

    onAddEvent({
      id: crypto.randomUUID(),
      title: newEvent.title,
      date: date,
      type: 'event',
    });

    setNewEvent({ title: '' });
    setIsAddingEvent(false);
  };

  return (
    <div
      className={cn(
        'group relative min-h-[120px] p-2',
        'transition-colors duration-200',
        !isCurrentMonth && 'opacity-50',
        isToday(date) && 'bg-primary/5',
        isEditing && 'hover:bg-accent/5'
      )}
      style={{ backgroundColor: theme?.colors?.background || DEFAULT_THEME.colors.background }}
    >
      {/* Date number and add button */}
      <div className="flex items-center justify-between">
        <span
          className={cn('text-sm', isToday(date) && 'font-semibold')}
          style={{ color: theme?.colors?.text || DEFAULT_THEME.colors.text }}
        >
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

      {/* Decoration */}
      {decoration !== 'none' && (
        <div
          className="absolute right-1 top-1"
          dangerouslySetInnerHTML={{ __html: DATE_DECORATIONS[decoration] }}
          style={{ color: theme?.colors?.primary || DEFAULT_THEME.colors.primary }}
        />
      )}

      {/* Events list */}
      <div className="mt-1 space-y-1">
        <AnimatePresence>
          {events.map((event) => (
            <EventItem
              key={event.id}
              event={event}
              isEditing={isEditing}
              onUpdate={onUpdateEvent}
              onRemove={onRemoveEvent}
              theme={theme}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Add event modal */}
      {isAddingEvent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute inset-0 z-10 border bg-background p-2 shadow-lg"
          style={{
            backgroundColor: theme?.colors?.background || DEFAULT_THEME.colors.background,
            borderColor: theme?.colors?.border || DEFAULT_THEME.colors.border,
          }}
        >
          <Input
            ref={inputRef}
            value={newEvent.title}
            onChange={(e) => setNewEvent({ title: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newEvent.title.trim()) handleAddEvent();
              if (e.key === 'Escape') setIsAddingEvent(false);
            }}
            placeholder="Add event..."
            className="text-sm"
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsAddingEvent(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleAddEvent} disabled={!newEvent.title.trim()}>
              Add
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

interface EventItemProps {
  event: CalendarEvent;
  isEditing: boolean;
  onUpdate: (id: string, event: Partial<CalendarEvent>) => void;
  onRemove: (id: string) => void;
  theme: CalendarGridProps['theme'];
}

function EventItem({ event, isEditing, onUpdate, onRemove, theme }: EventItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group relative"
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className="cursor-default break-words rounded p-1 text-xs"
            style={{ backgroundColor: `${theme?.colors?.primary || DEFAULT_THEME.colors.primary}20` }}
          >
            {event.title}
          </div>
        </ContextMenuTrigger>
        {isEditing && (
          <ContextMenuContent>
            <ContextMenuItem
              onClick={() => {
                const newTitle = prompt('New title:', event.title);
                if (newTitle !== null) {
                  onUpdate(event.id, { title: newTitle });
                }
              }}
            >
              Edit
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => onRemove(event.id)}>Delete</ContextMenuItem>
          </ContextMenuContent>
        )}
      </ContextMenu>
    </motion.div>
  );
}

// Helper function to check if a date is a holiday
// function isHoliday(date: Date): boolean {
//   // Implement holiday checking logic here
//   return false;
// }

export default CalendarGrid;