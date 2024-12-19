// src/components/settings/APIKeySection.tsx
'use client';

import { useState } from 'react';
import { Key, Copy, RefreshCw, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export function APIKeySection() {
  const [apiKey, setApiKey] = useState('sk_test_.............................');
  const [showKey, setShowKey] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleCopyKey = async () => {
    await navigator.clipboard.writeText(apiKey);
    toast.success('API key copied to clipboard');
  };

  const handleRegenerateKey = async () => {
    setIsRegenerating(true);
    try {
      // API call to regenerate key
      const response = await fetch('/api/user/regenerate-api-key', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to regenerate API key');
      const { key } = await response.json();
      setApiKey(key);
      toast.success('API key regenerated successfully');
    } catch (error) {
      toast.error('Failed to regenerate API key');
    } finally {
      setIsRegenerating(false);
    }
  };

  const maskedKey = `${apiKey.slice(0, 8)}${'•'.repeat(32)}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">API Keys</h2>
        <button
          onClick={handleRegenerateKey}
          disabled={isRegenerating}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Regenerate
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Key className="w-5 h-5 text-gray-400" />
            <div className="font-mono">
              {showKey ? apiKey : maskedKey}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKey(!showKey)}
              className="p-2 hover:bg-gray-100 rounded-lg"
              title={showKey ? 'Hide API key' : 'Show API key'}
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              onClick={handleCopyKey}
              className="p-2 hover:bg-gray-100 rounded-lg"
              title="Copy API key"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <h3 className="font-medium mb-2">Quick Start</h3>
        <pre className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          {`curl -X POST \\
  'https://api.qrdirect.com/v1/qr-codes' \\
  -H 'Authorization: Bearer ${maskedKey}' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "content": "https://example.com",
    "type": "url"
  }'`}
        </pre>
      </div>
    </div>
  );
}