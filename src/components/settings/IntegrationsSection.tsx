// src/components/settings/IntegrationsSection.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link2, Plus, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  status?: 'active' | 'pending' | 'error';
  lastSync?: string;
}

const AVAILABLE_INTEGRATIONS: Integration[] = [
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync your QR calendar links with Google Calendar',
    icon: '/icons/google-calendar.png',
    connected: true,
    status: 'active',
    lastSync: '5 minutes ago'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get QR scan notifications in your Slack channels',
    icon: '/icons/slack.png',
    connected: false
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect QR Direct with 3000+ apps',
    icon: '/icons/zapier.png',
    connected: true,
    status: 'error',
    lastSync: '1 hour ago'
  }
  // Add more integrations as needed
];

export function IntegrationsSection() {
  const [integrations, setIntegrations] = useState(AVAILABLE_INTEGRATIONS);
  const [loading, setLoading] = useState<string | null>(null);

  const handleConnection = async (integrationId: string) => {
    setLoading(integrationId);
    try {
      const integration = integrations.find(i => i.id === integrationId);
      
      if (integration?.connected) {
        // Disconnect
        await fetch(`/api/integrations/${integrationId}/disconnect`, {
          method: 'POST'
        });
        toast.success(`Disconnected from ${integration.name}`);
      } else {
        // Connect - In real app, this would redirect to OAuth flow
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        toast.success(`Connected to ${integration?.name}`);
      }

      setIntegrations(integrations.map(i => 
        i.id === integrationId 
          ? { ...i, connected: !i.connected }
          : i
      ));
    } catch (error) {
      toast.error('Failed to update integration');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link2 className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Integrations</h2>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      <div className="grid gap-4">
        {integrations.map((integration) => (
          <div 
            key={integration.id}
            className="p-4 bg-white rounded-lg border flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                <Image
                  src={integration.icon}
                  alt={integration.name}
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <h3 className="font-medium">{integration.name}</h3>
                <p className="text-sm text-gray-600">{integration.description}</p>
                {integration.connected && integration.lastSync && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      integration.status === 'active' ? 'bg-green-500' :
                      integration.status === 'error' ? 'bg-red-500' :
                      'bg-yellow-500'
                    }`} />
                    <span className="text-xs text-gray-500">
                      Last synced {integration.lastSync}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {integration.connected && integration.status === 'error' && (
                <button
                  className="text-sm text-gray-600 hover:text-gray-900"
                  onClick={() => {
                    // Handle reconnection
                    toast.success('Attempting to reconnect...');
                  }}
                >
                  Reconnect
                </button>
              )}
              <button
                onClick={() => handleConnection(integration.id)}
                disabled={loading === integration.id}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  integration.connected
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {loading === integration.id ? (
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                ) : integration.connected ? (
                  <>
                    <Check className="w-4 h-4" />
                    Connected
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Connect
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}