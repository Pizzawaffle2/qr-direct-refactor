// src/app/bio-link/components/analytics/Analytics.tsx
import { TimeFrame } from 'src/app/bio-links/types';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Users, MousePointer, Clock } from 'lucide-react';
import { MetricCard } from './MetricCard';

interface ViewData {
  date: string;
  views: number;
}

interface LinkPerformance {
  linkId: string;
  title: string;
  clicks: number;
  percentage: number;
}

interface AnalyticsProps {
  viewHistory: ViewData[];
  totalViews: number;
  uniqueVisitors: number;
  totalClicks: number;
  linkPerformance: LinkPerformance[];
}

export function Analytics({
  viewHistory,
  totalViews,
  uniqueVisitors,
  totalClicks,
  linkPerformance
}: AnalyticsProps) {
  const [timeframe, setTimeframe] = useState<TimeFrame>('7d');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          icon={<Users className="w-5 h-5" />}
          label="Total Views"
          value={totalViews}
          trend={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          icon={<Users className="w-5 h-5" />}
          label="Unique Visitors"
          value={uniqueVisitors}
        />
        <MetricCard
          icon={<MousePointer className="w-5 h-5" />}
          label="Total Clicks"
          value={totalClicks}
        />
        <MetricCard
          icon={<Clock className="w-5 h-5" />}
          label="Avg. Time on Page"
          value="2:30"
        />
      </div>

      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">View History</h3>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as TimeFrame)}
            className="px-3 py-1 border rounded-md"
            title='Timeframe'
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={viewHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="font-medium mb-4">Link Performance</h3>
        <div className="space-y-4">
          {linkPerformance.map((link) => (
            <div key={link.linkId} className="flex justify-between items-center">
              <span className="truncate flex-1">{link.title}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{link.clicks} clicks</span>
                <div className="relative w-24 h-2 bg-blue-100 rounded-full">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-blue-500"
                    style={{ width: `${link.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}