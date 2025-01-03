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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/UI/Dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/UI/Collapsible';
import { Calendar as CalendarIcon, Search, PlusCircle, Trash2, PenSquare, X, Tag, ChevronDown } from 'lucide-react';

const EVENT_TYPES = [
  { value: 'event', label: 'Event', color: 'rgb(59, 130, 246)' },
  { value: 'reminder', label: 'Reminder', color: 'rgb(245, 158, 11)' },
  { value: 'task', label: 'Task', color: 'rgb(16, 185, 129)' },
  { value: 'birthday', label: 'Birthday', color: 'rgb(236, 72, 153)' },
  { value: 'holiday', label: 'Holiday', color: 'rgb(139, 92, 246)' }
] as const;

const initialEventState: Partial<CalendarEvent> = {
  title: '',
  date: new Date(),
  type: 'event',
  color: EVENT_TYPES[0].color,
  description: ''
};

interface EventFormProps {
  event: Partial<CalendarEvent>;
  onSubmit: (event: CalendarEvent) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

function EventForm({ event, onSubmit, onCancel, isEdit }: EventFormProps) {
  const [formData, setFormData] = useState<Partial<CalendarEvent>>(event);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.type) return;

    onSubmit({
      id: formData.id || crypto.randomUUID(),
      title: formData.title,
      date: formData.date,
      type: formData.type,
      color: formData.color || EVENT_TYPES[0].color,
      description: formData.description || ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter event title"
          required
        />
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.date ? format(formData.date, 'PPP') : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={(date) => date && setFormData({ ...formData, date })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label htmlFor="type">Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value: EventType) => setFormData({
            ...formData,
            type: value,
            color: EVENT_TYPES.find(t => t.value === value)?.color
          })}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            {EVENT_TYPES.map(type => (
              <SelectItem key={type.value} value={type.value}>
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: type.color }}
                  />
                  {type.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Add event description"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!formData.title}>
          {isEdit ? 'Save Changes' : 'Add Event'}
        </Button>
      </div>
    </form>
  );
}

function EventSection({ title, children, defaultOpen = true }: { 
  title: string; 
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

interface EventPanelProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onUpdateEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (eventId: string) => void;
}

export function EventPanel({ events, onAddEvent, onUpdateEvent, onDeleteEvent }: EventPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all');
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<CalendarEvent> | null>(null);

  const groupedEvents = useMemo(() => {
    const filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || event.type === selectedType;
      return matchesSearch && matchesType;
    });

    return filtered.reduce((acc, event) => {
      const today = new Date();
      const eventDate = new Date(event.date);
      
      if (eventDate < today) {
        acc.past.push(event);
      } else if (
        eventDate.getDate() === today.getDate() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear()
      ) {
        acc.today.push(event);
      } else {
        acc.upcoming.push(event);
      }
      
      return acc;
    }, { today: [], upcoming: [], past: [] } as Record<'today' | 'upcoming' | 'past', CalendarEvent[]>);
  }, [events, searchTerm, selectedType]);

  const handleEventSubmit = (event: CalendarEvent) => {
    if (editingEvent?.id) {
      onUpdateEvent(event);
    } else {
      onAddEvent(event);
    }
    setShowEventDialog(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setShowEventDialog(true);
  };

  const renderEventCard = (event: CalendarEvent) => (
    <Card
      key={event.id}
      className="p-3 flex items-start border-l-4"
      style={{ borderLeftColor: event.color }}
    >
      <div className="flex-grow">
        <h4 className="font-medium">{event.title}</h4>
        <div className="text-sm text-muted-foreground">
          <p className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {format(new Date(event.date), 'EEE, MMM d, yyyy')}
          </p>
          <p className="flex items-center">
            <Tag className="h-4 w-4 mr-1" />
            {EVENT_TYPES.find(t => t.value === event.type)?.label}
          </p>
        </div>
        {event.description && (
          <p className="text-sm mt-2">{event.description}</p>
        )}
      </div>
      <div className="ml-4 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleEditEvent(event)}
          aria-label="Edit event"
        >
          <PenSquare className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDeleteEvent(event.id)}
          aria-label="Delete event"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <EventSection title="Controls" defaultOpen={true}>
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events..."
              className="pl-9"
              aria-label="Search events"
            />
          </div>

          <Select
            value={selectedType}
            onValueChange={(value) => setSelectedType(value as EventType | 'all')}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {EVENT_TYPES.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: type.color }}
                    />
                    {type.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            onClick={() => {
              setEditingEvent(null);
              setShowEventDialog(true);
            }}
            className="bg-primary hover:bg-primary/90"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </EventSection>

      {groupedEvents.today.length > 0 && (
        <EventSection title="Today's Events" defaultOpen={true}>
          <div className="space-y-2">
            {groupedEvents.today.map(renderEventCard)}
          </div>
        </EventSection>
      )}

      {groupedEvents.upcoming.length > 0 && (
        <EventSection title="Upcoming Events" defaultOpen={true}>
          <div className="space-y-2">
            {groupedEvents.upcoming.map(renderEventCard)}
          </div>
        </EventSection>
      )}

      {groupedEvents.past.length > 0 && (
        <EventSection title="Past Events" defaultOpen={false}>
          <div className="space-y-2">
            {groupedEvents.past.map(renderEventCard)}
          </div>
        </EventSection>
      )}

      {Object.values(groupedEvents).every(group => group.length === 0) && (
        <div className="text-center py-8 text-muted-foreground">No events found</div>
      )}

      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
          </DialogHeader>
          <EventForm
            event={editingEvent || initialEventState}
            onSubmit={handleEventSubmit}
            onCancel={() => {
              setShowEventDialog(false);
              setEditingEvent(null);
            }}
            isEdit={!!editingEvent}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EventPanel;