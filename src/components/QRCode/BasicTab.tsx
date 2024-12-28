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

  return (
    <div className="space-y-4 overflow-visible">
      {/* Colors Section */}
      <div className="glass-card rounded-lg divide-y divide-gray-200 dark:divide-gray-700 overflow-visible bg-white dark:bg-gray-800">
        {/* QR Code Color */}
        <div className="p-4 overflow-visible">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              QR Code Color
            </label>
          </div>
          <div className="relative">
            <ColorPicker
              color={dotsColor}
              onChange={(newColor) => onColorChange(newColor, 'dots')}
            />
          </div>
        </div>
  
        {/* Background Color */}
        <div className="p-4 overflow-visible">
          <div className="flex justify-between items-center mb-2">
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
            <div className="relative">
              <ColorPicker
                color={backgroundColor}
                onChange={(newColor) => onColorChange(newColor, 'background')}
              />
            </div>
          )}
        </div>
      </div>
  
      {/* Color Combinations */}
      <div className="glass-card p-4 rounded-lg bg-white dark:bg-gray-800">
        <div className="mb-3">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Quick Combinations
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { dots: '#000000', bg: 'transparent', name: 'Transparent' },
            { dots: '#000000', bg: '#FFFFFF', name: 'Classic' },
            { dots: '#0066FF', bg: '#FFFFFF', name: 'Blue' },
            { dots: '#10B981', bg: '#FFFFFF', name: 'Green' },
            { dots: '#7C3AED', bg: '#FFFFFF', name: 'Purple' },
            { dots: '#FFFFFF', bg: '#000000', name: 'Inverted' }
          ].map((combo) => (
            <button
              key={combo.name}
              onClick={() => {
                onColorChange(combo.dots, 'dots');
                onColorChange(combo.bg, 'background');
                setTransparentBackground(combo.bg === 'transparent');
              }}
              className="flex flex-col items-center p-2 rounded-lg border border-gray-200 
                       dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 
                       transition-colors group bg-white dark:bg-gray-800"
            >
              <div className="flex gap-1 mb-1">
                <div 
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: combo.dots }}
                />
                <div 
                  className="w-4 h-4 rounded-sm border border-gray-200 dark:border-gray-700"
                  style={{ 
                    backgroundColor: combo.bg === 'transparent' ? 'transparent' : combo.bg,
                    backgroundImage: combo.bg === 'transparent'
                      ? 'linear-gradient(45deg, #ddd 25%, transparent 25%), linear-gradient(-45deg, #ddd 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ddd 75%), linear-gradient(-45deg, transparent 75%, #ddd 75%)'
                      : undefined,
                    backgroundSize: '8px 8px',
                    backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                  }}
                />
              </div>
              <span className="text-xs text-center text-gray-600 dark:text-gray-400 
                             group-hover:text-gray-900 dark:group-hover:text-gray-100">
                {combo.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      </div>
    );
  }
