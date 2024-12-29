'use client';

import { CalendarSettings } from '@/types/calendar';
import { Calendar as CalendarIcon, Moon, Sun, Cloud } from 'lucide-react';

interface CalendarPreviewProps {
  settings: CalendarSettings;
}

export function CalendarPreview({ settings }: CalendarPreviewProps) {
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderMonth = (monthIndex: number) => {
    const daysInMonth = getDaysInMonth(settings.year, monthIndex);
    const firstDay = getFirstDayOfMonth(settings.year, monthIndex);
    const monthDays = [];
    let days = [];

    // Fixed weekdays array
    const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Fill empty days at start
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <td key={`empty-${i}`} className="p-2 text-center text-muted-foreground"></td>
      );
    }

    // Fill actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <td
          key={`day-${day}`}
          className="relative cursor-pointer p-2 text-center hover:bg-accent/50"
          style={{ color: settings.theme.textColor }}
        >
          <span className="relative z-10">{day}</span>
          {settings.options.showLunarPhases && day % 7 === 0 && (
            <Moon className="absolute right-1 top-1 h-3 w-3 opacity-50" />
          )}
        </td>
      );

      // Create new week row after 7 days
      if ((firstDay + day) % 7 === 0 || day === daysInMonth) {
        monthDays.push(<tr key={`week-${monthDays.length}`}>{days}</tr>);
        days = [];
      }
    }

    return (
      <div className="overflow-hidden rounded-lg border" 
           style={{ backgroundColor: settings.theme.backgroundColor }}>
        <div className="p-3" style={{ backgroundColor: settings.theme.headerColor, color: '#fff' }}>
          <div className="text-lg font-semibold">
            {new Date(settings.year, monthIndex).toLocaleString('default', { month: 'long' })}
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {WEEKDAYS.map(day => (
                <th key={day} className="p-2 text-center font-normal">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{monthDays}</tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {settings.months.map((monthIndex) => (
        <div key={monthIndex}>
          {renderMonth(monthIndex)}
        </div>
      ))}
    </div>
  );
}
