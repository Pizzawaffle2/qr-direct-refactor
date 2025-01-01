// src/app/calendar-maker/page.tsx
'use client';

import { useState, useRef, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { DndContext } from '@dnd-kit/core';
import { Settings, Save, Loader2, Palette, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/input';
import { Card } from '@/components/UI/Card';
import { Tabs, TabContent } from '@/components/UI/tabs';
import ThemeSelector from '@/components/calendar/theme-selector';
import StyleEditor from '@/components/calendar/style-editor';
import CalendarGrid from '@/components/calendar/calendar-grid';
import EventTemplates from '@/components/calendar/event-templates';
import EventPanel from '@/components/calendar/event-panel';
import CalendarExport from '@/components/calendar/calendar-export';
import PrintView from '@/components/calendar/print-view';
import CalendarToolbar from '@/components/calendar/calendar-toolbar';
import RecurringEvents from '@/components/calendar/recurring-events';
import WeatherDisplay from '@/components/calendar/weather-display';
import HolidayDisplay from '@/components/calendar/holiday-display';
import FramePatterns from '@/components/calendar/frame-patterns';

export default function CalendarMakerPage() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const [calendarTitle, setCalendarTitle] = useState('My Calendar');
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('customize');
  const [settings] = useState({
    firstDayOfWeek: 0,
    showWeekNumbers: false,
    theme: {
      colors: {
        primary: '#000000',
        secondary: '#ffffff'
      }
    },
    monthsPerRow: 1,
    options: {
      showLunarPhases: false,
      showHolidays: true,
      showWeather: false,
      showNotes: true
    }
  });

  const handleSaveCalendar = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem(
        'calendarData',
        JSON.stringify({
          title: calendarTitle,
          events,
          currentMonth,
          currentYear,
        })
      );
      toast.success('Calendar saved successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save calendar.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Calendar Maker</h1>
            <Input
              value={calendarTitle}
              onChange={(e) => setCalendarTitle(e.target.value)}
              className="w-64"
              placeholder="Calendar Title"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? 'Preview' : 'Edit'}
            </Button>
            <Button size="sm" onClick={handleSaveCalendar}>Save</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-20 pb-8">
        <DndContext>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-3">
            <Tabs
  activeTab={activeTab}
  onChange={setActiveTab}
  tabs={[
    { id: 'customize', label: 'Customize', icon: Palette },
    { id: 'events', label: 'Events', icon: CalendarIcon },
  ]}
>
  <TabContent tabId="customize" activeTab={activeTab}>
    <ThemeSelector
      currentTheme="default"
      currentMonth={currentMonth}
      onThemeSelect={(theme) => {
        console.log('Selected theme:', theme);
      }}
      settings={{
        firstDayOfWeek: 0,
        showWeekNumbers: false,
        theme: {
          colors: {
            primary: '#000000',
            secondary: '#ffffff'
          }
        },
        monthsPerRow: 1,
        options: {
          showLunarPhases: false,
          showHolidays: true,
          showWeather: false,
          showNotes: true
        }
      }}
    />
    <StyleEditor
      value={{
        id: 'default',
        name: 'Default',
        value: { fontSize: '16px', color: '#000' },
        colors: {
          primary: '#000000',
          secondary: '#ffffff'
        },
        font: 'Arial',
        spacing: 'normal'
      }}
      onChange={(newStyles) => {
        console.log('Updated styles:', newStyles);
      }}
    />
    <FramePatterns onFrameSelect={(frame) => {
      console.log('Selected frame:', frame);
    }} />
  </TabContent>

  <TabContent tabId="events" activeTab={activeTab}>
    <EventTemplates onAddEvent={(event) => {
      console.log('Added event:', event);
    }} />
    <RecurringEvents onAddRecurringEvent={(recurringEvent) => {
      console.log('Added recurring event:', recurringEvent);
    }} />
    <EventPanel
      events={events}
      onUpdateEvent={(updatedEvent) => {
        console.log('Updated event:', updatedEvent);
      }}
      onRemoveEvent={(eventId) => {
        console.log('Removed event ID:', eventId);
      }}
    />
  </TabContent>
</Tabs>

            </div>

            <div className="col-span-12 lg:col-span-9">
              <CalendarToolbar
                currentView="month"
                onTodayClick={() => {}}
                onViewChange={() => {}}
                onSettingsClick={() => {}}
              />

              <Card>
                <CalendarGrid
                    month={currentMonth}
                    year={currentYear}
                    events={events}
                    settings={{
                      firstDayOfWeek: 0,
                      showWeekNumbers: false,
                      theme: {
                        colors: {
                          primary: '#000000',
                          secondary: '#ffffff'
                        }
                      },
                      monthsPerRow: 1,
                      options: {
                        showLunarPhases: false,
                        showHolidays: true,
                        showWeather: false,
                        showNotes: true
                      }
                    }}
                    theme={{}}
                    isEditing={isEditing}
                    onAddEvent={() => {}}
                    onRemoveEvent={() => {}}
                    onUpdateEvent={() => {}}
                  />
              </Card>

              <div className="mt-4">
                <WeatherDisplay location="San Francisco" />
                <HolidayDisplay
                  month={currentMonth}
                  year={currentYear}
                  onAddCustomHoliday={() => {}}
                />
                <PrintView month={currentMonth} year={currentYear} events={events} />
                <CalendarExport events={events} />
              </div>
            </div>
          </div>
        </DndContext>
      </main>
    </div>
  );
}
function onRemoveEvent(id: string): void {
  setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  toast.success('Event removed successfully');
}

