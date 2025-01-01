// src/components/calendar/event-panel.tsx
'use client';

import React, { useState } from 'react';
import { CalendarEvent } from '@/types/calendar';
import { Input } from '@/components/UI/input';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';

interface EventPanelProps {
  events: CalendarEvent[];
  onUpdateEvent: (event: CalendarEvent) => void;
  onRemoveEvent: (id: string) => void;
}

const EventPanel: React.FC<EventPanelProps> = ({ events, onUpdateEvent, onRemoveEvent }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Events</h3>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search events..."
          className="w-1/2"
        />
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-sm text-gray-500">No events found</p>
      ) : (
        <div className="space-y-2">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="p-4 flex justify-between items-center">
              <div className="flex-1">
                <h4 className="font-medium text-base">{event.title}</h4>
                <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
              </div>
              <div className="space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    onUpdateEvent({ ...event, title: prompt('Edit event title', event.title) || event.title })
                  }
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onRemoveEvent(event.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventPanel;
