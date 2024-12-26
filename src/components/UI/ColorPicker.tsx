// src/components/UI/ColorPicker.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Check, History, Plus, Palette, Copy, Trash } from 'lucide-react';
import { toast } from 'react-toastify';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  withOpacity?: boolean;
}

// Extended color presets organized by color families
const COLOR_PRESETS = {
  Monochrome: ['#000000', '#FFFFFF', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB', '#F3F4F6'],
  Red: ['#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FEE2E2'],
  Orange: ['#EA580C', '#F97316', '#FB923C', '#FDBA74', '#FED7AA'],
  Amber: ['#D97706', '#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A'],
  Yellow: ['#CA8A04', '#EAB308', '#FACC15', '#FDE047', '#FEF08A'],
  Lime: ['#65A30D', '#84CC16', '#A3E635', '#BEF264', '#D9F99D'],
  Green: ['#16A34A', '#22C55E', '#4ADE80', '#86EFAC', '#BBF7D0'],
  Emerald: ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'],
  Teal: ['#0D9488', '#14B8A6', '#2DD4BF', '#5EEAD4', '#99F6E4'],
  Cyan: ['#0891B2', '#06B6D4', '#22D3EE', '#67E8F9', '#A5F3FC'],
  Blue: ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
  Indigo: ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'],
  Purple: ['#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE'],
  Pink: ['#DB2777', '#EC4899', '#F472B6', '#F9A8D4', '#FBCFE8'],
  Brand: ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B']
};

interface RGBAColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

function hexToRGBA(hex: string): RGBAColor {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const a = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1;
  return { r, g, b, a };
}

function rgbaToHex({ r, g, b, a = 1 }: RGBAColor): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  const alpha = Math.round(a * 255);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${alpha < 255 ? toHex(alpha) : ''}`;
}

function generatePalette(baseColor: string): string[] {
  const { r, g, b } = hexToRGBA(baseColor);
  const palette = [];
  
  // Generate lighter and darker shades
  for (let i = 0.1; i <= 1; i += 0.2) {
    const lightShade = rgbaToHex({
      r: Math.min(255, r + (255 - r) * i),
      g: Math.min(255, g + (255 - g) * i),
      b: Math.min(255, b + (255 - b) * i),
      a: 1
    });
    palette.push(lightShade);
  }
  
  return palette.reverse();
}

const MAX_HISTORY = 10;

export function ColorPicker({ color, onChange, withOpacity = false }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'history' | 'palette'>('presets');
  const [opacity, setOpacity] = useState(100);
  const [colorHistory, setColorHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('colorHistory') || '[]');
    }
    return [];
  });
  const [generatedPalette, setGeneratedPalette] = useState<string[]>([]);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
    }
  }, [colorHistory]);

  const handleColorChange = (newColor: string) => {
    const rgbaColor = hexToRGBA(newColor);
    if (withOpacity) {
      rgbaColor.a = opacity / 100;
    }
    const finalColor = rgbaToHex(rgbaColor);
    
    // Add to history
    const newHistory = [finalColor, ...colorHistory.filter(c => c !== finalColor)]
      .slice(0, MAX_HISTORY);
    setColorHistory(newHistory);
    
    onChange(finalColor);
    setIsOpen(false);
  };

  const generateNewPalette = () => {
    const palette = generatePalette(color);
    setGeneratedPalette(palette);
    setActiveTab('palette');
  };

  return (
    <div className="relative" ref={pickerRef}>
      {/* Color Display and Input */}
      <div className="flex gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm"
          style={{ backgroundColor: color }}
        >
          {color.toLowerCase() === '#ffffff' && (
            <div className="w-full h-full border-2 border-dashed border-gray-300" />
          )}
        </button>
        <input
          type="text"
          value={color.toUpperCase()}
          onChange={(e) => {
            const newColor = e.target.value;
            if (/^#[0-9A-F]{0,8}$/i.test(newColor)) {
              onChange(newColor.toUpperCase());
            }
          }}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 
                     text-gray-900 dark:text-gray-100 w-32"
          placeholder="#000000"
        />
        
        <div className="flex gap-1">
          <button
            onClick={generateNewPalette}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 
                     hover:bg-gray-50 dark:hover:bg-gray-700"
            title="Generate palette"
          >
            <Palette className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 
                     hover:bg-gray-50 dark:hover:bg-gray-700"
            title="Color history"
          >
            <History className="w-5 h-5" />
          </button>
        </div>
      </div>

      {withOpacity && (
        <div className="mt-2 flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => {
              setOpacity(Number(e.target.value));
              const rgbaColor = hexToRGBA(color);
              rgbaColor.a = Number(e.target.value) / 100;
              onChange(rgbaToHex(rgbaColor));
            }}
            className="flex-1 accent-blue-500"
            title="Opacity"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
            {opacity}%
          </span>
        </div>
      )}

      {/* Color Picker Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl 
                      border border-gray-200 dark:border-gray-700 w-72 z-50">
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${activeTab === 'presets'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              Presets
            </button>
            <button
              onClick={() => setActiveTab('palette')}
              className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${activeTab === 'palette'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              Palette
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${activeTab === 'history'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              History
            </button>
          </div>

          {/* Content */}
          <div className="max-h-64 overflow-y-auto">
            {activeTab === 'presets' && (
              <div className="space-y-4">
                {Object.entries(COLOR_PRESETS).map(([family, colors]) => (
                  <div key={family}>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {family}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {colors.map((presetColor) => (
                        <button
                          key={presetColor}
                          onClick={() => handleColorChange(presetColor)}
                          className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 
                                   flex items-center justify-center relative hover:scale-110 transition-transform"
                          style={{ backgroundColor: presetColor }}
                        >
                          {presetColor === color && (
                            <Check className={`w-4 h-4 ${
                              presetColor.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'
                            }`} />
                          )}
                          {presetColor.toLowerCase() === '#ffffff' && (
                            <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-lg" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'palette' && (
              <div className="space-y-4">
                <button
                  onClick={generateNewPalette}
                  className="w-full px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Generate New Palette
                </button>
                <div className="grid grid-cols-5 gap-2">
                  {generatedPalette.map((paletteColor, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorChange(paletteColor)}
                      className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 
                               flex items-center justify-center hover:scale-110 transition-transform"
                      style={{ backgroundColor: paletteColor }}
                    >
                      {paletteColor === color && (
                        <Check className={`w-4 h-4 ${
                          paletteColor.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'
                        }`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

{activeTab === 'history' && (
              <div className="space-y-2">
                {colorHistory.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                    No colors in history yet
                  </p>
                ) : (
                  <>
                    {colorHistory.map((historyColor, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 group"
                      >
                        <button
                          onClick={() => handleColorChange(historyColor)}
                          className="flex-1 h-8 rounded-lg border border-gray-200 dark:border-gray-700 
                                   flex items-center gap-2 px-2 hover:scale-[1.02] transition-transform"
                          style={{ backgroundColor: historyColor }}
                        >
                          <span className={`text-xs ${
                            historyColor.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'
                          }`}>
                            {historyColor.toUpperCase()}
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            const newHistory = colorHistory.filter((_, i) => i !== index);
                            setColorHistory(newHistory);
                          }}
                          className="p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity
                                   text-gray-400 hover:text-red-500"
                          title="Remove from history"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(historyColor);
                            toast.success('Color copied to clipboard');
                          }}
                          className="p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity
                                   text-gray-400 hover:text-blue-500"
                          title="Copy to clipboard"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setColorHistory([])}
                      className="w-full mt-2 px-3 py-1.5 text-sm text-red-500 hover:text-red-600 
                               hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                    >
                      Clear History
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Custom Color Input */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(e.target.value.toUpperCase())}
              className="sr-only"
              id="color-picker-input"
            />
            <label
              htmlFor="color-picker-input"
              className="flex items-center justify-center px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 
                       text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-200 
                       dark:hover:bg-gray-600 cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Custom Color
            </label>
          </div>
        </div>
      )}
    </div>
  );
}