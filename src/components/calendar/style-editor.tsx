'use client';

import { Tabs } from '@/components/UI/tabs';
import { Label } from '@/components/UI/Label';
import Slider from '@/components/UI/Slider';
import InputField from '@/components/UI/InputField';
import Switch from '@/components/UI/Switch';
import { ColorPicker } from '@/components/UI/ColorPicker';
import { Palette, Layout, Type, Settings } from 'lucide-react';

interface StyleEditorProps {
  value: {
    firstDayOfWeek: 0 | 1;
    showWeekNumbers: boolean;
    theme: {
      colors: {
        primary: string;
        background: string;
      }
    };
    monthsPerRow: number;
    options: {
      showLunarPhases: boolean;
      showHolidays: boolean;
      showWeather: boolean;
      showNotes: boolean;
    }
  };
  onChange: (value: any) => void;
}

export function CalendarStyleEditor({ value, onChange }: StyleEditorProps) {
  const defaultValue = {
    firstDayOfWeek: 0,
    showWeekNumbers: false,
    theme: {
      colors: {
        primary: '',
        background: ''
      }
    },
    monthsPerRow: 1,
    options: {
      showLunarPhases: false,
      showHolidays: false,
      showWeather: false,
      showNotes: false
    }
  };

  const mergedValue = { ...defaultValue, ...value };

  const tabs = [
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'features', label: 'Features', icon: Settings }
  ];

  const updateValue = (path: (string | number)[], newValue: any) => {
    const newSettings = { ...mergedValue };
    let current = newSettings;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i] as keyof typeof defaultValue] as any;
    }
    (current as any)[path[path.length - 1]] = newValue;
    onChange(newSettings);
  };

  return (
    <Tabs
      activeTab="theme"
      onChange={() => {}}
      tabs={tabs}
    >
      {/* Theme Settings */}
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Colors</Label>
            <div className="grid gap-4 mt-2">
              <div>
                <Label>Primary</Label>
                <ColorPicker
                  color={mergedValue.theme.colors.primary}
                  onChange={(color) => updateValue(['theme', 'colors', 'primary'], color)}
                />
              </div>
              <div>
                <Label>Background</Label>
                <ColorPicker
                  color={mergedValue.theme.colors.background}
                  onChange={(color) => updateValue(['theme', 'colors', 'background'], color)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Start Week on Monday</Label>
            <p className="text-sm text-gray-500">Change first day of the week</p>
          </div>
          <Switch
            isChecked={mergedValue.firstDayOfWeek === 1}
            onChange={(checked) => updateValue(['firstDayOfWeek'], checked ? 1 : 0)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Show Week Numbers</Label>
            <p className="text-sm text-gray-500">Display week numbers in calendar</p>
          </div>
          <Switch
            isChecked={mergedValue.showWeekNumbers}
            onChange={(checked) => updateValue(['showWeekNumbers'], checked)}
          />
        </div>

        <div>
          <Label>Month Layout ({mergedValue.monthsPerRow} per row)</Label>
          <Slider
            value={mergedValue.monthsPerRow}
            onChange={(value) => updateValue(['monthsPerRow'], value)}
            min={1}
            max={4}
            step={1}
          />
        </div>
      </div>

      {/* Features Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Lunar Phases</Label>
            <p className="text-sm text-gray-500">Show moon phases in calendar</p>
          </div>
          <Switch
            isChecked={mergedValue.options.showLunarPhases}
            onChange={(checked) => updateValue(['options', 'showLunarPhases'], checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Holidays</Label>
            <p className="text-sm text-gray-500">Display holidays and special dates</p>
          </div>
          <Switch
            isChecked={mergedValue.options.showHolidays}
            onChange={(checked) => updateValue(['options', 'showHolidays'], checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Weather</Label>
            <p className="text-sm text-gray-500">Show weather information</p>
          </div>
          <Switch
            isChecked={mergedValue.options.showWeather}
            onChange={(checked) => updateValue(['options', 'showWeather'], checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Notes Section</Label>
            <p className="text-sm text-gray-500">Add notes area to calendar</p>
          </div>
          <Switch
            isChecked={mergedValue.options.showNotes}
            onChange={(checked) => updateValue(['options', 'showNotes'], checked)}
          />
        </div>
      </div>
    </Tabs>
  );
}