// src/components/bio-link/theme/ColorSchemeCustomizer.tsx
'use client';

import { BioPageTheme, ColorSchemeKey } from '@/app/bio-links/types';
import { useColorPicker } from '@/app/bio-links/hooks/useColorPicker';
import { ChromePicker } from 'react-color';
import { useBioPageStore } from '@/app/bio-links/store/bioPageStore';

const DEFAULT_COLOR_SCHEME = {
  primary: '#3B82F6',
  secondary: '#64748B',
  text: '#1F2937',
  background: '#FFFFFF'
};

interface ColorSchemeCustomizerProps {
  theme: BioPageTheme;
  onThemeChange: (theme: BioPageTheme) => void;
}

export function ColorSchemeCustomizer({ theme, onThemeChange }: ColorSchemeCustomizerProps) {
  const { bioPage, updateTheme } = useBioPageStore();
  const { showColorPicker, activeColorKey, openColorPicker, closeColorPicker } = useColorPicker();

  // Ensure we have a valid theme and color scheme
  const colorScheme = theme.colorScheme || DEFAULT_COLOR_SCHEME;

  const handleColorChange = (color: { hex: string }) => {
    if (!bioPage.theme) return;
    
    updateTheme({
      ...bioPage.theme,
      colorScheme: {
        ...colorScheme,
        [activeColorKey]: color.hex
      }
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium mb-4">Color Scheme</h3>
      <div className="grid grid-cols-2 gap-4">
        {(Object.keys(colorScheme) as ColorSchemeKey[]).map((key) => (
          <button
            key={key}
            onClick={() => openColorPicker(key)}
            className="flex items-center gap-2 p-2 border rounded-lg hover:border-blue-500 transition-colors"
          >
            <div
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: colorScheme[key] }}
            />
            <span className="capitalize">{key}</span>
          </button>
        ))}
      </div>
      
      {showColorPicker && (
        <div className="absolute z-10">
          <div
            className="fixed inset-0"
            onClick={closeColorPicker}
          />
          <ChromePicker
            color={colorScheme[activeColorKey]}
            onChange={handleColorChange}
          />
        </div>
      )}
    </div>
  );
}