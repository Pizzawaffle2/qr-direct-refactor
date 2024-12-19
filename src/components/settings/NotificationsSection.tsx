// src/components/settings/NotificationsSection.tsx
'use client';

import { useState } from 'react';
import { 
  Bell,
  Smartphone,
  Mail,
  Zap,
  Shield,
  BarChart,
  Calendar,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

interface NotificationChannel {
  email: boolean;
  push: boolean;
  slack?: boolean;
}

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  channels: NotificationChannel;
  priority: 'high' | 'normal' | 'low';
}

export function NotificationsSection() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'qr_scans',
      title: 'QR Code Scans',
      description: 'Get notified when someone scans your QR codes',
      icon: Zap,
      channels: { email: true, push: true },
      priority: 'high'
    },
    {
      id: 'security_alerts',
      title: 'Security Alerts',
      description: 'Important security notifications about your account',
      icon: Shield,
      channels: { email: true, push: true },
      priority: 'high'
    },
    {
      id: 'analytics_reports',
      title: 'Analytics Reports',
      description: 'Weekly summary of your QR code performance',
      icon: BarChart,
      channels: { email: true, push: false },
      priority: 'normal'
    },
    {
      id: 'calendar_reminders',
      title: 'Calendar Reminders',
      description: 'Reminders about upcoming calendar events',
      icon: Calendar,
      channels: { email: true, push: true },
      priority: 'normal'
    },
    {
      id: 'usage_alerts',
      title: 'Usage Alerts',
      description: 'Notifications when you approach usage limits',
      icon: Clock,
      channels: { email: true, push: true },
      priority: 'normal'
    }
  ]);

  const handleToggleChannel = async (settingId: string, channel: keyof NotificationChannel) => {
    try {
      setSettings(settings.map(setting => {
        if (setting.id === settingId) {
          return {
            ...setting,
            channels: {
              ...setting.channels,
              [channel]: !setting.channels[channel]
            }
          };
        }
        return setting;
      }));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Notification preferences updated');
    } catch (error) {
      toast.error('Failed to update notification preferences');
    }
  };

  const handleSaveAll = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/notification-preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });

      if (!response.ok) throw new Error('Failed to update settings');
      toast.success('Notification preferences saved');
    } catch (error) {
      console.error('Error saving notification preferences:', error);
      toast.error('Failed to save preferences');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Notification Preferences</h2>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* Channel Legend */}
      <div className="flex gap-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Email</span>
        </div>
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Push Notifications</span>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="space-y-4">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="p-4 border rounded-lg hover:border-blue-200 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <setting.icon className="w-5 h-5 text-blue-500" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{setting.title}</h3>
                  {setting.priority === 'high' && (
                    <span className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded-full">
                      High Priority
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                
                {/* Channel Toggles */}
                <div className="flex gap-4 mt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={setting.channels.email}
                      onChange={() => handleToggleChannel(setting.id, 'email')}
                      className="sr-only peer"
                      aria-label={`Toggle email notifications for ${setting.title}`}
                    />
                    <div className="relative w-10 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    <Mail className="w-4 h-4 text-gray-500" />
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={setting.channels.push}
                      onChange={() => handleToggleChannel(setting.id, 'push')}
                      className="sr-only peer"
                      aria-label={`Toggle push notifications for ${setting.title}`}
                    />
                    <div className="relative w-10 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    <Smartphone className="w-4 h-4 text-gray-500" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Email Digest Settings */}
      <div className="border-t pt-6">
        <h3 className="font-medium mb-4">Email Digest Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Weekly Summary</div>
              <div className="text-sm text-gray-600">Receive a weekly summary of your QR code activity</div>
            </div>
            <select
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue="monday"
            >
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="friday">Friday</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Time Zone</div>
              <div className="text-sm text-gray-600">Set your preferred time zone for notifications</div>
            </div>
            <select
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue="UTC"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}