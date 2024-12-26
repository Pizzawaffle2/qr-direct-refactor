// src/components/settings/PrivacySecuritySection.tsx
'use client';

import { useState } from 'react';
import { Shield, Smartphone, Key, Globe, History } from 'lucide-react';

export function PrivacySecuritySection() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [sessions] = useState([
    {
      device: 'Chrome on Windows',
      location: 'London, UK',
      lastActive: 'Active now',
      current: true
    },
    {
      device: 'Safari on iPhone',
      location: 'New York, US',
      lastActive: '2 hours ago',
      current: false
    }
  ]);

  const handleEnable2FA = async () => {
    // In a real app, this would:
    // 1. Call API to generate 2FA secret
    // 2. Show QR code setup
    // 3. Verify code
    setShowQRCode(true);
  };

  const handleDisable2FA = async () => {
    // In a real app, this would:
    // 1. Verify current password
    // 2. Disable 2FA
    setTwoFactorEnabled(false);
    setShowQRCode(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Privacy & Security
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account security and privacy settings.
        </p>
      </div>

      {/* Two-Factor Authentication */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
            <Shield className="w-6 h-6 text-blue-500 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Two-Factor Authentication
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Add an extra layer of security to your account by requiring both your password and an authentication code.
            </p>
          </div>
          <div>
            <button
              onClick={() => twoFactorEnabled ? handleDisable2FA() : handleEnable2FA()}
              className={`btn-${twoFactorEnabled ? 'secondary' : 'primary'}`}
            >
              {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>
        </div>

        {showQRCode && !twoFactorEnabled && (
          <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Set up Two-Factor Authentication
            </h4>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg w-fit">
                {/* QR Code would go here */}
                <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter verification code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter code"
                  />
                  <button 
                    className="btn-primary"
                    onClick={() => setTwoFactorEnabled(true)}
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Password Settings */}
      <div className="glass-card p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
            <Key className="w-6 h-6 text-green-500 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Password
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update your password or enable password-less login.
            </p>
          </div>
          <button className="btn-secondary">
            Change Password
          </button>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="glass-card p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
            <Globe className="w-6 h-6 text-purple-500 dark:text-purple-400" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Privacy Settings
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Control what information is visible to others.
              </p>
            </div>
            
            <div className="space-y-3">
              {[
                'Make my QR codes public',
                'Show my profile to other users',
                'Allow email notifications',
                'Share usage analytics'
              ].map((setting) => (
                <label key={setting} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{setting}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="glass-card p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
            <History className="w-6 h-6 text-orange-500 dark:text-orange-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Active Sessions
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your active sessions across different devices.
            </p>

            <div className="mt-4 space-y-4">
              {sessions.map((session, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {session.device}
                      {session.current && (
                        <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                          Current Session
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {session.location} • {session.lastActive}
                    </div>
                  </div>
                  {!session.current && (
                    <button className="btn-secondary text-sm">
                      End Session
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}