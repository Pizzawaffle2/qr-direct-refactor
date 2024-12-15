'use client';

import { useState } from 'react';
import { BioPageTheme } from '@/app/bio-links/types';
import { ChromePicker } from 'react-color';
import {
  Paintbrush,
  Type,
  Layout,
  Image as ImageIcon,
  Move3D,
  Palette,
  Grid,
  Layers,
} from 'lucide-react';

interface ThemeCustomizerProps {
  theme: BioPageTheme;
  onThemeChange: (theme: BioPageTheme) => void;
}

const FONT_OPTIONS = [
  'Inter', 'Roboto', 'Poppins', 'Montserrat', 'Open Sans'
];

const BUTTON_STYLES = [
  { value: 'rounded', label: 'Rounded' },
  { value: 'sharp', label: 'Sharp' },
  { value: 'pill', label: 'Pill' }
];

const ANIMATIONS = [
  { value: 'none', label: 'None' },
  { value: 'scale', label: 'Scale' },
  { value: 'shine', label: 'Shine' },
  { value: 'shake', label: 'Shake' }
];

const BACKGROUND_PATTERNS = [
  { value: 'none', label: 'None' },
  { value: 'dots', label: 'Dots' },
  { value: 'lines', label: 'Lines' },
  { value: 'grid', label: 'Grid' }
];

export function ThemeCustomizer({ theme, onThemeChange }: ThemeCustomizerProps) {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'buttons' | 'background'>('colors');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeColorKey, setActiveColorKey] = useState<keyof BioPageTheme['colorScheme']>('primary');

  const handleColorChange = (color: { hex: string }) => {
    onThemeChange({
      ...theme,
      colorScheme: {
        ...theme.colorScheme,
        [activeColorKey]: color.hex
      }
    });
  };

  const handleFontChange = (font: string) => {
    onThemeChange({
      ...theme,
      fontFamily: font
    });
  };

  const handleButtonStyleChange = (style: string) => {
    onThemeChange({
      ...theme,
      buttonStyle: style as BioPageTheme['buttonStyle']
    });
  };

  const handleAnimationChange = (animation: string) => {
    onThemeChange({
      ...theme,
      buttonAnimation: animation as BioPageTheme['buttonAnimation']
    });
  };

  return (
    <div className="space-y-6">
      {/* Theme Navigation */}
      <div className="flex space-x-4">
        <TabButton
          active={activeTab === 'colors'}
          onClick={() => setActiveTab('colors')}
          icon={<Paintbrush className="w-4 h-4" />}
          label="Colors"
        />
        <TabButton
          active={activeTab === 'typography'}
          onClick={() => setActiveTab('typography')}
          icon={<Type className="w-4 h-4" />}
          label="Typography"
        />
        <TabButton
          active={activeTab === 'buttons'}
          onClick={() => setActiveTab('buttons')}
          icon={<Layout className="w-4 h-4" />}
          label="Buttons"
        />
        <TabButton
          active={activeTab === 'background'}
          onClick={() => setActiveTab('background')}
          icon={<Layers className="w-4 h-4" />}
          label="Background"
        />
      </div>

      {/* Theme Options */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        {activeTab === 'colors' && (
          <ColorSchemeTab
            theme={theme}
            activeColorKey={activeColorKey}
            showColorPicker={showColorPicker}
            setActiveColorKey={setActiveColorKey}
            setShowColorPicker={setShowColorPicker}
            handleColorChange={handleColorChange}
          />
        )}

        {activeTab === 'typography' && (
          <TypographyTab
            currentFont={theme.fontFamily}
            onFontChange={handleFontChange}
          />
        )}

        {activeTab === 'buttons' && (
          <ButtonsTab
            currentStyle={theme.buttonStyle}
            currentAnimation={theme.buttonAnimation}
            onStyleChange={handleButtonStyleChange}
            onAnimationChange={handleAnimationChange}
          />
        )}

        {activeTab === 'background' && (
          <BackgroundTab
            theme={theme}
            onThemeChange={onThemeChange}
          />
        )}
      </div>
    </div>
  );
}

// Tab Button Component
interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
        ${active 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 hover:bg-gray-200'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

// Color Scheme Tab
function ColorSchemeTab({
  theme,
  activeColorKey,
  showColorPicker,
  setActiveColorKey,
  setShowColorPicker,
  handleColorChange
}: {
  theme: BioPageTheme;
  activeColorKey: keyof BioPageTheme['colorScheme'];
  showColorPicker: boolean;
  setActiveColorKey: React.Dispatch<React.SetStateAction<keyof BioPageTheme['colorScheme']>>;
  setShowColorPicker: React.Dispatch<React.SetStateAction<boolean>>;
  handleColorChange: (color: { hex: string }) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium mb-4">Color Scheme</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(theme.colorScheme).map(([key, value]) => (
          <button
            key={key}
            onClick={() => {
              setActiveColorKey(key as keyof BioPageTheme['colorScheme']);
              setShowColorPicker(true);
            }}
            className="flex items-center gap-2 p-2 border rounded-lg hover:border-blue-500 transition-colors"
          >
            <div
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: value }}
            />
            <span className="capitalize">{key}</span>
          </button>
        ))}
      </div>
      {showColorPicker && (
        <div className="absolute z-10 mt-2">
          <div
            className="fixed inset-0"
            onClick={() => setShowColorPicker(false)}
          />
          <ChromePicker
            color={theme.colorScheme[activeColorKey]}
            onChange={handleColorChange}
          />
        </div>
      )}
    </div>
  );
}

// Typography Tab
function TypographyTab({ currentFont, onFontChange }: { currentFont: string; onFontChange: (font: string) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium mb-4">Typography</h3>
      <div className="grid grid-cols-2 gap-4">
        {FONT_OPTIONS.map(font => (
          <button
            key={font}
            onClick={() => onFontChange(font)}
            className={`p-3 border rounded-lg hover:border-blue-500 transition-colors ${
              currentFont === font ? 'border-blue-500 bg-blue-50' : ''
            }`}
            style={{ fontFamily: font }}
          >
            {font}
          </button>
        ))}
      </div>
    </div>
  );
}

// Buttons Tab
function ButtonsTab({
  currentStyle,
  currentAnimation,
  onStyleChange,
  onAnimationChange
}: {
  currentStyle: string;
  currentAnimation: string;
  onStyleChange: (style: string) => void;
  onAnimationChange: (animation: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Button Style</h3>
        <div className="grid grid-cols-3 gap-4">
          {BUTTON_STYLES.map(style => (
            <button
              key={style.value}
              onClick={() => onStyleChange(style.value)}
              className={`p-3 border rounded-lg hover:border-blue-500 transition-colors ${
                currentStyle === style.value ? 'border-blue-500 bg-blue-50' : ''
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Button Animation</h3>
        <div className="grid grid-cols-2 gap-4">
          {ANIMATIONS.map(animation => (
            <button
              key={animation.value}
              onClick={() => onAnimationChange(animation.value)}
              className={`p-3 border rounded-lg hover:border-blue-500 transition-colors ${
                currentAnimation === animation.value ? 'border-blue-500 bg-blue-50' : ''
              }`}
            >
              {animation.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Background Tab
function BackgroundTab({ theme, onThemeChange }: { theme: BioPageTheme; onThemeChange: (theme: BioPageTheme) => void }) {
    const [showColorPicker, setShowColorPicker] = useState(false);

    function setActiveColorKey(key: keyof BioPageTheme['colorScheme']) {
        onThemeChange({
            ...theme,
            colorScheme: {
                ...theme.colorScheme,
                [key]: theme.colorScheme[key]
            }
        });
    }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Background Pattern</h3>
        <div className="grid grid-cols-2 gap-4">
          {BACKGROUND_PATTERNS.map(pattern => (
            <button
              key={pattern.value}
              onClick={() => onThemeChange({
                ...theme,
                backgroundPattern: pattern.value
              })}
              className={`p-3 border rounded-lg hover:border-blue-500 transition-colors ${
                theme.backgroundPattern === pattern.value ? 'border-blue-500 bg-blue-50' : ''
              }`}
            >
              {pattern.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Background Color</h3>
        <button
          onClick={() => {
            setShowColorPicker(true);
            setActiveColorKey('background');
          }}
          className="w-full p-3 border rounded-lg hover:border-blue-500 transition-colors"
          title="Select Background Color"
        >
          <div
            className="w-full h-12 rounded border"
            style={{ backgroundColor: theme.backgroundColor }}
          />
        </button>
      </div>
    </div>
  );
}