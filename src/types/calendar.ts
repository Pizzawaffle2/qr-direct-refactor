// src/types/calendar.ts
export interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    type: 'event' | 'reminder';
    color?: string;
    description?: string;
  }
  
  export interface WeatherData {
    temperature: number;
    condition: string;
    icon?: string;
  }
  
  export interface CalendarSettings {
    theme: string;
    frame: string;
    font: string;
    firstDayOfWeek: number; // 0 for Sunday, 1 for Monday
    showWeekNumbers: boolean;
    showHolidays: boolean;
    showLunarPhases: boolean;
    showWeather: boolean;
  }
  
  export interface CalendarTheme {
    id: string;
    value: string;
    name: string;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      border: string;
    };
    typography: {
      fontFamily: string;
      headerSize: string;
      dateSize: string;
    };
    frame: {
      type: string;
      borderStyle: string;
    };
  }

  interface CalendarStyleEditorValue {
    theme: CalendarTheme;
    frame: string;
    font: string;
  }