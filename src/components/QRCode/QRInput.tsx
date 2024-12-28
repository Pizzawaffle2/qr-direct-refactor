// src/components/QRCode/QRInput.tsx
import { QrCode } from 'lucide-react';

interface QRInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function QRInput({ value, onChange }: QRInputProps) {
  return (
    <div className="glass-card p-6 rounded-lg bg-white dark:bg-gray-800">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
        QR Code Content
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <QrCode className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          placeholder="Enter text or URL for QR code"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Enter any text, URL, or data you want to encode in the QR code
      </p>
    </div>
  );
}
