// src/components/settings/WebhooksSection.tsx
'use client';

import { useState } from 'react';
import { Webhook, Plus, PlayCircle, XCircle, RotateCw, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

interface WebhookEvent {
  id: string;
  name: string;
  description: string;
  category: 'qr' | 'links' | 'analytics' | 'security';
}

interface WebhookConfig {
  id: string;
  url: string;
  events: string[];
  active: boolean;
  secret: string;
  createdAt: Date;
  lastDelivery?: {
    status: 'success' | 'failed';
    timestamp: Date;
    responseTime: number;
  };
}

const AVAILABLE_EVENTS: WebhookEvent[] = [
  // QR Code Events
  { 
    id: 'qr.scanned',
    name: 'QR Code Scanned',
    description: 'When a QR code is scanned',
    category: 'qr'
  },
  { 
    id: 'qr.created',
    name: 'QR Code Created',
    description: 'When a new QR code is generated',
    category: 'qr'
  },
  // Link Events
  { 
    id: 'link.clicked',
    name: 'Link Clicked',
    description: 'When a short link is clicked',
    category: 'links'
  },
  { 
    id: 'link.created',
    name: 'Link Created',
    description: 'When a new short link is created',
    category: 'links'
  },
  // Analytics Events
  { 
    id: 'analytics.milestone',
    name: 'Analytics Milestone',
    description: 'When a scan/click milestone is reached',
    category: 'analytics'
  },
  // Security Events
  { 
    id: 'security.login',
    name: 'New Login',
    description: 'When a new login is detected',
    category: 'security'
  }
];

export function WebhooksSection() {
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [, setTestResponse] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleTestWebhook = async (webhookId: string) => {
    setTestResponse(null);
    try {
      const response = await fetch(`/api/webhooks/${webhookId}/test`, {
        method: 'POST'
      });
      
      if (!response.ok) throw new Error('Test failed');
      
      setTestResponse({
        success: true,
        message: 'Test webhook delivered successfully!'
      });
      toast.success('Test webhook sent');
    } catch (error) {
      setTestResponse({
        success: false,
        message: 'Webhook test failed. Please check your endpoint URL.'
      });
      toast.error('Test failed');
    }
  };

  const handleCreateWebhook = async (formData: FormData) => {
    try {
      const response = await fetch('/api/webhooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: formData.get('url'),
          events: formData.getAll('events')
        })
      });

      if (!response.ok) throw new Error('Failed to create webhook');

      const webhook = await response.json();
      setWebhooks([...webhooks, webhook]);
      setIsAddingNew(false);
      toast.success('Webhook created');
    } catch (error) {
      toast.error('Failed to create webhook');
    }
  };

  const handleDeleteWebhook = async (webhookId: string) => {
    try {
      await fetch(`/api/webhooks/${webhookId}`, {
        method: 'DELETE'
      });

      setWebhooks(webhooks.filter(w => w.id !== webhookId));
      toast.success('Webhook deleted');
    } catch (error) {
      toast.error('Failed to delete webhook');
    }
  };

  const handleToggleWebhook = async (webhookId: string) => {
    try {
      const webhook = webhooks.find(w => w.id === webhookId);
      if (!webhook) return;

      const response = await fetch(`/api/webhooks/${webhookId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !webhook.active })
      });

      if (!response.ok) throw new Error('Failed to update webhook');

      setWebhooks(webhooks.map(w => 
        w.id === webhookId ? { ...w, active: !w.active } : w
      ));
      
      toast.success(webhook.active ? 'Webhook disabled' : 'Webhook enabled');
    } catch (error) {
      toast.error('Failed to update webhook');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Webhook className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Webhooks</h2>
        </div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          Add Webhook
        </button>
      </div>

{/* Quick Reference */}
<div className="p-4 bg-gray-50 rounded-lg">
  <div className="flex items-center justify-between mb-2">
    <h3 className="font-medium">Quick Reference</h3>
    <button 
      onClick={() => {
        navigator.clipboard.writeText(`curl -X POST \\
  -H "Content-Type: application/json" \\
  -H "X-Webhook-Secret: your-secret" \\
  -d '{"event":"qr.scanned","data":{}}' \\
  https://your-endpoint.com/webhook`);
        toast.success('Copied to clipboard');
      }}
      className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
    >
      <Copy className="w-4 h-4" />
      Copy
    </button>
  </div>
  <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
    <code>{`curl -X POST \\
  -H "Content-Type: application/json" \\
  -H "X-Webhook-Secret: your-secret" \\
  -d '{"event":"qr.scanned","data":{"qrId":"123","location":"US"}}' \\
  https://your-endpoint.com/webhook`}</code>
  </pre>
  <div className="mt-4 space-y-2">
    <p className="text-sm text-gray-600">Example response:</p>
    <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
      <code>{`{
  "success": true,
  "event": "qr.scanned",
  "timestamp": "2024-12-17T16:00:00Z"
}`}</code>
    </pre>
  </div>
</div>

      {/* Add New Webhook Form */}
      {isAddingNew && (
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateWebhook(new FormData(e.currentTarget));
          }}
          className="border rounded-lg p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Endpoint URL
            </label>
            <input
              type="url"
              name="url"
              required
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://your-domain.com/webhook"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Events
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(
                AVAILABLE_EVENTS.reduce((acc, event) => ({
                  ...acc,
                  [event.category]: [
                    ...(acc[event.category] || []),
                    event
                  ]
                }), {} as Record<string, WebhookEvent[]>)
              ).map(([category, events]) => (
                <div key={category} className="space-y-2">
                  <h4 className="text-sm font-medium capitalize">{category}</h4>
                  {events.map(event => (
                    <label key={event.id} className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        name="events"
                        value={event.id}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-sm">{event.name}</div>
                        <div className="text-xs text-gray-600">{event.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Create Webhook
            </button>
          </div>
        </form>
      )}

      {/* Webhook List */}
      <div className="space-y-4">
        {webhooks.map((webhook) => (
          <div key={webhook.id} className="border rounded-lg">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      webhook.active ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <h3 className="font-medium">{webhook.url}</h3>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {webhook.events.length} events • Created on {
                      new Date(webhook.createdAt).toLocaleDateString()
                    }
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTestWebhook(webhook.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Test webhook"
                  >
                    <PlayCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleWebhook(webhook.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title={webhook.active ? "Disable webhook" : "Enable webhook"}
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteWebhook(webhook.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    title="Delete webhook"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {webhook.lastDelivery && (
                <div className="mt-4 text-sm text-gray-600">
                  Last delivery: {webhook.lastDelivery.status === 'success' ? (
                    <span className="text-green-600">Successful</span>
                  ) : (
                    <span className="text-red-600">Failed</span>
                  )} • {webhook.lastDelivery.responseTime}ms
                </div>
              )}
            </div>
          </div>
        ))}

        {webhooks.length === 0 && !isAddingNew && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Webhook className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900">No webhooks configured</h3>
            <p className="text-gray-600 mt-1">
              Add a webhook to get notified of events in real-time
            </p>
          </div>
        )}
      </div>
    </div>
  );
}