// src/components/QRCode/AdvancedTab.tsx
import { Upload } from 'lucide-react';
import { QROptions } from '@/types/qr';
import InputField from '@/components/UI/InputField';
import Slider from '@/components/UI/Slider';

interface AdvancedTabProps {
  options: QROptions;
  onLogoUpload: (file: File) => void;
  onOptionsChange: (newOptions: Partial<QROptions>) => void;
}

export function AdvancedTab({ 
  options, 
  onLogoUpload, 
  onOptionsChange 
}: AdvancedTabProps) {
  return (
    <div className="space-y-6">
      {/* Logo Options */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Logo Options</h3>
        <div className="space-y-4">
          {/* Logo Upload */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Logo
            </label>
            <div className="mt-1 flex items-center">
              <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                <Upload className="h-5 w-5 mr-2 text-gray-400" />
                {options.logo ? 'Change Logo' : 'Upload Logo'}
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && onLogoUpload(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          {/* Logo Customization Options */}
          {options.logo && (
            <>
              <Slider
                label="Logo Size"
                value={options.logoSize}
                min={20}
                max={100}
                step={5}
                onChange={(value) => onOptionsChange({ logoSize: value })}
              />
              <Slider
                label="Logo Margin"
                value={options.logoMargin}
                min={0}
                max={20}
                step={2}
                onChange={(value) => onOptionsChange({ logoMargin: value })}
              />
              <Slider
                label="Logo Opacity"
                value={options.logoOpacity * 100}
                min={20}
                max={100}
                step={10}
                onChange={(value) => onOptionsChange({ logoOpacity: value / 100 })}
              />
              <InputField
                label="Logo Background"
                type="color"
                value={options.logoBackgroundColor}
                onChange={(e) => onOptionsChange({ logoBackgroundColor: e.target.value })}
              />
            </>
          )}
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
        <div className="space-y-4">
          {/* Error Correction Level */}
          <select
            aria-label="Error Correction Level"
            value={options.errorCorrectionLevel}
            onChange={(e) => onOptionsChange({ errorCorrectionLevel: e.target.value as any })}
            className="w-full p-2 rounded-md border border-gray-300"
          >
            <option value="L">Low Error Correction (7%)</option>
            <option value="M">Medium Error Correction (15%)</option>
            <option value="Q">Quartile Error Correction (25%)</option>
            <option value="H">High Error Correction (30%)</option>
          </select>

          {/* Margin Settings */}
          <Slider
            label="Margin (Quiet Zone)"
            value={options.margin}
            min={0}
            max={32}
            step={4}
            onChange={(value) => onOptionsChange({ margin: value })}
          />
        </div>
      </div>
    </div>
  );
}