// src/components/settings/QRDefaultsSection.tsx
'use client';

import { useState } from 'react';
import { ColorPicker } from '@/components/UI/ColorPicker';

export function QRDefaultsSection() {
  const [defaultColor, setDefaultColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [defaultSize, setDefaultSize] = useState(300);
  const [defaultStyle, setDefaultStyle] = useState('square');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          QR Code Defaults
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Set your default QR code settings for new codes.
        </p>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Default QR Color
          </label>
          <ColorPicker color={defaultColor} onChange={setDefaultColor} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Default Background Color
          </label>
          <ColorPicker color={bgColor} onChange={setBgColor} />
        </div>
      </div>

      {/* Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Default Size (pixels)
        </label>
        <input
          type="range"
          min="100"
          max="1000"
          step="50"
          value={defaultSize}
          onChange={(e) => setDefaultSize(Number(e.target.value))}
          className="w-full accent-blue-500"
          title="Default Size"
        />
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {defaultSize}px × {defaultSize}px
        </div>
      </div>

      {/* Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Default Style
        </label>
        <select
          aria-label="Default Style"
          value={defaultStyle}
          onChange={(e) => setDefaultStyle(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="square">Square</option>
          <option value="dots">Dots</option>
          <option value="rounded">Rounded</option>
          <option value="extra-rounded">Extra Rounded</option>
        </select>
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <button className="btn-primary w-full">
          Save Default Settings
        </button>
      </div>
    </div>
  );
}