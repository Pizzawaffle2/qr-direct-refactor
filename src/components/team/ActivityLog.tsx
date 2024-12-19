// src/components/team/ActivityLog.tsx
import { useState } from 'react';
import { Clock, User, Shield, Link, QrCode } from 'lucide-react';
import { TableSkeleton } from './TableSkeleton';

interface ActivityEvent {
  id: string;
  type: 'member_joined' | 'role_changed' | 'member_removed' | 'qr_created' | 'link_created';
  actor: string;
  target?: string;
  details?: string;
  timestamp: Date;
}

const EVENT_ICONS = {
  member_joined: User,
  role_changed: Shield,
  member_removed: User,
  qr_created: QrCode,
  link_created: Link
};

export function ActivityLog() {
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const getEventDescription = (event: ActivityEvent) => {
    switch (event.type) {
      case 'member_joined':
        return `${event.actor} joined the team`;
      case 'role_changed':
        return `${event.actor} updated ${event.target}'s role to ${event.details}`;
      case 'member_removed':
        return `${event.actor} removed ${event.target} from the team`;
      case 'qr_created':
        return `${event.actor} created a new QR code`;
      case 'link_created':
        return `${event.actor} created a new short link`;
      default:
        return 'Unknown activity';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-3 border-b">
        <h3 className="font-medium">Recent Activity</h3>
      </div>
      <div className="divide-y">
        {activities.map((activity) => {
          const Icon = EVENT_ICONS[activity.type];
          return (
            <div key={activity.id} className="px-4 py-3 flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Icon className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  {getEventDescription(activity)}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}

        {loading && <TableSkeleton />}
        
        {!loading && activities.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-500">
            No recent activity
          </div>
        )}
      </div>
    </div>
  );
}