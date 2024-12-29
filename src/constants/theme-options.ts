import { CalendarTheme, ThemeCategory } from '@/types/calendar-types';

export const THEME_OPTIONS: CalendarTheme[] = [
  {
    id: 'default',
    name: 'Default',
    title: 'Default Calendar',
    type: 'personal',
    year: new Date().getFullYear(),
    firstDayOfWeek: 0,
    showWeekNumbers: false,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    monthsPerRow: [3],
    themeStyle: 'default',
    category: 'basic',
    description: 'Clean and minimal design',
    colors: {
      primary: '#000000',
      secondary: '#666666',
      background: '#ffffff',
      text: '#000000',
      accent: '#ff0000',
      border: '#e2e8f0',
    },
    typography: {
      fontFamily: 'system-ui',
      headerSize: 'lg',
      dateSize: 'base',
    },
    frame: {
      type: 'basic',
      borderStyle: 'solid',
      printOptimized: true
    },
    options: {
      showHolidays: true,
      showLunarPhases: false,
      showWeather: false,
      showNotes: true
    }
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    title: 'Dark Calendar',
    type: 'personal',
    year: new Date().getFullYear(),
    firstDayOfWeek: 0,
    showWeekNumbers: false,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    monthsPerRow: [3],
    themeStyle: 'dark',
    category: 'basic',
    description: 'Modern dark theme',
    colors: {
      primary: '#ffffff',
      secondary: '#a0aec0',
      background: '#1a202c',
      text: '#ffffff',
      accent: '#ff0000',
      border: '#2d3748',
    },
    typography: {
      fontFamily: 'system-ui',
      headerSize: 'lg',
      dateSize: 'base',
    },
    frame: {
      type: 'basic',
      borderStyle: 'solid',
      printOptimized: true
    },
    options: {
      showHolidays: true,
      showLunarPhases: false,
      showWeather: false,
      showNotes: true
    }
  },
  {
    id: 'nature',
    name: 'Nature',
    title: 'Nature Calendar',
    type: 'seasonal',
    year: new Date().getFullYear(),
    firstDayOfWeek: 0,
    showWeekNumbers: false,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    monthsPerRow: [3],
    themeStyle: 'nature',
    category: 'seasonal',
    description: 'Earthy and natural tones',
    colors: {
      primary: '#2f855a',
      secondary: '#68d391',
      background: '#ffffff',
      text: '#2d3748',
      accent: '#ff0000',
      border: '#9ae6b4',
    },
    typography: {
      fontFamily: 'system-ui',
      headerSize: 'lg',
      dateSize: 'base',
    },
    frame: {
      type: 'seasonal',
      borderStyle: 'solid',
      printOptimized: true
    },
    options: {
      showHolidays: true,
      showLunarPhases: true,
      showWeather: true,
      showNotes: true
    }
  }
];