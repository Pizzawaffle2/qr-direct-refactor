// src/components/QRCode/StyleTab.tsx
import { QROptions, QRShape } from '@/types/qr';
import { StyleSelector } from '@/components/QRCode/StyleSelector';
import InputField from '@/components/UI/InputField';
import Slider from '@/components/UI/Slider';
import Switch from '@/components/UI/Switch';
import { ContrastWarning } from '@/components/QRCode/ColorContrastWarning';
import { getContrastRatio } from '@/utils/contrast';

interface StyleTabProps {
  options: QROptions;
  onOptionsChange: (newOptions: Partial<QROptions>) => void;
}

export function StyleTab({ options, onOptionsChange }: StyleTabProps) {
  const handleShapeChange = (shape: QRShape, type: 'dot' | 'corner') => {
    onOptionsChange({
      [type === 'dot' ? 'dotStyle' : 'cornerStyle']: {
        ...options[type === 'dot' ? 'dotStyle' : 'cornerStyle'],
        shape,
      },
    });
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="space-y-6">
        {/* Shape Styles */}
        <StyleSelector
          label="Dot Style"
          value={options.dotStyle.shape}
          onChange={(shape) => handleShapeChange(shape as QRShape, 'dot')}
        />
        <StyleSelector
          label="Corner Style"
          value={options.cornerStyle.shape}
          onChange={(shape) => handleShapeChange(shape as QRShape, 'corner')}
        />

        {/* Gradient Options */}
        <Switch
          label="Enable Gradient"
          isChecked={options.enableGradient}
          onChange={(checked) => onOptionsChange({ enableGradient: checked })}
        />

        {options.enableGradient && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <InputField
                  label="Gradient Start"
                  type="color"
                  value={options.gradientColors[0]}
                  onChange={(e) => onOptionsChange({
                    gradientColors: [e.target.value, options.gradientColors[1]]
                  })}
                />
                <ContrastWarning
                  contrastRatio={getContrastRatio(options.gradientColors[0], options.backgroundColor)}
                  isVisible={getContrastRatio(options.gradientColors[0], options.backgroundColor) < 7}
                />
              </div>
              <div className="relative">
                <InputField
                  label="Gradient End"
                  type="color"
                  value={options.gradientColors[1]}
                  onChange={(e) => onOptionsChange({
                    gradientColors: [options.gradientColors[0], e.target.value]
                  })}
                />
                <ContrastWarning
                  contrastRatio={getContrastRatio(options.gradientColors[1], options.backgroundColor)}
                  isVisible={getContrastRatio(options.gradientColors[1], options.backgroundColor) < 7}
                />
              </div>
            </div>
            <Slider
              label="Gradient Rotation"
              value={options.gradientRotation ?? 0}
              min={0}
              max={360}
              step={15}
              onChange={(value) => onOptionsChange({ gradientRotation: value })}
            />
          </div>
        )}
      </div>
    </div>
  );
}