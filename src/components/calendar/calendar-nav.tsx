// src/components/calendar/calendar-nav.tsx
'use client';

import React from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/Select';
import { CalendarViewMode } from '@/types/calendar';

interface CalendarNavProps {
  currentMonth: number;
  currentYear: number;
  viewMode?: CalendarViewMode;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onViewModeChange?: (mode: CalendarViewMode) => void;
  onNextMonth: () => void;
  onPrevMonth: () => void;
}

const VIEW_MODES: { label: string; value: CalendarViewMode }[] = [
  { label: 'Month', value: 'month' },
  { label: 'Week', value: 'week' },
  { label: 'Day', value: 'day' },
  { label: 'Year', value: 'year' },
];

const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

export function CalendarNav({
  currentMonth,
  currentYear,
  viewMode = 'month',
  onMonthChange,
  onYearChange,
  onViewModeChange,
  onNextMonth,
  onPrevMonth,
}: CalendarNavProps) {
  // Generate year options for the past 10 years and next 10 years
  const currentYearNum = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: 21 },
    (_, i) => currentYearNum - 10 + i
  );

  const handleTodayClick = () => {
    const today = new Date();
    onMonthChange(today.getMonth());
    onYearChange(today.getFullYear());
  };

  const currentDate = new Date(currentYear, currentMonth);

  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
      {/* Left Section - Navigation */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevMonth}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          <Select
            value={currentMonth.toString()}
            onValueChange={(value) => onMonthChange(parseInt(value))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue>
                {MONTHS[currentMonth]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((month, index) => (
                <SelectItem key={month} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={currentYear.toString()}
            onValueChange={(value) => onYearChange(parseInt(value))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue>{currentYear}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNextMonth}
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="h-6 w-px bg-gray-200 mx-2" />

        <Button
          variant="ghost"
          size="sm"
          onClick={handleTodayClick}
        >
          Today
        </Button>
      </div>

      {/* Right Section - View Mode */}
      {onViewModeChange && (
        <div className="flex items-center gap-2">
          <Select
            value={viewMode}
            onValueChange={(value) => 
              onViewModeChange(value as CalendarViewMode)
            }
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue>
                {VIEW_MODES.find(mode => mode.value === viewMode)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {VIEW_MODES.map((mode) => (
                <SelectItem key={mode.value} value={mode.value}>
                  {mode.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

// Mini version for embedded calendars
export function MiniCalendarNav({
  currentMonth,
  currentYear,
  onNextMonth,
  onPrevMonth,
}: Omit<CalendarNavProps, 'onMonthChange' | 'onYearChange' | 'viewMode' | 'onViewModeChange'>) {
  const currentDate = new Date(currentYear, currentMonth);
  
  return (
    <div className="flex items-center justify-between pb-2 mb-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevMonth}
        className="h-7 w-7"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <span className="text-sm font-medium">
        {format(currentDate, 'MMMM yyyy')}
      </span>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onNextMonth}
        className="h-7 w-7"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default CalendarNav;