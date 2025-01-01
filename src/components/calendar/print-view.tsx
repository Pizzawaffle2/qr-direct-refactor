// src/components/calendar/print-view.tsx
'use client';

import React from 'react';
import { CalendarEvent } from '@/types/calendar';

interface PrintViewProps {
  events: CalendarEvent[];
  month: number;
  year: number;
}

const PrintView: React.FC<PrintViewProps> = ({ events, month, year }) => {
  return (
    <div className="print-layout" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <style>
        {`
          @media print {
            .print-layout {
              page-break-inside: avoid;
              width: 100%;
              margin: 0;
              color: #000;
              font-size: 14px;
            }

            .print-header {
              text-align: center;
              margin-bottom: 20px;
              font-weight: bold;
              font-size: 18px;
            }

            .event-list {
              margin: 10px 0;
              padding: 10px;
              border: 1px solid #000;
              border-radius: 5px;
            }

            .event-item {
              margin-bottom: 10px;
            }
          }
        `}
      </style>

      <div className="print-header">
        Calendar for {new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}
      </div>

      <div className="event-list">
        {events.length === 0 ? (
          <p>No events scheduled</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-item">
              <p><strong>{event.title}</strong></p>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              {event.description && <p>Description: {event.description}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PrintView;
