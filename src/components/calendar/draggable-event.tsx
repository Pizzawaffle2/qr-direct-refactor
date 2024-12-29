// src/components/calendar/draggable-event.tsx
import { useDraggable } from '@dnd-kit/core';
import { CalendarEvent } from '@/types/calendar';
import { X } from 'lucide-react';

interface DraggableEventProps {
  event: CalendarEvent;
  isEditing: boolean;
  onRemove: (id: string) => void;
}

export const DraggableEvent = ({ event, isEditing, onRemove }: DraggableEventProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: event.id,
    data: event
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="group/event relative rounded-sm p-1.5 text-sm hover:bg-white/50 hover:ring-1 hover:ring-gray-200"
    >
      <span className="text-xs">{event.title}</span>
      {isEditing && (
        <button
          aria-label="Remove event"
          onClick={() => onRemove(event.id)}
          className="absolute -right-1 -top-1 h-5 w-5 opacity-0 group-hover/event:opacity-100"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};