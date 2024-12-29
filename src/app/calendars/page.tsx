'use client';

import { useState, useRef, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { CalendarGrid } from '@/components/calendar/calendar-grid';
import { CalendarStyleEditor } from '@/components/calendar/style-editor';
import { ThemeSelector } from '@/components/calendar/theme-selector';
import { CalendarToolbar } from '@/components/calendar/calendar-toolbar';
import { EventTemplates } from '@/components/calendar/event-templates';
import {
  RecurringEventForm,
  createRecurringEvents,
} from '@/components/calendar/recurring-events';
import { THEME_OPTIONS } from '@/constants/theme-options';
import { CalendarExport } from '@/components/calendar/calendar-export';
import PrintButton from '@/components/calendar/print-button';
import { Settings, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/Label';
import { Card } from '@/components/UI/Card';
import {
  CalendarEvent,
  CalendarSettings,
  CalendarTheme,
  RecurringEventProps,
} from '@/types/calendar';

export const DEFAULT_SETTINGS: CalendarSettings = {
  theme: 'default',
  frame: 'none',
  font: 'sans-serif',
  firstDayOfWeek: 0,
  showWeekNumbers: false,
  showHolidays: false,
  showLunarPhases: false,
  showWeather: false,
};

export default function CalendarPage() {
  // State
  const calendarRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [settings, setSettings] = useState<CalendarSettings>(DEFAULT_SETTINGS);
  const [calendarTitle, setCalendarTitle] = useState('My Calendar');
  const [isEditing, setIsEditing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
    toast.success('Event added successfully');
  };

  const handleRemoveEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
    toast.success('Event removed successfully');
  };

  const handleUpdateEvent = (updatedEvent: CalendarEvent) => {
    setEvents((prev) => prev.map((event) => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    toast.success('Event updated successfully');
  };

  const handleRecurringEvents = (recurringProps: RecurringEventProps) => {
    const newEvents = createRecurringEvents(recurringProps);
    setEvents((prev) => [...prev, ...newEvents]);
    toast.success('Recurring events added successfully');
  };

  // Theme handling
  const getThemeOrDefault = useCallback((themeValue: string): CalendarTheme => {
    try {
      const foundTheme = THEME_OPTIONS.find((t) => t.id === themeValue);
      if (!foundTheme) {
        console.warn(`Theme ${themeValue} not found, using default`);
      }
      return foundTheme || DEFAULT_THEME;
    } catch (error) {
      console.error('Error getting theme:', error);
      return DEFAULT_THEME;
    }
  }, []);

  // Event handlers
  const handleSettingsChange = useCallback(
    (key: keyof CalendarSettings, value: string | number | boolean) => {
      try {
        setSettings((prev) => ({ ...prev, [key]: value }));
        toast.success('Settings updated successfully');
      } catch (error) {
        console.error('Error updating settings:', error);
        toast.error('Failed to update settings');
      }
    },
    []
  );

  const handleSaveCalendar = async () => {
    try {
      setIsSaving(true);
      // Add your save logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      toast.success('Calendar saved successfully');
    } catch (error) {
      console.error('Error saving calendar:', error);
      toast.error('Failed to save calendar');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Components
  const QuickActions = () => (
    <div className="flex justify-center gap-4">
      <Button
        variant="outline"
        onClick={() => setIsEditing(!isEditing)}
        className="flex items-center gap-2"
      >
        <Settings className="h-4 w-4" />
        {isEditing ? 'Preview Mode' : 'Edit Mode'}
      </Button>
      <Button
        onClick={handleSaveCalendar}
        className="flex items-center gap-2"
        disabled={isSaving}
      >
        {isSaving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {isSaving ? 'Saving...' : 'Save Calendar'}
      </Button>
    </div>
  );

  const Header = () => (
    <header className="relative w-full mb-8">
      <div className="bg-white/50 backdrop-blur-lg border border-gray-300 rounded-lg p-8">
        <div className="container mx-auto">
          <h1 className="text-center text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Calendar Generator
          </h1>
          <p className="text-center text-lg text-gray-600 mb-6">
            Create beautiful, customizable calendars for any occasion
          </p>
          <QuickActions />
        </div>
      </div>
    </header>
  );

  const TitleInput = () => (
    <div className="bg-white/50 backdrop-blur-lg border border-gray-300 rounded-lg p-6 mb-8">
      <div className="max-w-xl mx-auto">
        <Label htmlFor="calendar-title">Calendar Title</Label>
        <Input
          id="calendar-title"
          value={calendarTitle}
          onChange={(e) => setCalendarTitle(e.target.value)}
          className="text-lg font-medium"
          placeholder="Enter calendar title..."
        />
      </div>
    </div>
  );

  const ThemeAndStyleSection = () => (
    <Card className="bg-white/50 backdrop-blur-lg border border-gray-300 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Theme & Style
      </h2>
      <ThemeSelector
        currentTheme={settings.theme as string}
        currentMonth={currentMonth}
        onThemeSelect={(theme) => handleSettingsChange('theme', theme.id)}
      />
      <div className="mt-6">
        <CalendarStyleEditor
          value={{
            theme: getThemeOrDefault(settings.theme),
            frame: settings.frame,
            font: settings.font,
          }}
          onChange={(updatedSettings) => {
            setSettings((prev) => ({
              ...prev,
              ...updatedSettings,
            }));
          }}
        />
      </div>
    </Card>
  );

  const EventsSection = () => (
    <Card className="bg-white/50 backdrop-blur-lg border border-gray-300 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Events</h2>
      <EventTemplates onAddEvent={handleAddEvent} />
      <div className="mt-6">
        <RecurringEventForm onSubmit={handleRecurringEvents} />
      </div>
    </Card>
  );

  const LeftSidebar = () => (
    <div className="space-y-6">
      <ThemeAndStyleSection />
      <EventsSection />
    </div>
  );

  const CalendarPreview = () => (
    <div className="lg:col-span-2">
      <div className="bg-white/50 backdrop-blur-lg border border-gray-300 rounded-lg p-6">
        <CalendarToolbar
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onNextMonth={handleNextMonth}
          onPrevMonth={handlePrevMonth}
        />
        <div ref={calendarRef} className="mt-6">
          <CalendarGrid
            month={currentMonth}
            year={currentYear}
            events={events}
            theme={getThemeOrDefault(settings.theme).colors}
            settings={settings}
            isEditing={isEditing}
            onAddEvent={handleAddEvent}
            onRemoveEvent={handleRemoveEvent}
            onUpdateEvent={handleUpdateEvent}
          />
        </div>
      </div>
    </div>
  );

  const ExportActions = () => (
    <div className="mt-8 flex justify-between items-center">
      <PrintButton
        month={currentMonth}
        year={currentYear}
        events={events}
        settings={settings}
        theme={getThemeOrDefault(settings.theme)}
        title={calendarTitle}
      />
      <CalendarExport
        calendarRef={calendarRef}
        theme={getThemeOrDefault(settings.theme)}
        title={calendarTitle}
      />
    </div>
  );

  const MainContent = () => (
    <main className="container mx-auto px-6 py-8">
      <TitleInput />
      <div className="grid lg:grid-cols-3 gap-8">
        <LeftSidebar />
        <CalendarPreview />
      </div>
      <ExportActions />
    </main>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-blue-100/50 to-purple-100/50 opacity-75" />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Header />
        
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <TitleInput />
            <ThemeAndStyleSection />
            <EventsSection />
          </div>
          
          <div className="lg:col-span-8">
            <div className="sticky top-8">
              <CalendarPreview />
              <ExportActions />
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-6 shadow-xl">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-sm text-gray-500">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

const DEFAULT_THEME: CalendarTheme = {
  id: 'default',
  name: 'Default',
  value: 'default',
  colors: {
    primary: '#000000',
    secondary: '#666666',
    background: '#ffffff',
    text: '#000000',
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
  },
};