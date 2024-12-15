// src/components/QRCode/BasicTab.tsx
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
            <input
              type="color"
              value={dotsColor}
              onChange={(e) => onColorChange(e.target.value, 'dots')}
              className="w-full p-2 rounded-md border"
              title="Foreground Color"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Background Color</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onColorChange(e.target.value, 'background')}
              className="w-full p-2 rounded-md border"
              title="Background Color"
            />
          </div>
        </div>
      </div>
    );
  }