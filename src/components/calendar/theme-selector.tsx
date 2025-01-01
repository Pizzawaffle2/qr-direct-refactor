// src/components/calendar/theme-selector.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/UI/Card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/Select';
import { ThemeOption } from '@/types/calendar';
import { cn } from '@/lib/utils';

// Theme Categories
const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'default',
    name: 'Default',
    value: 'default',
    description: 'Clean and professional look',
    colors: {
      primary: '#3B82F6',
      secondary: '#60A5FA',
      background: '#FFFFFF',
      text: '#1F2937',
      border: '#E5E7EB',
      accent: '#818CF8'
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      headerSize: '18px',
      dateSize: '14px'
    },
    frame: {
      type: 'basic',
      borderStyle: 'solid'
    },
    category: 'basic'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    value: 'minimal',
    description: 'Simple and elegant design',
    colors: {
      primary: '#111827',
      secondary: '#374151',
      background: '#F9FAFB',
      text: '#111827',
      border: '#E5E7EB',
      accent: '#6B7280'
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      headerSize: '18px',
      dateSize: '14px'
    },
    frame: {
      type: 'minimal',
      borderStyle: 'solid'
    },
    category: 'basic'
  },
  {
    id: 'spring',
    name: 'Spring',
    value: 'spring',
    description: 'Fresh and vibrant colors',
    colors: {
      primary: '#10B981',
      secondary: '#34D399',
      background: '#ECFDF5',
      text: '#065F46',
      border: '#6EE7B7',
      accent: '#059669'
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      headerSize: '18px',
      dateSize: '14px'
    },
    frame: {
      type: 'spring',
      borderStyle: 'solid'
    },
    category: 'seasonal',
    availableMonths: [2, 3, 4] // March to May
  },
  {
    id: 'winter',
    name: 'Winter',
    value: 'winter',
    description: 'Cool and crisp design',
    colors: {
      primary: '#0EA5E9',
      secondary: '#38BDF8',
      background: '#F0F9FF',
      text: '#0C4A6E',
      border: '#7DD3FC',
      accent: '#0284C7'
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      headerSize: '18px',
      dateSize: '14px'
    },
    frame: {
      type: 'snowflakes',
      borderStyle: 'solid'
    },
    category: 'seasonal',
    availableMonths: [11, 0, 1] // December to February
  }
];

interface ThemeSelectorProps {
  currentTheme: string;
  currentMonth: number;
  onThemeSelect: (theme: ThemeOption) => void;
}

export function ThemeSelector({
  currentTheme,
  currentMonth,
  onThemeSelect
}: ThemeSelectorProps) {
  const [category, setCategory] = useState<string>('all');

  const availableThemes = THEME_OPTIONS.filter((theme) => {
    const matchesCategory = category === 'all' || theme.category === category;
    const availableInMonth = !theme.availableMonths || theme.availableMonths.includes(currentMonth);
    return matchesCategory && availableInMonth;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Theme</h3>
        
        <div className="space-y-4">
          <Select
            value={category}
            onValueChange={setCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="seasonal">Seasonal</SelectItem>
                <SelectItem value="holiday">Holiday</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-2 gap-4">
            {availableThemes.map((theme) => (
              <Card
                key={theme.id}
                onClick={() => onThemeSelect(theme)}
                className={cn(
                  'cursor-pointer transition-all duration-200',
                  'hover:shadow-md hover:-translate-y-0.5',
                  theme.id === currentTheme
                    ? 'ring-2 ring-blue-500'
                    : 'hover:ring-1 hover:ring-blue-500/50'
                )}
              >
                {/* Theme Preview */}
                <div
                  className="aspect-video p-4"
                  style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                  }}
                >
                  <div className="space-y-2">
                    <div
                      className="h-4 rounded"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Theme Info */}
                <div className="border-t p-3">
                  <div className="space-y-1">
                    <h3 className="font-medium">{theme.name}</h3>
                    {theme.description && (
                      <p className="text-xs text-gray-500">{theme.description}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {availableThemes.length === 0 && (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-sm text-gray-500">
            No themes available for the selected category and month.
          </p>
        </div>
      )}
    </div>
  );
}

export default ThemeSelector;