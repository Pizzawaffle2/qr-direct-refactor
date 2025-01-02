// src/components/calendar/holiday-display.tsx
'use client';

import React from 'react';
import { format, isEqual } from 'date-fns';
import { Star, Plus, X } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/input';
import { Calendar } from '@/components/UI/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/UI/Popover';
import { Card } from '@/components/UI/Card';
import { cn } from '@/lib/utils';

interface Holiday {
  id: string;
  name: string;
  date: Date;
  type: 'fixed' | 'floating' | 'custom';
  color?: string;
}

// Built-in holidays (example set - can be expanded)
const DEFAULT_HOLIDAYS: Holiday[] = [
  {
    id: 'new-years',
    name: "New Year's Day",
    date: new Date(new Date().getFullYear(), 0, 1),
    type: 'fixed',
    color: '#3B82F6'
  },
  {
    id: 'christmas',
    name: 'Christmas',
    date: new Date(new Date().getFullYear(), 11, 25),
    type: 'fixed',
    color: '#EF4444'
  },
  // Add more default holidays as needed
];

interface HolidayDisplayProps {
  date: Date;
  holidays: Holiday[];
  isEditing?: boolean;
  onAddHoliday?: (holiday: Holiday) => void;
  onRemoveHoliday?: (holidayId: string) => void;
  compact?: boolean;
  className?: string;
}

// Cell display component for calendar days
export function HolidayCell({
  date,
  holidays,
  compact = true,
  className
}: HolidayDisplayProps) {
  const dayHolidays = holidays.filter(holiday => 
    isEqual(new Date(holiday.date), date)
  );

  if (dayHolidays.length === 0) return null;

  return (
    <div className={cn(
      "flex flex-col gap-0.5",
      compact ? "text-xs" : "text-sm",
      className
    )}>
      {dayHolidays.map(holiday => (
        <div
          key={holiday.id}
          className="flex items-center gap-1"
          style={{ color: holiday.color }}
        >
          <Star className={cn(
            "flex-shrink-0",
            compact ? "h-3 w-3" : "h-4 w-4"
          )} />
          {!compact && (
            <span className="truncate">{holiday.name}</span>
          )}
        </div>
      ))}
    </div>
  );
}

// Holiday management component
export function HolidayManager({
  holidays: propHolidays = DEFAULT_HOLIDAYS,
  onAddHoliday,
  onRemoveHoliday,
  className
}: {
  holidays?: Holiday[];
  onAddHoliday?: (holiday: Holiday) => void;
  onRemoveHoliday?: (holidayId: string) => void;
  className?: string;
}) {
  const [newHoliday, setNewHoliday] = React.useState<Partial<Holiday>>({
    name: '',
    date: new Date(),
    type: 'custom',
    color: '#3B82F6'
  });
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddHoliday = () => {
    if (!newHoliday.name || !newHoliday.date) return;

    onAddHoliday?.({
      id: crypto.randomUUID(),
      name: newHoliday.name,
      date: newHoliday.date,
      type: 'custom',
      color: newHoliday.color || '#3B82F6'
    });

    setNewHoliday({
      name: '',
      date: new Date(),
      type: 'custom',
      color: '#3B82F6'
    });
    setIsAdding(false);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Holidays</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Holiday
        </Button>
      </div>

      {/* Holiday List */}
      <div className="space-y-2">
        {propHolidays.map(holiday => (
          <Card
            key={holiday.id}
            className={cn(
              "flex items-center justify-between p-3",
              "border-l-4"
            )}
            style={{ borderLeftColor: holiday.color }}
          >
            <div className="space-y-1">
              <div className="font-medium">{holiday.name}</div>
              <div className="text-sm text-gray-500">
                {format(holiday.date, 'MMMM d, yyyy')}
              </div>
            </div>

            {holiday.type === 'custom' && onRemoveHoliday && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveHoliday(holiday.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </Card>
        ))}

        {propHolidays.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No holidays added yet
          </div>
        )}
      </div>

      {/* Add Holiday Form */}
      {isAdding && (
        <Card className="p-4 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Holiday Name
              </label>
              <Input
                value={newHoliday.name}
                onChange={(e) => setNewHoliday(prev => ({ 
                  ...prev, 
                  name: e.target.value 
                }))}
                placeholder="Enter holiday name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {newHoliday.date ? (
                      format(newHoliday.date, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newHoliday.date}
                    onSelect={(date) => date && setNewHoliday(prev => ({ 
                      ...prev, 
                      date 
                    }))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Color
              </label>
              <Input
                type="color"
                value={newHoliday.color}
                onChange={(e) => setNewHoliday(prev => ({ 
                  ...prev, 
                  color: e.target.value 
                }))}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddHoliday}
                disabled={!newHoliday.name || !newHoliday.date}
              >
                Add Holiday
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default HolidayCell;