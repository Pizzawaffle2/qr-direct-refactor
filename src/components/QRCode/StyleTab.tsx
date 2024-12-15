// src/components/QRCode/StyleTab.tsx
import { QRDotType } from '@/types/qr';

interface StyleTabProps {
  dotType: QRDotType;
  borderColor: string;
  borderRadius: number;
  borderWidth: number;
  onDotTypeChange: (type: QRDotType) => void;
  onBorderChange: (value: number | string, property: 'color' | 'radius' | 'width') => void;
}

const DOT_STYLES: { value: QRDotType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

export function StyleTab({
  dotType,
  borderColor,
  borderRadius,
  borderWidth,
  onDotTypeChange,
  onBorderChange,
}: StyleTabProps) {
  return (
    <div className="space-y-6">
      {/* Dot Style */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Dot Style</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {DOT_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() => onDotTypeChange(style.value)}
              className={`p-3 border rounded-lg transition-colors ${
                dotType === style.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Border Options */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Border Style</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Border Color</label>
            <input
              type="color"
              value={borderColor}
              onChange={(e) => onBorderChange(e.target.value, 'color')}
              className="w-full p-2 rounded-md border"
              title="Border Color"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Border Radius: {borderRadius}px
            </label>
            <input
              type="range"
              min={0}
              max={50}
              value={borderRadius}
              onChange={(e) => onBorderChange(e.target.value, 'radius')}
              title="Border Radius"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Border Width: {borderWidth}px
            </label>
            <input
              type="range"
              min={0}
              max={10}
              value={borderWidth}
              onChange={(e) => onBorderChange(e.target.value, 'width')}
              className="w-full"
              title="Border Width"
            />
          </div>
        </div>
      </div>
    </div>
  );
}