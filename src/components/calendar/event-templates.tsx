// src/components/calendar/event-templates.tsx
'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Card } from '@/components/UI/Card';
import { CalendarEvent, EventType } from '@/types/calendar';
import { Calendar, Bell, CheckSquare, Gift, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// Event template definitions
const EVENT_TEMPLATES = [
  {
    id: 'event',
    title: 'Event',
    type: 'event' as EventType,
    color: '#3B82F6',
    icon: Calendar,
    description: 'Regular calendar event'
  },
  {
    id: 'reminder',
    title: 'Reminder',
    type: 'reminder' as EventType,
    color: '#F59E0B',
    icon: Bell,
    description: 'Quick reminder or alert'
  },
  {
    id: 'task',
    title: 'Task',
    type: 'task' as EventType,
    color: '#10B981',
    icon: CheckSquare,
    description: 'Task or to-do item'
  },
  {
    id: 'birthday',
    title: 'Birthday',
    type: 'birthday' as EventType,
    color: '#EC4899',
    icon: Gift,
    description: 'Birthday celebration'
  },
  {
    id: 'holiday',
    title: 'Holiday',
    type: 'holiday' as EventType,
    color: '#8B5CF6',
    icon: Star,
    description: 'Holiday or special date'
  }
];

interface DraggableTemplateProps {
  template: typeof EVENT_TEMPLATES[number];
}

function DraggableTemplate({ template }: DraggableTemplateProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: template.id,
    data: {
      type: 'event-template',
      template: {
        type: template.type,
        color: template.color,
        title: template.title
      }
    }
  });

  const Icon = template.icon;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        'cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-50'
      )}
    >
      <div
        className={cn(
          'group flex items-center gap-3 rounded-lg p-3 transition-colors',
          'hover:bg-gray-50'
        )}
        style={{
          borderLeft: `4px solid ${template.color}`
        }}
      >
        <div
          className="rounded-md p-2"
          style={{ backgroundColor: `${template.color}20` }}
        >
          <Icon
            className="h-4 w-4"
            style={{ color: template.color }}
          />
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium text-sm">{template.title}</h4>
          <p className="text-xs text-gray-500">{template.description}</p>
        </div>

        <div
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded-full',
            'opacity-0 transition-opacity group-hover:opacity-100',
            'border border-dashed border-gray-300'
          )}
        >
          <span className="text-xs text-gray-400">+</span>
        </div>
      </div>
    </div>
  );
}

interface EventTemplatesProps {
  onAddEvent: (event: CalendarEvent) => void;
}

export function EventTemplates({ onAddEvent }: EventTemplatesProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h3 className="font-medium text-base">Event Templates</h3>
        <p className="text-sm text-gray-500">
          Drag and drop these templates onto the calendar
        </p>
      </div>

      <Card className="divide-y p-2">
        {EVENT_TEMPLATES.map((template) => (
          <DraggableTemplate
            key={template.id}
            template={template}
          />
        ))}
      </Card>

      <div className="rounded-lg border border-dashed p-4">
        <p className="text-center text-sm text-gray-500">
          Tip: You can also click the + button on any day to quickly add an event
        </p>
      </div>
    </div>
  );
}

export default EventTemplates;