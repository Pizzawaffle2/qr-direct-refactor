
// And update event-templates.tsx similarly:
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Card } from '@/components/UI/Card';

const EVENT_TEMPLATES = [
  { id: 'meeting', title: 'Meeting', color: 'blue' },
  { id: 'task', title: 'Task', color: 'green' },
  { id: 'reminder', title: 'Reminder', color: 'yellow' },
];

interface Template {
  id: string;
  title: string;
  color: string;
}

function DraggableTemplate({ template }: { template: Template }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: template.id,
    data: template
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-pointer p-2 rounded-lg text-white hover:shadow-md"
      style={{ 
        backgroundColor: template.color,
        opacity: isDragging ? 0.5 : 1 
      }}
    >
      {template.title}
    </div>
  );
}

export function EventTemplates() {
  return (
    <Card className="p-4">
      <div className="mb-4">
        <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200">Event Templates</h3>
      </div>
      <div className="space-y-3">
        {EVENT_TEMPLATES.map((template) => (
          <DraggableTemplate key={template.id} template={template} />
        ))}
      </div>
    </Card>
  );
}