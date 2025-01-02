// src/components/UI/Calendar.tsx
'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, DropdownProps } from 'react-day-picker';
import { DateRange } from 'react-day-picker';
import { buttonVariants } from '@/components/UI/Button';
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 bg-[rgb(var(--background-start))] text-[rgb(var(--foreground))] dark:bg-[rgb(var(--background-end))] dark:text-[rgb(var(--foreground))]', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 dark:hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent dark:[&:has([aria-selected])]:bg-accent',
          'first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 dark:aria-selected:opacity-100'
        ),
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground dark:focus:bg-primary dark:focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground dark:bg-accent dark:text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-50 dark:text-muted-foreground dark:opacity-50',
        day_disabled: 'text-muted-foreground opacity-50 dark:text-muted-foreground dark:opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground dark:aria-selected:bg-accent dark:aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };

// DateTime Picker Component
interface DateTimePickerProps {
  date?: Date;
  setDate?: (date: Date) => void;
  className?: string;
}

export function DateTimePicker({
  date,
  setDate,
  className,
}: DateTimePickerProps) {
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date | undefined>(
    date
  );

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
      setSelectedDateTime(newDateTime);
      setDate?.(newDateTime);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <Calendar
        mode="single"
        selected={selectedDateTime}
        onSelect={handleSelect}
      />
      <div className="flex items-center gap-2">
        <label htmlFor="time-input" className="sr-only">Select time</label>
        <input
          id="time-input"
          type="time"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background dark:border-input dark:ring-offset-background"
          value={
            selectedDateTime
              ? `${String(selectedDateTime.getHours()).padStart(2, '0')}:${String(
                  selectedDateTime.getMinutes()
                ).padStart(2, '0')}`
              : ''
          }
          onChange={handleTimeChange}
          aria-label="Select time"
        />
      </div>
    </div>
  );
}

// Date Range Picker Component
interface DateRangePickerProps {
  className?: string;
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange | undefined) => void;
}

export function DateRangePicker({
  className,
  dateRange,
  onDateRangeChange,
}: DateRangePickerProps) {
  return (
    <div className={cn('', className)}>
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={onDateRangeChange}
        numberOfMonths={2}
        defaultMonth={dateRange?.from}
      />
    </div>
  );
}
