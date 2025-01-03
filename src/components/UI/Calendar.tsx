'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, DayPickerProps } from 'react-day-picker';
import type { DateRange } from 'react-day-picker';
import { buttonVariants } from '@/components/UI/Button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

export interface CalendarSettings {
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showWeekNumbers: boolean;
  theme: {
    colors: ThemeColors;
  };
  locale?: Locale;
  weekdayFormat?: 'narrow' | 'short' | 'long';
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  events?: Array<{
    date: Date;
    title: string;
    type?: 'holiday' | 'event' | 'reminder';
  }>;
}

export type CalendarProps = DayPickerProps & {
  settings?: CalendarSettings;
  onKeyboardNavigation?: (date: Date) => void;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  settings,
  onKeyboardNavigation,
  ...props
}: CalendarProps) {
  const [focusedDate, setFocusedDate] = React.useState<Date>();

  const handleKeyDown = (e: React.KeyboardEvent, currentDate: Date) => {
    let newDate = new Date(currentDate);
    
    switch(e.key) {
      case 'ArrowLeft':
        newDate.setDate(currentDate.getDate() - 1);
        break;
      case 'ArrowRight':
        newDate.setDate(currentDate.getDate() + 1);
        break;
      case 'ArrowUp':
        newDate.setDate(currentDate.getDate() - 7);
        break;
      case 'ArrowDown':
        newDate.setDate(currentDate.getDate() + 7);
        break;
      default:
        return;
    }

    e.preventDefault();
    setFocusedDate(newDate);
    onKeyboardNavigation?.(newDate);
  };

  const modifiers = React.useMemo(() => ({
    highlighted: (date: Date): boolean => 
      settings?.events?.some(event => 
        event.date.toDateString() === date.toDateString()
      ) ?? false,
    disabled: (date: Date): boolean => {
      if (settings?.minDate && date < settings.minDate) return true;
      if (settings?.maxDate && date > settings.maxDate) return true;
      return settings?.disabledDates?.some(
        disabled => disabled.toDateString() === date.toDateString()
      ) ?? false;
    }
  }), [settings]);

  const modifiersClassNames = {
    highlighted: 'bg-yellow-100 dark:bg-yellow-800',
    disabled: 'opacity-50 cursor-not-allowed'
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
        ),
        day_selected: 'bg-primary text-primary-foreground hover:bg-primary',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" aria-hidden="true" {...props} />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" aria-hidden="true" {...props} />,
      }}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      weekStartsOn={settings?.firstDayOfWeek}
      locale={settings?.locale}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

interface DateTimePickerProps {
  date?: Date;
  setDate?: (date: Date) => void;
  className?: string;
  settings?: CalendarSettings;
  timeZone?: string;
  minTime?: string;
  maxTime?: string;
}

function DateTimePicker({
  date,
  setDate,
  className,
  settings,
  timeZone,
  minTime,
  maxTime,
}: DateTimePickerProps) {
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date | undefined>(date);
  const timeInputRef = React.useRef<HTMLInputElement>(null);

  const handleSelect = (day: Date | undefined) => {
    if (!day) return;
    
    const newDateTime = selectedDateTime
      ? new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate(),
          selectedDateTime.getHours(),
          selectedDateTime.getMinutes()
        )
      : day;

    setSelectedDateTime(newDateTime);
    setDate?.(newDateTime);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    
    if (selectedDateTime) {
      const newDateTime = new Date(selectedDateTime);
      newDateTime.setHours(hours);
      newDateTime.setMinutes(minutes);
      
      if (timeZone) {
        const formatter = new Intl.DateTimeFormat('en-US', { timeZone });
        const formatted = formatter.format(newDateTime);
        newDateTime.setTime(new Date(formatted).getTime());
      }
      
      setSelectedDateTime(newDateTime);
      setDate?.(newDateTime);
    }
  };

  const formattedTime = selectedDateTime 
    ? format(selectedDateTime, 'HH:mm')
    : '';

  return (
    <div className={cn('space-y-4', className)} role="group" aria-label="Date and time picker">
      <Calendar
        mode="single"
        selected={selectedDateTime}
        onSelect={handleSelect}
        settings={settings}
      />
      <div className="flex items-center gap-2">
        <label htmlFor="time-input" className="sr-only">Select time</label>
        <input
          ref={timeInputRef}
          id="time-input"
          type="time"
          className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
          value={formattedTime}
          onChange={handleTimeChange}
          min={minTime}
          max={maxTime}
          aria-label="Select time"
        />
        {timeZone && (
          <span className="text-sm text-muted-foreground" aria-label="Time zone">
            ({timeZone})
          </span>
        )}
      </div>
    </div>
  );
}

interface DateRangePickerProps {
  className?: string;
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  settings?: CalendarSettings;
  numberOfMonths?: number;
}

export function DateRangePicker({
  className,
  dateRange,
  onDateRangeChange,
  settings,
  numberOfMonths = 2
}: DateRangePickerProps) {
  const handleRangeSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to && settings?.maxDate && range.to > settings.maxDate) {
      range.to = settings.maxDate;
    }
    if (range?.from && range?.to && settings?.minDate && range.from < settings.minDate) {
      range.from = settings.minDate;
    }
    onDateRangeChange?.(range);
  };

  return (
    <div className={cn('', className)} role="group" aria-label="Date range picker">
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={handleRangeSelect}
        numberOfMonths={numberOfMonths}
        defaultMonth={dateRange?.from}
        settings={settings}
        footer={dateRange?.from && dateRange?.to && (
          <p className="text-sm mt-4">
            Selected: {format(dateRange.from, 'PP')} - {format(dateRange.to, 'PP')}
          </p>
        )}
      />
    </div>
  );
}

export { Calendar, DateTimePicker, type DateRange };