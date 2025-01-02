// src/types/calendar.ts

// Theme Types
export interface CalendarTheme {
  id: string;
  name: string;
  value: string;
  colors: ThemeColors;
  typography: Typography;
  frame: FrameSettings;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  border: string;
  accent: string;
}

export interface Typography {
  fontFamily: string;
  headerSize: string;
  dateSize: string;
}

export interface FrameSettings {
  type: FrameType;
  borderStyle: BorderStyle;
  cornerStyle?: CornerStyle;
}

export type FrameType = 
  | 'none'
  | 'basic'
  | 'minimal'
  | 'christmas'
  | 'snowflakes'
  | 'spring'
  | 'summer'
  | 'autumn';

export type BorderStyle = 
  | 'none'
  | 'solid'
  | 'double'
  | 'dashed';

export type CornerStyle = 
  | 'rounded'
  | 'sharp'
  | 'beveled'
  | 'snowflake';

// Event Types
export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: EventType;
  color?: string;
  description?: string;
}

export type EventType = 'event' | 'reminder' | 'task' | 'birthday' | 'holiday';

export interface RecurringEventProps {
  startDate: Date;
  endDate?: Date;
  frequency: RecurrenceFrequency;
  interval?: number;
  weekdays?: number[];
  monthDay?: number;
  exceptions?: Date[];
  occurrences?: number;
  title: string;
  type: EventType;
  color?: string;
}

export type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

// Settings Types
export interface Holiday {
  id: string;
  name: string;
  type: 'fixed' | 'floating' | 'custom';
  date: Date;
}

export interface CalendarSettings {
  theme: string;
  firstDayOfWeek: number;
  showWeekNumbers: boolean;
  showLunarPhases: boolean;
  showHolidays: boolean;
  showWeather: boolean;
}

// Weather Types
export interface WeatherData {
  temperature: number;
  condition: string;
  icon?: string;
}

// Export Types
export interface ExportOptions {
  format: 'pdf' | 'png' | 'ics';
  quality: 'high' | 'medium' | 'draft';
  includeCover: boolean;
  optimizeForPrinting: boolean;
  paperSize: 'a4' | 'letter' | 'a3';
  orientation: 'portrait' | 'landscape';
}

// Theme Option Types
export interface ThemeOption {
  id: string;
  name: string;
  value: string;
  description?: string;
  colors: ThemeColors;
  typography: Typography;
  frame: FrameSettings;
  category?: 'basic' | 'seasonal' | 'holiday';
  availableMonths?: number[]; // 0-11 for Jan-Dec
}

// Calendar Grid Types
export interface CalendarCell {
  date: Date;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
  weather?: WeatherData;
}

export interface CalendarGridProps {
  month: number;
  year: number;
  events: CalendarEvent[];
  settings: CalendarSettings;
  theme: CalendarTheme;
  isEditing: boolean;
  onAddEvent: (event: CalendarEvent) => void;
  onRemoveEvent: (id: string) => void;
  onUpdateEvent: (event: CalendarEvent) => void;
}

// Default Values
export const DEFAULT_THEME: CalendarTheme = {
  id: 'default',
  name: 'Default',
  value: 'default',
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
  }
};

export const DEFAULT_SETTINGS: CalendarSettings = {
  firstDayOfWeek: 0,
  showWeekNumbers: false,
  theme: 'default',
  showLunarPhases: false,
  showHolidays: false,
  showWeather: false
};

// Utility Types
export type DateString = `${number}-${number}-${number}`; // YYYY-MM-DD
export type UpdateFunction<T> = (prev: T) => T;
export type CalendarViewMode = 'month' | 'week' | 'day' | 'year';