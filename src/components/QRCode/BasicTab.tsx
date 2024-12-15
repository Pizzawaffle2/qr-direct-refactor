// src/components/QRCode/BasicTab.tsx
interface BasicTabProps {
    data: string;
    dotsColor: string;
    backgroundColor: string;
    onDataChange: (data: string) => void;
    onColorChange: (color: string, type: 'dots' | 'background') => void;
  }
  
  export function BasicTab({
    data,
    dotsColor,
    backgroundColor,
    onDataChange,
    onColorChange
  }: BasicTabProps) {
    return (
      <div className="space-y-6">
        <div className="glass-card p-6 rounded-lg">
          <label className="block text-sm font-medium mb-2">QR Content</label>
          <input
            type="text"
            value={data}
            onChange={(e) => onDataChange(e.target.value)}
            className="w-full p-2 rounded-md border"
            placeholder="Enter text or URL for QR code"
          />
        </div>
  
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
      </div>
    );
  }