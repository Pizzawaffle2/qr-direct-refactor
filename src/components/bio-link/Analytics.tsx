// src/app/bio-link/components/Analytics.tsx
'use client';

import { useState } from 'react';
import { Line, Pie } from 'recharts';
import { Calendar, Users, MousePointer, Clock } from 'lucide-react';

interface AnalyticsData {
  views: {
    total: number;
    unique: number;
    history: Array<{ date: string; views: number }>;
  };
  clicks: {
    total: number;
    byLink: Array<{ linkId: string; title: string; clicks: number }>;
  };
  locations: Array<{ country: string; count: number }>;
  devices: Array<{ type: string; count: number }>;
}

export function Analytics({ data }: { data: AnalyticsData }) {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('7d');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-2xl font-bold">{data.views.total}</p>
            </div>
          </div>
        </div>
        {/* Add similar cards for unique views, total clicks, and conversion rate */}
      </div>

      {/* View History Chart */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">View History</h3>
          <label htmlFor="timeframe-select" className="sr-only">Select Timeframe</label>
          <select
            id="timeframe-select"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as typeof timeframe)}
            className="px-3 py-1 border rounded-md"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
        <Line
          data={data.views.history}
          width={600}
          height={300}
        />
      </div>

      {/* Link Performance */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="font-medium mb-4">Link Performance</h3>
        <div className="space-y-4">
          {data.clicks.byLink.map((link) => (
            <div key={link.linkId} className="flex justify-between items-center">
              <span className="truncate flex-1">{link.title}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{link.clicks} clicks</span>
                <div 
                  className="h-2 bg-blue-100 rounded-full w-24"
                  style={{
                    width: `${(link.clicks / data.clicks.total) * 100}%`,
                    backgroundColor: '#3B82F6'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}