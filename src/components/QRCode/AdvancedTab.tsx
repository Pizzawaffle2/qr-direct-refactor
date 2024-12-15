
// src/components/QRCode/AdvancedTab.tsx
interface AdvancedTabProps {
    margin: number;
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
    pluginKey: string;
    pluginActive: boolean;
    onMarginChange: (margin: number) => void;
    onErrorCorrectionChange: (level: 'L' | 'M' | 'Q' | 'H') => void;
    onPluginOptionsChange: (key: string, isActive: boolean) => void;
  }
  
  export function AdvancedTab({
    margin,
    errorCorrectionLevel,
    pluginKey,
    pluginActive,
    onMarginChange,
    onErrorCorrectionChange,
    onPluginOptionsChange,
  }: AdvancedTabProps) {
    return (
      <div className="space-y-6">
        {/* Margin Settings */}
        <div className="glass-card p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">QR Code Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Margin Size: {margin}px
              </label>
              <input
                type="range"
                min={0}
                max={20}
                value={margin}
                onChange={(e) => onMarginChange(Number(e.target.value))}
                className="w-full"
                title="Margin Size"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium mb-2">
                Error Correction Level
              </label>
              <select
                aria-label="Error Correction Level"
                value={errorCorrectionLevel}
                onChange={(e) => onErrorCorrectionChange(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                className="w-full p-2 rounded-md border"
              >
                <option value="L">Low - 7% recovery</option>
                <option value="M">Medium - 15% recovery</option>
                <option value="Q">Quartile - 25% recovery</option>
                <option value="H">High - 30% recovery</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Higher levels allow for better recovery if the QR code is damaged
              </p>
            </div>
          </div>
        </div>
  
        {/* Plugin Options */}
        <div className="glass-card p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Plugin Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Plugin Key</label>
              <input
                type="text"
                value={pluginKey}
                onChange={(e) => onPluginOptionsChange(e.target.value, pluginActive)}
                className="w-full p-2 rounded-md border"
                placeholder="Enter plugin key"
              />
            </div>
  
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="plugin-active"
                checked={pluginActive}
                onChange={(e) => onPluginOptionsChange(pluginKey, e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="plugin-active" className="text-sm font-medium">
                Activate Plugin
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }