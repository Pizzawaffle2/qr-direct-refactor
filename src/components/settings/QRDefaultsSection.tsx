// src/components/settings/QRDefaultsSection.tsx
'use client';

import { useState } from 'react';
import InputField from '@/components/UI/InputField';
import toast from 'react-hot-toast';

export function QRDefaultsSection() {
  const [settings, setSettings] = useState({
    defaultQRColor: '#000000',
    defaultQRSize: 256,
    defaultQRBackground: '#FFFFFF',
    defaultLogo: null as string | null,
    errorCorrection: 'M',
    style: 'square'
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Failed to update settings');
      toast.success('QR settings updated successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">QR Code Defaults</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Default Color"
          type="color"
          value={settings.defaultQRColor}
          onChange={(e) => setSettings({
            ...settings,
            defaultQRColor: e.target.value
          })}
        />

        <InputField
          label="Background Color"
          type="color"
          value={settings.defaultQRBackground}
          onChange={(e) => setSettings({
            ...settings,
            defaultQRBackground: e.target.value
          })}
        />

        <InputField
          label="Size (px)"
          type="number"
          min={128}
          max={1024}
          step="32"
          value={settings.defaultQRSize.toString()}
          onChange={(e) => setSettings({
            ...settings,
            defaultQRSize: parseInt(e.target.value)
          })}
        />

        <div>
          <label className="block text-sm font-medium mb-1">Error Correction</label>
          <select
            aria-label="Error correction level"
            value={settings.errorCorrection}
            onChange={(e) => setSettings({
              ...settings,
              errorCorrection: e.target.value
            })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H">High (30%)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}