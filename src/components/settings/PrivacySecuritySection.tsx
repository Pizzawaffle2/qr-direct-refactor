// src/components/settings/PrivacySecuritySection.tsx
'use client';

import { useState } from 'react';
import { Shield, Lock, Eye, AlertTriangle, Bell, History } from 'lucide-react';
import toast from 'react-hot-toast';

type PrivacySettings = {
  publicProfile: boolean;
  searchable: boolean;
  showQRHistory: boolean;
  shareAnalytics: boolean;
};

type SecuritySettings = {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  activityAlerts: boolean;
  apiAccessAlerts: boolean;
};

type Settings = {
  privacy: PrivacySettings;
  security: SecuritySettings;
};

export function PrivacySecuritySection() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    privacy: {
      publicProfile: false,
      shareAnalytics: true,
      searchable: true,
      showQRHistory: false
    },
    security: {
      twoFactorEnabled: false,
      loginNotifications: true,
      activityAlerts: true,
      apiAccessAlerts: true
    }
  });

  const handleToggle = async (category: 'privacy' | 'security', setting: keyof PrivacySettings | keyof SecuritySettings) => {
    setLoading(true);
    try {
      const newValue = !settings[category][setting as keyof (PrivacySettings | SecuritySettings)];
      
      const response = await fetch('/api/user/privacy-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          setting,
          value: newValue
        })
      });

      if (!response.ok) throw new Error('Failed to update settings');

      setSettings({
        ...settings,
        [category]: {
          ...settings[category],
          [setting]: newValue
        }
      });

      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Privacy Settings */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Eye className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Privacy</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(settings.privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div>
                <h3 className="font-medium">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {getPrivacyDescription(key as keyof PrivacySettings)}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleToggle('privacy', key as keyof PrivacySettings)}
                  disabled={loading}
                  className="sr-only peer"
                  title={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="pt-8 border-t">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Security</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(settings.security).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div>
                <h3 className="font-medium">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {getSecurityDescription(key as keyof SecuritySettings)}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleToggle('security', key as keyof SecuritySettings)}
                  disabled={loading}
                  className="sr-only peer"
                  title={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Connected Sessions */}
      <div className="pt-8 border-t">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Active Sessions</h2>
          </div>
          <button 
            className="text-sm text-red-500 hover:text-red-600"
            onClick={() => {
              // Handle logging out all other sessions
              toast.success('Logged out of all other sessions');
            }}
          >
            Sign out all other sessions
          </button>
        </div>

        <div className="space-y-3">
          {[
            { device: 'MacBook Pro', location: 'New York, US', current: true },
            { device: 'iPhone 12', location: 'New York, US', current: false },
            { device: 'Windows PC', location: 'Boston, US', current: false },
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{session.device}</span>
                  {session.current && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                      Current
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">{session.location}</div>
              </div>
              {!session.current && (
                <button 
                  className="text-sm text-red-500 hover:text-red-600"
                  onClick={() => {
                    // Handle session termination
                    toast.success(`Signed out of ${session.device}`);
                  }}
                >
                  Sign out
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Descriptions for privacy settings
const privacyDescriptions = {
  publicProfile: 'Allow others to view your public profile and QR codes',
  shareAnalytics: 'Share anonymous usage data to help improve our services',
  searchable: 'Allow your profile to appear in search results',
  showQRHistory: 'Show your QR code creation history on your public profile'
};

// Descriptions for security settings
const securityDescriptions = {
  twoFactorEnabled: 'Require a verification code when signing in',
  loginNotifications: 'Get notified of new sign-ins to your account',
  activityAlerts: 'Receive alerts for important account activities',
  apiAccessAlerts: 'Get notified when your API keys are used'
};

// Helper functions for descriptions
function getPrivacyDescription(key: keyof typeof privacyDescriptions): string {
  return privacyDescriptions[key];
}

function getSecurityDescription(key: keyof typeof securityDescriptions): string {
  return securityDescriptions[key];
}