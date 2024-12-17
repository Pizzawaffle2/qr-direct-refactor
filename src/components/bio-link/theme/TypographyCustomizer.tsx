// src/components/bio-link/theme/TypographyCustomizer.tsx
'use client';

import { useState } from 'react';
import { useBioPageStore } from '@/app/bio-links/store/bioPageStore';
import { Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { BioPageTheme } from '@/types/bio-page';

const FONT_OPTIONS = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Playfair Display', label: 'Playfair' },
  { value: 'Source Sans Pro', label: 'Source Sans' }
];

const TEXT_ALIGN_OPTIONS = [
  { value: 'left', icon: AlignLeft },
  { value: 'center', icon: AlignCenter },
  { value: 'right', icon: AlignRight }
];

const FONT_SIZES = {
  small: { size: '0.875rem', label: 'Small', icon: 4 },
  medium: { size: '1rem', label: 'Medium', icon: 5 },
  large: { size: '1.25rem', label: 'Large', icon: 6 }
};

export function TypographyCustomizer() {
  const { bioPage, updateTheme } = useBioPageStore();
  const [selectedAlign, setSelectedAlign] = useState('center');

  const handleFontChange = (fontFamily: string) => {
    updateTheme({
      ...bioPage.theme,
      fontFamily,
      fontSize: bioPage.theme.fontSize,
      textAlign: bioPage.theme.textAlign,
      fontWeight: bioPage.theme.fontWeight
    });
  };

  const handleSizeChange = (fontSize: string) => {
    updateTheme({
      ...bioPage.theme,
      fontSize
    });
  };

  const handleWeightChange = (fontWeight: string) => {
    updateTheme({
      ...bioPage.theme,
      fontWeight
    });
  };

  return (
    <div className="space-y-6">
      {/* Font Family Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Font Family</label>
        <div className="grid grid-cols-2 gap-2">
          {FONT_OPTIONS.map((font) => (
            <button
              key={font.value}
              onClick={() => handleFontChange(font.value)}
              type="button"
              className={`p-3 border rounded-lg text-left transition-colors ${
                bioPage.theme.fontFamily === font.value 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              style={{ fontFamily: font.value }}
            >
              <span className="text-base">{font.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size Presets */}
      <div>
        <label className="block text-sm font-medium mb-2">Text Size</label>
        <div className="flex gap-2">
          {Object.entries(FONT_SIZES).map(([key, { label, icon }]) => (
            <button 
              key={key}
              type="button"
              onClick={() => handleSizeChange(key)}
              className={`flex-1 p-3 border rounded-lg transition-colors ${
                bioPage.theme.fontSize === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <Type className={`w-${icon} h-${icon} mx-auto`} />
              <span className="text-sm mt-1 block">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Text Alignment */}
      <div>
        <label className="block text-sm font-medium mb-2">Text Alignment</label>
        <div className="flex gap-2">
          {TEXT_ALIGN_OPTIONS.map(({ value, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setSelectedAlign(value);
                updateTheme({
                  ...bioPage.theme,
                  textAlign: value
                });
              }}
              className={`flex-1 p-3 border rounded-lg transition-colors ${
                selectedAlign === value ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}
              title={`Align ${value}`}
            >
              <Icon className="w-4 h-4 mx-auto" />
            </button>
          ))}
        </div>
      </div>

      {/* Font Weight */}
      <div>
        <label className="block text-sm font-medium mb-2">Font Weight</label>
        <div className="grid grid-cols-2 gap-2">
          {['normal', 'medium'].map((weight) => (
            <button
              key={weight}
              type="button"
              onClick={() => handleWeightChange(weight)}
              className={`p-3 border rounded-lg transition-colors ${
                bioPage.theme.fontWeight === weight 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
            >
              {weight === 'normal' ? 'Regular' : 'Medium'}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6 p-4 border rounded-lg">
        <h3 className="text-sm font-medium mb-2">Preview</h3>
        <div 
          className="p-4 bg-gray-50 rounded"
          style={{
            fontFamily: bioPage.theme.fontFamily,
            fontSize: FONT_SIZES[bioPage.theme.fontSize || 'medium'].size,
            textAlign: selectedAlign as 'left' | 'center' | 'right',
            fontWeight: bioPage.theme.fontWeight || 'normal'
          }}
        >
          <div className="mb-2">Your Name</div>
          <div className="text-sm text-gray-600">Your bio text will appear like this</div>
        </div>
      </div>
    </div>
  );
}