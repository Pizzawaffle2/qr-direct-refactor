// src/app/calendar-maker/page.tsx
'use client';

import { useState, useRef, useCallback } from 'react';
import { Settings, Save, Loader2, Calendar } from 'lucide-react';
import { DndContext } from '@dnd-kit/core';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/input';
import { Card } from '@/components/UI/Card';
import { Tabs, TabContent } from '@/components/UI/tabs';
import { CalendarGrid } from '@/components/calendar/calendar-grid';
import { CalendarTheme, CalendarSettings, CalendarEvent, DEFAULT_THEME, DEFAULT_SETTINGS } from '@/types/calendar';
interface HeaderProps {
  title: string;
  isEditing: boolean;
  onEditToggle: () => void;
  onSave: () => void;
  onTitleChange: (title: string) => void;
}

function Header({ title, isEditing, onEditToggle, onSave, onTitleChange }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b dark:bg-gray-900/80">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Calendar Generator
          </h1>
          <Input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-64 text-sm bg-white/50 dark:bg-gray-800/50"
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

function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
        <p className="mt-2 text-sm text-gray-500 text-center">Loading...</p>
      </Card>
    </div>
  );
}

export default function CalendarMaker() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [settings, setSettings] = useState<CalendarSettings>(DEFAULT_SETTINGS);
  const [calendarTitle, setCalendarTitle] = useState('My Calendar');
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('customize');

  const handleSaveCalendar = async () => {
    try {
      setIsLoading(true);
      const calendarData = {
        title: calendarTitle,
        events,
        settings,
        currentMonth,
        currentYear
      };
      localStorage.setItem('savedCalendar', JSON.stringify(calendarData));
      toast.success('Calendar saved successfully');
    } catch (error) {
      toast.error('Failed to save calendar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsChange = (key: keyof CalendarSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
    toast.success('Event added');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <Header
        title={calendarTitle}
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
        onSave={handleSaveCalendar}
        onTitleChange={setCalendarTitle}
      />

      <main className="container mx-auto px-4 pt-20 pb-8">
        <DndContext onDragEnd={(event) => {/* Implement drag handling */}}>
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
                  <Card className="p-4">
                    {/* Theme and Settings Content */}
                  </Card>
                </TabContent>

                <TabContent tabId="events" activeTab={activeTab}>
                  <Card className="p-4">
                    {/* Event Management Content */}
                  </Card>
                </TabContent>
              </Tabs>
            </div>

            {/* Main Calendar */}
            <div className="col-span-12 lg:col-span-9">
              <Card className="p-4">
                <div ref={calendarRef}>
                  <CalendarGrid
                    month={currentMonth}
                    year={currentYear}
                    events={events}
                    settings={settings}
                    theme={DEFAULT_THEME}
                    isEditing={isEditing}
                    onAddEvent={handleAddEvent}
                    onRemoveEvent={handleRemoveEvent}
                    onUpdateEvent={handleUpdateEvent}
                  />
                </div>
              </Card>
            </div>
          </div>
        </DndContext>
      </main>

      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
}