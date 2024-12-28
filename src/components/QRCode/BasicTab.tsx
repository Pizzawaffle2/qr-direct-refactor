import { useState } from 'react';
import { ColorPicker } from '@/components/UI/ColorPicker';

interface BasicTabProps {
  dotsColor: string;
  backgroundColor: string;
  onColorChange: (color: string, type: 'dots' | 'background') => void;
}

export function BasicTab({
  dotsColor,
  backgroundColor,
  onColorChange
}: BasicTabProps) {
  const [transparentBackground, setTransparentBackground] = useState(backgroundColor === 'transparent');

  const commonCombinations = [
    { dots: '#000000', bg: 'transparent', name: 'Classic Transparent' },
    { dots: '#000000', bg: '#FFFFFF', name: 'Classic' },
    { dots: '#0066FF', bg: '#FFFFFF', name: 'Blue' },
    { dots: '#10B981', bg: '#FFFFFF', name: 'Green' },
    { dots: '#7C3AED', bg: '#FFFFFF', name: 'Purple' },
    { dots: '#FFFFFF', bg: '#000000', name: 'Inverted' }
  ];

  return (
    <div className="space-y-4">
      {/* QR Code Color Section */}
      <div className="glass-card p-4 rounded-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            QR Code Color
          </label>
          <ColorPicker
            color={dotsColor}
            onChange={(newColor) => onColorChange(newColor, 'dots')}
          />
        </div>

        {/* Background Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Background
            </label>
            <button
              onClick={() => {
                setTransparentBackground(!transparentBackground);
                onColorChange(transparentBackground ? '#FFFFFF' : 'transparent', 'background');
              }}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                transparentBackground 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              {transparentBackground ? 'Transparent' : 'Solid Color'}
            </button>
          </div>
          
          {!transparentBackground && (
            <ColorPicker
              color={backgroundColor}
              onChange={(newColor) => onColorChange(newColor, 'background')}
            />
          )}
        </div>
      </div>

      {/* Quick Combinations */}
      <div className="glass-card p-4 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Combinations</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {commonCombinations.map((combo) => (
            <button
              key={combo.name}
              onClick={() => {
                onColorChange(combo.dots, 'dots');
                onColorChange(combo.bg, 'background');
                setTransparentBackground(combo.bg === 'transparent');
              }}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 
                       dark:hover:border-blue-400 transition-colors group"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div 
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: combo.dots }}
                />
                <div 
                  className={`w-4 h-4 rounded-sm border border-gray-200 dark:border-gray-700`}
                  style={{ 
                    backgroundColor: combo.bg === 'transparent' 
                      ? 'transparent' 
                      : combo.bg,
                    backgroundImage: combo.bg === 'transparent'
                      ? 'linear-gradient(45deg, #ddd 25%, transparent 25%), linear-gradient(-45deg, #ddd 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ddd 75%), linear-gradient(-45deg, transparent 75%, #ddd 75%)'
                      : undefined,
                    backgroundSize: combo.bg === 'transparent' ? '8px 8px' : undefined,
                    backgroundPosition: combo.bg === 'transparent' ? '0 0, 0 4px, 4px -4px, -4px 0px' : undefined
                  }}
                />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-900 
                             dark:group-hover:text-gray-100 transition-colors">
                {combo.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}