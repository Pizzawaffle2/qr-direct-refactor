// src/components/calendar/grid/utils.ts
import {
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isToday as dateFnsIsToday,
  isSameDay,
  isBefore,
  isAfter,
  addDays,
} from 'date-fns';

type CalendarDate = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
};

// Helper function to replace eachDayOfInterval
function getDatesInRange(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  let currentDate = start;

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  return dates;
}

export const generateCalendarDates = (
  month: number,
  year: number,
  selectedDate?: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates: Date[] = []
): CalendarDate[] => {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(start);

  // Get all dates in the month using our custom function
  const dates = getDatesInRange(start, end);

  // Map dates to CalendarDate objects
  return dates.map((date) => ({
    date,
    isCurrentMonth: isSameMonth(date, start),
    isToday: dateFnsIsToday(date),
    isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
    isDisabled:
      (minDate && isBefore(date, minDate)) ||
      (maxDate && isAfter(date, maxDate)) ||
      disabledDates.some((disabled) => isSameDay(date, disabled)),
  }));
};