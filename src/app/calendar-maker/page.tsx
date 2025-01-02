// src/app/calendar-maker/page.tsx
'use client';

import { useState, useRef, useCallback } from 'react';
import { DndContext } from '@dnd-kit/core';
import { toast } from 'react-hot-toast';
import { Settings, Save, Loader2, Calendar } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/input';
import { Card } from '@/components/UI/Card';
import { Tabs, TabContent } from '@/components/UI/tabs';

// Import all components
import { CalendarNav } from '@/components/calendar/calendar-nav';
import { CalendarGrid } from '@/components/calendar/calendar-grid';
import { CalendarToolbar } from '@/components/calendar/calendar-toolbar';
import { ThemeSelector } from '@/components/calendar/theme-selector';
import { StyleEditor } from '@/components/calendar/style-editor';
import { EventPanel } from '@/components/calendar/event-panel';
import { EventTemplates } from '@/components/calendar/event-templates';
import { RecurringEventForm, createRecurringEvents } from '@/components/calendar/recurring-events';
import { CalendarExport } from '@/components/calendar/calendar-export';
import { PrintView } from '@/components/calendar/print-view';
import { WeatherDisplay, mockWeatherService } from '@/components/calendar/weather-display';
import { HolidayManager, HolidayCell } from '@/components/calendar/holiday-display';
import { ThemeFrame, getFrameTypeForDate } from '@/components/calendar/frame-patterns';

// Import types
import {
  CalendarEvent,
  CalendarSettings,
  CalendarTheme,
  RecurringEventProps,
  Holiday,
  WeatherData,
  DEFAULT_THEME,
  DEFAULT_SETTINGS
} from '@/types/calendar';

// Header Component
function CalendarHeader({ 
  title, 
  isEditing, 
  onEditToggle, 
  onSave, 
  onTitleChange 
}: { 
  title: string;
  isEditing: boolean;
  onEditToggle: () => void;
  onSave: () => void;
  onTitleChange: (title: string) => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[rgba(var(--background-start),0.8)] dark:bg-[rgba(var(--background-end),0.8)] backdrop-blur-sm border-b border-[rgb(var(--border))]">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400">
            Calendar Generator
          </h1>
          <Input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-64 text-sm bg-[rgba(var(--background-start),0.5)] dark:bg-[rgba(var(--background-end),0.5)]"
            placeholder="Enter calendar title..."
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEditToggle}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            {isEditing ? 'Preview' : 'Edit'}
          </Button>
          <Button
            size="sm"
            onClick={onSave}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
    </header>
  );
}

// Loading Overlay Component
function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(var(--foreground),0.5)] dark:bg-[rgba(var(--background-start),0.7)]">
      <Card className="bg-[rgba(var(--background-start),0.8)] dark:bg-[rgba(var(--background-end),0.8)] backdrop-blur-sm p-6">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto dark:text-blue-400" />
        <p className="mt-2 text-sm text-[rgb(var(--muted-foreground))] dark:text-[rgb(var(--foreground))] text-center">
          Loading...
        </p>
      </Card>
    </div>
  );
}

// Main Calendar Page Component
export default function CalendarPage() {
  const calendarRef = useRef<HTMLDivElement>(null!) as React.RefObject<HTMLDivElement>;
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [settings, setSettings] = useState<CalendarSettings>({
    ...DEFAULT_SETTINGS,
    theme: DEFAULT_THEME.id || 'default'
  });
  const [calendarTitle, setCalendarTitle] = useState('My Calendar');
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('customize');
  const [showPrintView, setShowPrintView] = useState(false);
  const [weather, setWeather] = useState<Record<string, WeatherData>>({});

  // Handle saving calendar
  const handleSaveCalendar = async () => {
    try {
      setIsLoading(true);
      const calendarData = {
        title: calendarTitle,
        events,
        holidays,
        settings,
        currentMonth,
        currentYear,
        weather
      };
      localStorage.setItem('savedCalendar', JSON.stringify(calendarData));
      toast.success('Calendar saved successfully');
    } catch (error) {
      console.error('Failed to save calendar:', error);
      toast.error('Failed to save calendar');
    } finally {
      setIsLoading(false);
    }
  };

  // Event handlers
  const handleSettingsChange = (key: keyof CalendarSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
    toast.success('Event added successfully');
  };

  const handleRemoveEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    toast.success('Event removed');
  };

  const handleUpdateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    toast.success('Event updated');
  };

  const handleRecurringEvents = (events: CalendarEvent[]) => {
    setEvents(prev => [...prev, ...events]);
    toast.success('Recurring events added');
  };

  const handleAddHoliday = (holiday: Holiday) => {
    setHolidays(prev => [...prev, holiday]);
    toast.success('Holiday added');
  };

  const handleRemoveHoliday = (holidayId: string) => {
    setHolidays(prev => prev.filter(h => h.id !== holidayId));
    toast.success('Holiday removed');
  };

  // Navigation handlers
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  // Theme helper
  const getThemeOrDefault = useCallback((themeValue: string): CalendarTheme => {
    return DEFAULT_THEME;
  }, []);

  // Handle drag and drop
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    if (active.data.current?.type === 'event-template') {
      const template = active.data.current.template;
      const date = new Date(over.id);
      handleAddEvent({
        id: crypto.randomUUID(),
        title: template.title,
        date,
        type: template.type,
        color: template.color
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <CalendarHeader
        title={calendarTitle}
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
        onSave={handleSaveCalendar}
        onTitleChange={setCalendarTitle}
      />

      <main className="container mx-auto px-4 pt-20 pb-8">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-12 gap-4">
            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              <Tabs
                activeTab={activeTab}
                onChange={setActiveTab}
                tabs={[
                  { id: 'customize', label: 'Customize', icon: Settings },
                  { id: 'events', label: 'Events', icon: Calendar }
                ]}
              >
                <TabContent tabId="customize" activeTab={activeTab}>
                  <Card className="p-4 space-y-6">
                    <ThemeSelector
                      currentTheme={settings.theme}
                      currentMonth={currentMonth}
                      onThemeSelect={(theme) => handleSettingsChange('theme', theme.id)}
                    />
                    <StyleEditor
                      value={{
                        firstDayOfWeek: settings.firstDayOfWeek.toString() as "0" | "1",
                        showWeekNumbers: settings.showWeekNumbers,
                        theme: getThemeOrDefault(settings.theme),
                        monthsPerRow: 1,
                        options: {
                          showLunarPhases: settings.showLunarPhases,
                          showHolidays: settings.showHolidays,
                          showWeather: settings.showWeather,
                          showNotes: false
                        }
                      }}
                      onChange={(updatedSettings) => {
                        Object.entries(updatedSettings).forEach(([key, value]) => {
                          handleSettingsChange(key as keyof CalendarSettings, value);
                        });
                      }}
                    />
                  </Card>
                </TabContent>

                <TabContent tabId="events" activeTab={activeTab}>
                  <Card className="p-4 space-y-6">
                    <EventTemplates onAddEvent={handleAddEvent} />
                    <EventPanel
                      events={events}
                      onAddEvent={handleAddEvent}
                      onUpdateEvent={handleUpdateEvent}
                      onDeleteEvent={handleRemoveEvent}
                    />
                    <RecurringEventForm onSubmit={handleRecurringEvents} />
                    <HolidayManager
                      holidays={holidays}
                      onAddHoliday={handleAddHoliday}
                      onRemoveHoliday={handleRemoveHoliday}
                    />
                  </Card>
                </TabContent>
              </Tabs>
            </div>

            {/* Main Content */}
            <div className="col-span-12 lg:col-span-9">
              <Card className="p-4">
                <CalendarToolbar
                  currentMonth={currentMonth}
                  currentYear={currentYear}
                  settings={settings}
                  onSettingsChange={handleSettingsChange}
                  onNextMonth={handleNextMonth}
                  onPrevMonth={handlePrevMonth}
                />

                <div className="mt-4" ref={calendarRef}>
                  <ThemeFrame
                    type={getFrameTypeForDate(new Date(currentYear, currentMonth))}
                    color={getThemeOrDefault(settings.theme).colors.primary}
                    className="rounded-lg"
                  >
                    <CalendarGrid
                      month={currentMonth}
                      year={currentYear}
                      events={events}
                      settings={settings}
                      theme={getThemeOrDefault(settings.theme)}
                      isEditing={isEditing}
                      onAddEvent={handleAddEvent}
                      onRemoveEvent={handleRemoveEvent}
                      onUpdateEvent={handleUpdateEvent}
                    />
                  </ThemeFrame>
                </div>
              </Card>

              <div className="mt-4 flex justify-end gap-2">
                <CalendarExport
                  calendarRef={calendarRef}
                  theme={getThemeOrDefault(settings.theme)}
                  title={calendarTitle}
                />
              </div>
            </div>
          </div>
        </DndContext>
      </main>

      {/* Print View */}
      {showPrintView && (
        <PrintView
          theme={getThemeOrDefault(settings.theme)}
          events={events}
          settings={settings}
          title={calendarTitle}
          month={currentMonth}
          year={currentYear}
          onClose={() => setShowPrintView(false)}
        />
      )}

      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
}