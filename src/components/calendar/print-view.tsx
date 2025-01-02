// src/components/calendar/print-view.tsx
'use client';

import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { Card } from '@/components/UI/Card';
import { CalendarTheme, CalendarEvent, CalendarSettings } from '@/types/calendar';
import { createPortal } from 'react-dom';

interface PrintViewProps {
  theme: CalendarTheme;
  events: CalendarEvent[];
  settings: CalendarSettings;
  title: string;
  month: number;
  year: number;
  includeCover?: boolean;
  onClose: () => void;
}

export function PrintView({
  theme,
  events,
  settings,
  title,
  month,
  year,
  includeCover = true,
  onClose
}: PrintViewProps) {
  useEffect(() => {
    // Add print-specific classes to body when component mounts
    document.body.classList.add('printing-calendar');

    const handlePrintComplete = () => {
      document.body.classList.remove('printing-calendar');
      onClose();
    };

    window.addEventListener('afterprint', handlePrintComplete);

    return () => {
      document.body.classList.remove('printing-calendar');
      window.removeEventListener('afterprint', handlePrintComplete);
    };
  }, [onClose]);

  // Helper function to get events for a specific day
  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === month &&
             eventDate.getFullYear() === year;
    });
  };

  // Generate calendar data
  const generateCalendarData = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const weeks: number[][] = [];
    let currentWeek: number[] = [];

    // Calculate offset based on first day of week setting
    const offset = (firstDayOfMonth - settings.firstDayOfWeek + 7) % 7;
    for (let i = 0; i < offset; i++) {
      currentWeek.push(0);
    }

    // Fill in the days
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Fill in remaining days
    while (currentWeek.length < 7) {
      currentWeek.push(0);
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const weeks = generateCalendarData();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  if (settings.firstDayOfWeek === 1) {
    dayNames.push(dayNames.shift()!);
  }

  return createPortal(
    <div className="print-calendar-wrapper">
      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0.5in;
          }

          html * {
            visibility: hidden;
          }

          .print-calendar-wrapper,
          .print-calendar-wrapper * {
            visibility: visible;
          }

          .print-calendar-wrapper {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }

          .calendar-header {
            text-align: center;
            margin-bottom: 1rem;
          }

          .calendar-title {
            font-size: 24pt;
            margin: 0;
            color: ${theme.colors.primary};
          }

          .calendar-month {
            font-size: 18pt;
            margin: 0;
            color: ${theme.colors.text};
          }

          .calendar-grid {
            width: 100%;
            border-collapse: collapse;
            background-color: ${theme.colors.background};
          }

          .calendar-grid th {
            padding: 8px;
            text-align: center;
            background-color: ${theme.colors.primary};
            color: ${theme.colors.background};
            font-weight: 600;
            border: 1px solid ${theme.colors.border};
          }

          .calendar-grid td {
            height: 100px;
            vertical-align: top;
            padding: 8px;
            border: 1px solid ${theme.colors.border};
          }

          .day-number {
            font-size: 14pt;
            margin-bottom: 4px;
            color: ${theme.colors.text};
          }

          .event-item {
            font-size: 9pt;
            margin: 2px 0;
            padding: 2px 4px;
            border-radius: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .other-month {
            background-color: ${theme.colors.background}20;
          }

          .print-only {
            display: block !important;
          }

          .no-print {
            display: none !important;
          }
        }

        /* Hide in normal view */
        .print-calendar-wrapper {
          display: none;
        }
      `}</style>

      <div className="print-calendar">
        {includeCover && (
          <div className="calendar-header">
            <h1 className="calendar-title">{title}</h1>
            <h2 className="calendar-month">
              {format(new Date(year, month), 'MMMM yyyy')}
            </h2>
          </div>
        )}

        <table className="calendar-grid">
          <thead>
            <tr>
              {settings.showWeekNumbers && <th>Week</th>}
              {dayNames.map(day => (
                <th key={day}>{day.slice(0, 3)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {settings.showWeekNumbers && (
                  <td className="week-number">
                    {format(new Date(year, month, week.find(d => d !== 0) || 1), 'w')}
                  </td>
                )}
                {week.map((day, dayIndex) => (
                  <td key={dayIndex} className={day === 0 ? 'other-month' : ''}>
                    {day !== 0 && (
                      <>
                        <div className="day-number">{day}</div>
                        <div className="events-list">
                          {getEventsForDay(day).map((event, eventIndex) => (
                            <div
                              key={eventIndex}
                              className="event-item"
                              style={{
                                backgroundColor: `${event.color}20`,
                                borderLeft: `3px solid ${event.color}`
                              }}
                            >
                              {event.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>,
    document.body
  );
}

export default PrintView;