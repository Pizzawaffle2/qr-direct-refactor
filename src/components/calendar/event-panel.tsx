// src/components/calendar/event-panel.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { CalendarEvent, EventType } from '@/types/calendar';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/Label';
import { Calendar } from '@/components/UI/Calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/Select';
import { Card } from '@/components/UI/Card';
import { Textarea } from '@/components/UI/Textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/UI/Popover';
import { Calendar as CalendarIcon, Search, Plus, Trash2, Edit2, X, Tag } from 'lucide-react';

const EVENT_TYPES = [
  { value: 'event' as EventType, label: 'Event', color: '#3B82F6' },
  { value: 'reminder' as EventType, label: 'Reminder', color: '#F59E0B' },
  { value: 'task' as EventType, label: 'Task', color: '#10B981' },
  { value: 'birthday' as EventType, label: 'Birthday', color: '#EC4899' },
  { value: 'holiday' as EventType, label: 'Holiday', color: '#8B5CF6' }
];

interface EventPanelProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onUpdateEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (eventId: string) => void;
}

export function EventPanel({ events, onAddEvent, onUpdateEvent, onDeleteEvent }: EventPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all');
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    date: new Date(),
    type: 'event',
    color: EVENT_TYPES[0].color
  });

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || event.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [events, searchTerm, selectedType]);

  const handleAddEvent = () => {
    if (!newEvent.title) return;
    onAddEvent({
      ...newEvent as CalendarEvent,
      id: crypto.randomUUID()
    });
    setNewEvent({
      title: '',
      date: new Date(),
      type: 'event',
      color: EVENT_TYPES[0].color
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events..."
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={selectedType}
            onValueChange={(value) => setSelectedType(value as EventType | 'all')}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {EVENT_TYPES.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={() => setShowAddForm(true)} className="flex-shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {filteredEvents.map(event => (
          <Card
            key={event.id}
            className={`flex items-center justify-between p-3 border-l-4`}
            style={{"--event-color": event.color} as React.CSSProperties}
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{event.title}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CalendarIcon className="h-3 w-3" />
                {format(new Date(event.date), 'PPP')}
                <Tag className="h-3 w-3" />
                {EVENT_TYPES.find(t => t.value === event.type)?.label}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditingEvent(event)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteEvent(event.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No events found
          </div>
        )}
      </div>

      {showAddForm && (
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Add New Event</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAddForm(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Enter event title"
              />
            </div>

            <div>
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newEvent.date ? format(newEvent.date, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newEvent.date}
                    onSelect={(date) => date && setNewEvent({ ...newEvent, date })}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Type</Label>
              <Select
                value={newEvent.type}
                onValueChange={(value) => setNewEvent({ 
                  ...newEvent, 
                  type: value as EventType,
                  color: EVENT_TYPES.find(t => t.value === value)?.color
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Description (Optional)</Label>
              <Textarea
                value={newEvent.description || ''}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Add event description"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddEvent}
                disabled={!newEvent.title}
              >
                Add Event
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default EventPanel;