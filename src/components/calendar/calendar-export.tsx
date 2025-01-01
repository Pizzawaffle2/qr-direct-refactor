// src/components/calendar/calendar-export.tsx
'use client';

import React, { useState } from 'react';
import { CalendarEvent } from '@/types/calendar';
import { Button } from '@/components/UI/Button';

interface CalendarExportProps {
  events: CalendarEvent[];
}

const CalendarExport: React.FC<CalendarExportProps> = ({ events }) => {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv' | 'ics'>('pdf');

  const handleExport = () => {
    const data = JSON.stringify(events, null, 2);

    let fileContent = '';
    let fileType = '';

    if (exportFormat === 'csv') {
      fileContent = events
        .map(event => `${event.title},${event.date},${event.type}`)
        .join('\n');
      fileType = 'text/csv';
    } else if (exportFormat === 'ics') {
      fileContent = events
        .map(event =>
          `BEGIN:VEVENT\nSUMMARY:${event.title}\nDTSTART:${new Date(event.date).toISOString()}\nEND:VEVENT`
        )
        .join('\n');
      fileType = 'text/calendar';
    } else {
      fileContent = data;
      fileType = 'application/json';
    }

    const blob = new Blob([fileContent], { type: fileType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `calendar_export.${exportFormat}`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Export Calendar</h3>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Select Format</label>
        <select
          value={exportFormat}
          onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'csv' | 'ics')}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          aria-label="Export format selection"
        >
          <option value="pdf">PDF</option>
          <option value="csv">CSV</option>
          <option value="ics">ICS</option>
        </select>
      </div>
      <Button onClick={handleExport} className="w-full">
        Export Calendar
      </Button>
    </div>
  );
};

export default CalendarExport;
