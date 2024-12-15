// src/app/link-shortener/components/LinkShortenerForm.tsx
'use client';

import { useState } from 'react';
import { CalendarIcon, Lock, Link as LinkIcon, Key } from 'lucide-react';
import toast from 'react-hot-toast';

interface FormData {
  url: string;
  alias: string;
  password: string;
  expiresIn: '24h' | '7d' | '30d' | 'never';
}

export default function LinkShortenerForm({ onSuccess }: { onSuccess: (data: any) => void }) {
  const [formData, setFormData] = useState<FormData>({
    url: '',
    alias: '',
    password: '',
    expiresIn: 'never',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/shorten-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: formData.url,
          alias: formData.alias || undefined,
          password: showPasswordInput ? formData.password : undefined,
          expiresIn: formData.expiresIn === 'never' ? undefined : formData.expiresIn,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      onSuccess(data);
      toast.success('Link shortened successfully!');
      
      // Reset form
      setFormData({
        url: '',
        alias: '',
        password: '',
        expiresIn: 'never',
      });
      setShowPasswordInput(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          URL to Shorten
        </label>
        <div className="relative">
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
            placeholder="https://example.com"
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Custom Alias */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Custom Alias (Optional)
        </label>
        <input
          type="text"
          value={formData.alias}
          onChange={(e) => setFormData(prev => ({ ...prev, alias: e.target.value }))}
          placeholder="my-custom-link"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Advanced Options */}
      <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">Password Protection</span>
          </div>
          <button
            type="button"
            onClick={() => setShowPasswordInput(!showPasswordInput)}
            className="text-blue-500 text-sm hover:underline"
          >
            {showPasswordInput ? 'Remove Password' : 'Add Password'}
          </button>
        </div>

        {showPasswordInput && (
          <div className="relative">
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter password"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        )}

        <div>
          <div className="flex items-center gap-2 mb-2">
            <CalendarIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Link Expiration</span>
          </div>
          <label htmlFor="expiresIn" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Link Expiration
          </label>
          <select
            id="expiresIn"
            value={formData.expiresIn}
            onChange={(e) => setFormData(prev => ({ ...prev, expiresIn: e.target.value as FormData['expiresIn'] }))}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="never">Never</option>
            <option value="24h">24 Hours</option>
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full px-4 py-2 text-white font-medium rounded-md
          ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600'}
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          'Create Short Link'
        )}
      </button>
    </form>
  );
}