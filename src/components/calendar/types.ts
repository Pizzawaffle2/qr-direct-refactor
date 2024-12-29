// src/components/calendar/types.ts

// Theme Types
export interface ThemeColors {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  }
  
  export interface ThemeOptionType {
    label: string;
    value: string;
    description: string;
    colors: ThemeColors;
  }
  
  export type ThemeOption = 'default' | 'holiday' | 'minimal' | 'dark' | 'light';
  
  // Frame Types
  export interface FrameOptionType {
    label: string;
    value: string;
    description: string;
    borderStyle: 'none' | 'solid' | 'double' | 'dashed';
    cornerStyle?: 'rounded' | 'sharp' | 'beveled' | 'snowflake';
  }
  
  export type FrameOption = 'none' | 'spring' | 'summer' | 'autumn' | 'winter';
  
  // Font Types
  export interface FontOptionType {
    label: string;
    value: string;
    description: string;
    fontFamily: string;
    fontWeight: number[];
  }
  
  export type FontOption = 'arial' | 'serif' | 'monospace' | 'inter' | 'roboto';
  
  // Calendar Event Types
  export interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    type: 'event' | 'reminder';
  }
  
  // Weather Types
  export interface WeatherData {
    temperature: number;
    condition: string;
  }
  
  // Calendar Settings Type
  export interface CalendarSettings {
    theme: ThemeOption;
    frame: FrameOption;
    font: FontOption;
    firstDayOfWeek: 0 | 1;  // 0 for Sunday, 1 for Monday
    showWeekNumbers: boolean;
    showHolidays: boolean;
    showLunarPhases: boolean;
  }