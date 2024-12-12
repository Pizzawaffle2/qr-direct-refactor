// src/components/QRCode/BasicTab.tsx
import { QROptions } from '@/types/qr';
import { Copy, Check } from 'lucide-react';
import InputField from '@/components/UI/InputField';
import { ColorTemplate } from '@/components/QRCode/ColorTemplate';
import { ContrastWarning } from '@/components/QRCode/ColorContrastWarning';
import { getContrastRatio } from '@/utils/contrast';
import { COLOR_TEMPLATES } from '@/constants/qr-styles';
import { QRShape } from '@/types/qr';


interface ColorTemplateProps {
  template: {
    name: string;
    fg: string;
    bg: string;
    gradient?: [string, string];
    description?: string;
    category?: 'modern' | 'classic' | 'vibrant' | 'corporate' | 'nature';
  };
  onClick: () => void;
  isActive?: boolean;
}

interface BasicTabProps {
  options: QROptions;
  qrText: string;
  onTextChange: (text: string) => void;
  onOptionsChange: (newOptions: Partial<QROptions>) => void;
  onCopy: () => void;
  isCopied: boolean;
}

export function BasicTab({
  options,
  qrText,
  onTextChange,
  onOptionsChange,
  onCopy,
  isCopied,
}: BasicTabProps) {
  const contrastRatio = getContrastRatio(options.foregroundColor, options.backgroundColor);

  const handleTemplateClick = (template: ColorTemplateProps['template']) => {
    const style = getStyleByName(template.name);
    if (style) {
      const newOptions = {
        foregroundColor: style.colors.foreground,
        backgroundColor: style.colors.background,
        enableGradient: !!style.colors.gradient,
        gradientColors: style.colors.gradient && style.colors.gradient.length === 2 ? [style.colors.gradient[0], style.colors.gradient[1]] as [string, string] : [style.colors.foreground, style.colors.foreground] as [string, string],
        dotStyle: {
          shape: style.dotStyle,
          color: style.colors.foreground
        },
        cornerStyle: {
          shape: style.cornerStyle,
          color: style.colors.foreground
        },
        dotScale: style.dotScale || 1,
        cornerSquareScale: style.cornerSquareScale || 1,
        cornerDotScale: style.cornerDotScale || 1,
      };
      
      logStyleApplication(template.name, newOptions);
      onOptionsChange(newOptions);
    }
  };

  return (
    <div className="space-y-6">
      {/* Text Input */}
      <div className="glass-card p-6 rounded-lg">
        <div className="relative">
          <InputField
            label="Text or URL"
            type="text"
            value={qrText}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Enter text or URL to encode"
          />
          {qrText && (
            <button
              onClick={onCopy}
              className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
              title="Copy to clipboard"
            >
              {isCopied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          )}
        </div>
      </div>

      {/* Colors and Styles */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Colors</h3>
        <div className="space-y-4">
          {/* Color Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <InputField
                label="Foreground Color"
                type="color"
                value={options.foregroundColor}
                onChange={(e) => onOptionsChange({ foregroundColor: e.target.value })}
              />
            </div>
            <div className="relative">
              <InputField
                label="Background Color"
                type="color"
                value={options.backgroundColor}
                onChange={(e) => onOptionsChange({ backgroundColor: e.target.value })}
              />
            </div>
          </div>

          {/* Contrast Warning */}
          <ContrastWarning
            contrastRatio={contrastRatio}
            isVisible={contrastRatio < 7}
          />
        </div>
      </div>

      {/* Color Templates */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Quick Templates</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {COLOR_TEMPLATES.map((template) => (
            <ColorTemplate
              key={template.name}
              template={{
                name: template.name,
                fg: template.fg,
                bg: template.bg,
                gradient: template.gradient as [string, string] | undefined,
                description: template.description,
                category: template.category as 'modern' | 'classic' | 'vibrant' | 'corporate' | 'nature' | undefined,
              }}
              onClick={() => handleTemplateClick({
                name: template.name,
                fg: template.fg,
                bg: template.bg,
                gradient: template.gradient as [string, string] | undefined,
                description: template.description,
                category: template.category as 'modern' | 'classic' | 'vibrant' | 'corporate' | 'nature' | undefined,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function logStyleApplication(name: string, newOptions: Partial<QROptions>) {
  console.log(`Applied style: ${name}`, newOptions);
}
type Style = {
  colors: {
    foreground: string;
    background: string;
    gradient?: string[];
  };
  dotStyle: QRShape;
  cornerStyle: QRShape;
  dotScale: number;
  cornerSquareScale: number;
  cornerDotScale: number;
};

const styles: Record<string, Style> = {
        modern: {
            colors: {
                foreground: '#000000',
                background: '#ffffff',
                gradient: ['#000000', '#434343'],
            },
            dotStyle: 'square',
            cornerStyle: 'square',
            dotScale: 1,
            cornerSquareScale: 1,
            cornerDotScale: 1,
        },
        classic: {
            colors: {
                foreground: '#000000',
                background: '#ffffff',
            },
            dotStyle: 'circle',
            cornerStyle: 'square',
            dotScale: 1,
            cornerSquareScale: 1,
            cornerDotScale: 1,
        },
        vibrant: {
            colors: {
                foreground: '#ff0000',
                background: '#00ff00',
                gradient: ['#ff0000', '#ff9900'],
            },
            dotStyle: 'circle',
            cornerStyle: 'circle',
            dotScale: 1,
            cornerSquareScale: 1,
            cornerDotScale: 1,
        },
        corporate: {
            colors: {
                foreground: '#0033cc',
                background: '#ffffff',
            },
            dotStyle: 'square',
            cornerStyle: 'square',
            dotScale: 1,
            cornerSquareScale: 1,
            cornerDotScale: 1,
        },
        nature: {
            colors: {
                foreground: '#228B22',
                background: '#ADFF2F',
                gradient: ['#228B22', '#32CD32'],
            },
            dotStyle: 'circle',
            cornerStyle: 'circle',
            dotScale: 1,
            cornerSquareScale: 1,
            cornerDotScale: 1,
        },
};

const getStyleByName = (name: string): Style | null => {
  return styles[name as keyof typeof styles] || null;
};

