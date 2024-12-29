// src/components/calendar/toolbar/toolbar-select.tsx
import { memo } from 'react';
import { Label } from '@/components/UI/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/UI/Select';
import { cn } from '@/lib/utils';
import { ToolbarSelectProps } from './types';

export const ToolbarSelect = memo(
  ({ label, value, options, onChange, disabled = false, className }: ToolbarSelectProps) => {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <Label
          htmlFor={`select-${label.toLowerCase()}`}
          className="text-sm font-medium text-gray-200"
        >
          {label}
        </Label>

        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger id={`select-${label.toLowerCase()}`}>
            <SelectValue>{value}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
);

ToolbarSelect.displayName = 'ToolbarSelect';
