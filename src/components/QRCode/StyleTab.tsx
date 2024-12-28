// src/components/QRCode/StyleTab.tsx
import { useState } from 'react';
import { QRDotType } from '@/types/qr';
import { Palette, Square, Circle, Box } from 'lucide-react';

interface StyleTabProps {
  dotType: QRDotType;
  dotsColor: string;
  dotsGradient?: {
    type: 'linear' | 'radial';
    rotation: number;
    colorStops: Array<{ offset: number; color: string }>;
  };
  cornerSquareType: 'dot' | 'square' | 'extra-rounded';
  cornerSquareColor: string;
  cornerDotType: 'dot' | 'square';
  cornerDotColor: string;
  borderColor: string;
  borderRadius: number;
  borderWidth: number;
  onDotTypeChange: (type: QRDotType) => void;
  onDotStyleChange: (options: any) => void;
  onCornerChange: (options: any) => void;
  onBorderChange: (value: number | string, property: 'color' | 'radius' | 'width') => void;
}

const DOT_STYLES: { value: QRDotType; label: string; icon: any }[] = [
  { value: 'square', label: 'Square', icon: Square },
  { value: 'dots', label: 'Dots', icon: Circle },
  { value: 'rounded', label: 'Rounded', icon: Circle },
  { value: 'classy', label: 'Classy', icon: Box },
  { value: 'classy-rounded', label: 'Classy Rounded', icon: Box },
  { value: 'extra-rounded', label: 'Extra Rounded', icon: Box },
];

export function StyleTab({
  dotType,
  dotsColor,
  dotsGradient,
  cornerSquareType,
  cornerSquareColor,
  cornerDotType,
  cornerDotColor,
  borderColor,
  borderRadius,
  borderWidth,
  onDotTypeChange,
  onDotStyleChange,
  onCornerChange,
  onBorderChange,
}: StyleTabProps) {
  const [useGradient, setUseGradient] = useState(!!dotsGradient);

  return (
    <div className="space-y-6">
      {/* Dot Style */}
      <div className="glass-card p-6 rounded-lg bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Dot Style</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {DOT_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() => onDotTypeChange(style.value)}
              className={`p-3 border rounded-lg transition-colors flex flex-col items-center gap-2 ${
                dotType === style.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-700 dark:border-blue-400'
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
              }`}
            >
              <style.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-sm text-gray-900 dark:text-gray-100">{style.label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useGradient}
                onChange={(e) => {
                  setUseGradient(e.target.checked);
                  if (!e.target.checked) {
                    onDotStyleChange({ color: dotsColor, gradient: undefined });
                  }
                }}
                className="w-4 h-4 text-blue-500 dark:text-blue-400"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Use Gradient</span>
            </label>
          </div>

          {useGradient ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Gradient Type</label>
                <select
                  aria-label="Gradient Type"
                  value={dotsGradient?.type || 'linear'}
                  onChange={(e) => onDotStyleChange({
                    gradient: {
                      ...dotsGradient,
                      type: e.target.value,
                    }
                  })}
                  className="w-full p-2 rounded-md border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                >
                  <option value="linear">Linear</option>
                  <option value="radial">Radial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Start Color</label>
                <input
                  type="color"
                  value={dotsGradient?.colorStops[0]?.color || '#000000'}
                  onChange={(e) => onDotStyleChange({
                    gradient: {
                      ...dotsGradient,
                      colorStops: [
                        { offset: 0, color: e.target.value },
                        dotsGradient?.colorStops[1] || { offset: 1, color: '#000000' },
                      ]
                    }
                  })}
                  className="w-full p-2 rounded-md border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                  title='Start Color'
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">End Color</label>
                <input
                  type="color"
                  value={dotsGradient?.colorStops[1]?.color || '#000000'}
                  onChange={(e) => onDotStyleChange({
                    gradient: {
                      ...dotsGradient,
                      colorStops: [
                        dotsGradient?.colorStops[0] || { offset: 0, color: '#000000' },
                        { offset: 1, color: e.target.value },
                      ]
                    }
                  })}
                  className="w-full p-2 rounded-md border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                  title='End Color'
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Dot Color</label>
              <input
                type="color"
                value={dotsColor}
                onChange={(e) => onDotStyleChange({ color: e.target.value })}
                className="w-full p-2 rounded-md border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                title='Dot Color'
              />
            </div>
          )}
        </div>
      </div>

      {/* Corner Style */}
      <div className="glass-card p-6 rounded-lg bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Corner Style</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Corner Square Style</label>
            <select
              value={cornerSquareType}
              onChange={(e) => onCornerChange({ 
                square: { type: e.target.value as any, color: cornerSquareColor }
              })}
              className="w-full p-2 rounded-md border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              title='Corner Square Style'
            >
              <option value="square">Square</option>
              <option value="dot">Dot</option>
              <option value="extra-rounded">Extra Rounded</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Corner Square Color</label>
            <input
              type="color"
              value={cornerSquareColor}
              onChange={(e) => onCornerChange({ 
                square: { type: cornerSquareType, color: e.target.value }
              })}
              className="w-full p-2 rounded-md border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              title='Corner Square Color'
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Corner Dot Style</label>
            <select
              value={cornerDotType}
              onChange={(e) => onCornerChange({ 
                dot: { type: e.target.value as any, color: cornerDotColor }
              })}
              className="w-full p-2 rounded-md border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              title="Corner Dot Style"
            >
              <option value="square">Square</option>
              <option value="dot">Dot</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Corner Dot Color</label>
            <input
              type="color"
              value={cornerDotColor}
              onChange={(e) => onCornerChange({ 
                dot: { type: cornerDotType, color: e.target.value }
              })}
              className="w-full p-2 rounded-md border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              title='Corner Dot Color'
            />
          </div>
        </div>
      </div>

      {/* Border Options */}
      <div className="glass-card p-6 rounded-lg bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Border Style</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Border Color</label>
            <input
              type="color"
              value={borderColor}
              onChange={(e) => onBorderChange(e.target.value, 'color')}
              className="w-full p-2 rounded-md border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              title='Border Color'
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
              Border Radius: {borderRadius}px
            </label>
            <input
              type="range"
              min={0}
              max={50}
              value={borderRadius}
              onChange={(e) => onBorderChange(Number(e.target.value), 'radius')}
              className="w-full"
              title='Border Radius'
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
              Border Width: {borderWidth}px
            </label>
            <input
              type="range"
              min={0}
              max={10}
              value={borderWidth}
              onChange={(e) => onBorderChange(Number(e.target.value), 'width')}
              className="w-full"
              title="Border Width"

            />
          </div>
        </div>
      </div>
    </div>
  );
}
