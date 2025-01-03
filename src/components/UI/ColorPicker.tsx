// src/components/UI/ColorPicker.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Check, History, Plus, Palette, Copy, Trash } from 'lucide-react';
import toast from 'react-hot-toast';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  withOpacity?: boolean;
}

// Extended color presets organized by color families
const COLOR_PRESETS = {
  Gray: ['#000000', '#FFFFFF', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB', '#F3F4F6'],
  Red: ['#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FEE2E2'],
  Blue: ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
  Green: ['#16A34A', '#22C55E', '#4ADE80', '#86EFAC', '#BBF7D0'],
  Purple: ['#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE'],
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  // Update dropdown position when opened
  useEffect(() => {
    if (isOpen && pickerRef.current) {
      const updatePosition = () => {
        const buttonRect = pickerRef.current?.getBoundingClientRect();
        const dropdownRect = dropdownRef.current?.getBoundingClientRect();

        if (!buttonRect || !dropdownRect) return;

        const spaceBelow = window.innerHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;
        const dropdownHeight = dropdownRect.height;

        let top: number;
        if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
          top = buttonRect.bottom + 8;
        } else {
          top = buttonRect.top - dropdownHeight - 8;
        }

        let left = buttonRect.left;
        const rightOverflow = buttonRect.left + dropdownRect.width - window.innerWidth;
        if (rightOverflow > 0) {
          left = Math.max(8, left - rightOverflow - 8);
        }

        setDropdownPosition({ top, left });
      };

      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen]);

  // Handle clicks outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        dropdownRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Persist color history
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

    const newHistory = [finalColor, ...colorHistory.filter(c => c !== finalColor)]
      .slice(0, MAX_HISTORY);
    setColorHistory(newHistory);

    onChange(finalColor);
    setIsOpen(false);
  };

  const handlePaletteGeneration = () => {
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
          className="w-10 h-10 rounded-lg border border-gray-700 overflow-hidden shadow-sm flex items-center justify-center"
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
          className="px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 w-32"
          placeholder="#000000"
        />

        <div className="flex gap-1">
          <button
            onClick={handlePaletteGeneration}
            className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:text-gray-200 hover:bg-gray-700"
            title="Generate palette"
          >
            <Palette className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setIsOpen(true);
              setActiveTab('history');
            }}
            className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:text-gray-200 hover:bg-gray-700"
            title="Color history"
          >
            <History className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Opacity Slider */}
      {withOpacity && (
        <div className="mt-2 flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => {
              const newOpacity = Number(e.target.value);
              setOpacity(newOpacity);
              const rgbaColor = hexToRGBA(color);
              rgbaColor.a = newOpacity / 100;
              onChange(rgbaToHex(rgbaColor));
            }}
            className="flex-1 accent-blue-500"
            title="Opacity"
          />
          <span className="text-sm text-gray-400 w-12">{opacity}%</span>
        </div>
      )}

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: 'fixed',
            top: dropdownPosition.top,
            left: dropdownPosition.left
          }}
          className="w-[280px] bg-gray-900 rounded-lg shadow-xl border border-gray-700 z-[9999]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Tabs */}
          <div className="p-2 border-b border-gray-700">
            <div className="flex gap-1 bg-gray-900/50 p-1 rounded-md">
              <button
                onClick={() => setActiveTab('presets')}
                className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                  ${activeTab === 'presets'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-gray-200'
                  }`}
              >
                Presets
              </button>
              <button
                onClick={() => setActiveTab('palette')}
                className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                  ${activeTab === 'palette'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-gray-200'
                  }`}
              >
                Palette
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                  ${activeTab === 'history'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-gray-200'
                  }`}
              >
                History
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4">
            <div className="max-h-[300px] overflow-y-auto">
              {activeTab === 'presets' && (
                <div className="space-y-4">
                  {Object.entries(COLOR_PRESETS).map(([family, colors]) => (
                    <div key={family}>
                      <div className="text-sm font-medium text-gray-200 mb-2">
                        {family}
                      </div>
                      <div className="grid grid-cols-7 gap-1.5">
                        {colors.map((presetColor) => (
                          <button
                            key={presetColor}
                            onClick={() => handleColorChange(presetColor)}
                            className="w-8 h-8 rounded-lg border border-gray-700 
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
                    onClick={handlePaletteGeneration}
                    className="w-full px-4 py-2 text-sm bg-blue-500 text-white rounded-lg 
                        hover:bg-blue-600 transition-colors"
                  >
                    Generate New Palette
                  </button>
                  <div className="grid grid-cols-5 gap-2">
                    {generatedPalette.map((paletteColor, index) => (
                      <button
                        key={index}
                        onClick={() => handleColorChange(paletteColor)}
                        className="w-12 h-12 rounded-lg border border-gray-700 
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
                    <p className="text-sm text-gray-400 text-center py-4">
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
                            className="flex-1 h-8 rounded-lg border border-gray-700 
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
                              hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        Clear History
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Custom Color Input */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(e.target.value.toUpperCase())}
                className="sr-only"
                id="color-picker-input"
              />
              <label
                htmlFor="color-picker-input"
                className="flex items-center justify-center px-4 py-2 text-sm bg-gray-700 
                    text-gray-200 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Custom Color
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}