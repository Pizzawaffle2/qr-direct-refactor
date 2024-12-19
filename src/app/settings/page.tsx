// src/app/settings/page.tsx
'use client';

import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { withAuth } from '@/components/auth/withAuth';
import { 
  Settings, 
  QrCode, 
  Bell, 
  CreditCard, 
  Key, 
  Shield, 
  Webhook, 
  Link2 
} from 'lucide-react';

// Import our new components
import { PrivacySecuritySection } from '@/components/settings/PrivacySecuritySection';
import { WebhooksSection } from '@/components/settings/WebhooksSection';
import { IntegrationsSection } from '@/components/settings/IntegrationsSection';
import { QRDefaultsSection } from '@/components/settings/QRDefaultsSection';
import { NotificationsSection } from '@/components/settings/NotificationsSection';

const TABS = [
  { id: 'preferences', label: 'Preferences', icon: Settings },
  { id: 'qr', label: 'QR Defaults', icon: QrCode },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield },
  { id: 'webhooks', label: 'Webhooks', icon: Webhook },
  { id: 'integrations', label: 'Integrations', icon: Link2 },
  { id: 'api', label: 'API Access', icon: Key },
] as const;

type TabType = typeof TABS[number]['id'];

function SettingsPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<TabType>('preferences');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'qr':
        return <QRDefaultsSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'privacy':
        return <PrivacySecuritySection />;
      case 'webhooks':
        return <WebhooksSection />;
      case 'integrations':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Integrations Settings</h2>
            <p className="text-gray-600">Integrations settings coming soon.</p>
          </div>
        );
      case 'api':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">API Access</h2>
            <p className="text-gray-600">API access settings coming soon.</p>
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Billing Settings</h2>
            <p className="text-gray-600">Billing settings coming soon.</p>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">General Preferences</h2>
            <p className="text-gray-600">General preferences coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8">
            Settings
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <div className="glass-card rounded-xl p-4 sticky top-8">
                <nav className="space-y-1">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="md:col-span-3">
              <div className="glass-card rounded-xl p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(SettingsPage);