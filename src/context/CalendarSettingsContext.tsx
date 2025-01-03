'use client';

import React, { createContext, useContext, useState } from 'react';
import { CalendarSettings, DEFAULT_SETTINGS } from '@/types/calendar';

type CalendarSettingsContextType = {
  settings: CalendarSettings;
  updateSettings: (updates: Partial<CalendarSettings>) => void;
};

const CalendarSettingsContext = createContext<CalendarSettingsContextType>({
  settings: DEFAULT_SETTINGS,
  updateSettings: () => {},
});

export function CalendarSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<CalendarSettings>(DEFAULT_SETTINGS);

  const updateSettings = (updates: Partial<CalendarSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <CalendarSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </CalendarSettingsContext.Provider>
  );
}

export const useCalendarSettings = () => {
  const context = useContext(CalendarSettingsContext);
  if (!context) {
    throw new Error('useCalendarSettings must be used within CalendarSettingsProvider');
  }
  return context;
};