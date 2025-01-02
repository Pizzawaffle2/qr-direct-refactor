// src/components/calendar/calendar-toolbar.tsx
'use client';

import { memo } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/UI/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/Select';
import { Card } from '@/components/UI/Card';
import { Label } from '@/components/UI/Label';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Grid,
  List,
  Settings,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CalendarSettings, CalendarViewMode } from '@/types/calendar';

interface CalendarToolbarProps {
  currentMonth: number;
  currentYear: number;
  settings: CalendarSettings;
  viewMode?: CalendarViewMode;
  onViewModeChange?: (mode: CalendarViewMode) => void;
  onSettingsChange: (key: keyof CalendarSettings, value: any) => void;
  onNextMonth: () => void;
  onPrevMonth: () => void;
  onExport?: () => void;
}

const VIEW_MODES = [
  { value: 'month', label: 'Month', icon: Grid },
  { value: 'week', label: 'Week', icon: List },
];

export const CalendarToolbar = memo(function CalendarToolbar({
  currentMonth,
  currentYear,
  settings,
  viewMode = 'month',
  onViewModeChange,
  onSettingsChange,
  onNextMonth,
  onPrevMonth,
  onExport
}: CalendarToolbarProps) {
  const currentDate = new Date(currentYear, currentMonth);
  
  const goToToday = () => {
    const today = new Date();
    // Implement logic to navigate to current month/year
  };

  return (
    <Card className="p-2">
      <div className="flex items-center justify-between">
        {/* Left Section - Navigation */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border bg-white">
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevMonth}
              className="rounded-r-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="px-3 py-1 font-medium">
              {format(currentDate, 'MMMM yyyy')}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onNextMonth}
              className="rounded-l-none"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="hidden sm:flex"
          >
            Today
          </Button>
        </div>

        {/* Middle Section - View Options */}
        <div className="hidden md:flex items-center gap-4">
          {onViewModeChange && (
            <div className="flex items-center gap-1 rounded-lg border bg-white p-1">
              {VIEW_MODES.map((mode) => {
                const Icon = mode.icon;
                return (
                  <Button
                    key={mode.value}
                    variant={viewMode === mode.value ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onViewModeChange(mode.value as CalendarViewMode)}
                    className={cn(
                      'gap-2',
                      viewMode === mode.value ? 'bg-primary text-primary-foreground' : ''
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{mode.label}</span>
                  </Button>
                );
              })}
            </div>
          )}

          <Select
            value={settings.firstDayOfWeek.toString()}
            onValueChange={(value) => 
              onSettingsChange('firstDayOfWeek', parseInt(value) as 0 | 1)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="First day of week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Week starts on Sunday</SelectItem>
              <SelectItem value="1">Week starts on Monday</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onSettingsChange('showWeekNumbers', !settings.showWeekNumbers)}
            className={cn(
              settings.showWeekNumbers && 'bg-primary/10'
            )}
          >
            <span className="sr-only">Toggle week numbers</span>
            <Settings className="h-4 w-4" />
          </Button>

          {onExport && (
            <Button
              variant="outline"
              size="icon"
              onClick={onExport}
            >
              <span className="sr-only">Export calendar</span>
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu - Shown on smaller screens */}
      <div className="mt-2 flex items-center justify-between md:hidden">
        <Select
          value={settings.firstDayOfWeek.toString()}
          onValueChange={(value) => 
            onSettingsChange('firstDayOfWeek', parseInt(value) as 0 | 1)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="First day of week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Week starts on Sunday</SelectItem>
            <SelectItem value="1">Week starts on Monday</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
});

interface QuickSettingsProps {
  settings: CalendarSettings;
  onSettingsChange: (key: keyof CalendarSettings, value: any) => void;
}

const QuickSettings = memo(function QuickSettings({
  settings,
  onSettingsChange
}: QuickSettingsProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Label className="flex items-center gap-2">
        <input
          type="checkbox"
          title="Toggle week numbers"
          checked={settings.showWeekNumbers}
          onChange={(e) => onSettingsChange('showWeekNumbers', e.target.checked)}
          className="rounded border-gray-300"
        />
        Show week numbers
      </Label>
      <Label className="flex items-center gap-2">
        <input
          type="checkbox"
          title="Toggle holiday visibility"
          checked={settings.showHolidays}
          onChange={(e) => onSettingsChange('showHolidays', e.target.checked)}
          className="rounded border-gray-300"
        />
        Show holidays
      </Label>
    </div>
  );
});

export default CalendarToolbar;