// src/components/calendar/calendar-toolbar.tsx
'use client';

import React from 'react';
import { Button } from '@/components/UI/Button';
import { CalendarViewMode } from '@/types/calendar';
import { CalendarDays, Grid, Settings } from 'lucide-react';

interface CalendarToolbarProps {
  currentView: CalendarViewMode;
  onTodayClick: () => void;
  onViewChange: (view: CalendarViewMode) => void;
  onSettingsClick: () => void;
}

const VIEW_OPTIONS: { label: string; value: CalendarViewMode }[] = [
  { label: 'Month', value: 'month' },
  { label: 'Week', value: 'week' },
  { label: 'Day', value: 'day' },
  { label: 'Year', value: 'year' },
];

const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  currentView,
  onTodayClick,
  onViewChange,
  onSettingsClick,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-200">
      <Button
        variant="outline"
        size="sm"
        onClick={onTodayClick}
        className="flex items-center gap-2"
      >
        <CalendarDays className="h-4 w-4" />
        Today
      </Button>

      <div className="flex items-center gap-2">
        {VIEW_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={currentView === option.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange(option.value)}
            className="capitalize"
          >
            {option.label}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onSettingsClick}
        className="flex items-center gap-2"
      >
        <Settings className="h-4 w-4" />
        Settings
      </Button>
    </div>
  );
};

export default CalendarToolbar;
