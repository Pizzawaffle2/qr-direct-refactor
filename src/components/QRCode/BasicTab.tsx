// src/components/QRCode/BasicTab.tsx
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
  return (
    <div className="glass-card p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Colors</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Foreground Color</label>
          <ColorPicker
            color={dotsColor}
            onChange={(newColor) => onColorChange(newColor, 'dots')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Background Color</label>
          <ColorPicker
            color={backgroundColor}
            onChange={(newColor) => onColorChange(newColor, 'background')}
          />
        </div>
      </div>
    </div>
  );
}
