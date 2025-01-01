// src/components/calendar/style-editor.tsx
'use client';

import React from 'react';
import { Label } from '@/components/UI/Label';
import { Input } from '@/components/UI/input';
import Switch from '@/components/UI/Switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/Select';
import { Card } from '@/components/UI/Card';
import { ColorPicker } from '@/components/UI/ColorPicker';
import { Palette, Layout, Settings } from 'lucide-react';
import { Tabs, TabContent } from '@/components/UI/tabs';
import { CalendarSettings, ThemeColors } from '@/types/calendar';

interface StyleEditorProps {
  value: {
    firstDayOfWeek: '0' | '1';
    showWeekNumbers: boolean;
    theme: {
      colors: ThemeColors;
    };
    monthsPerRow: number;
    options: {
      showLunarPhases: boolean;
      showHolidays: boolean;
      showWeather: boolean;
      showNotes: boolean;
    }
  };
  onChange: (settings: Partial<CalendarSettings>) => void;
}

const TABS = [
  { id: 'colors', label: 'Colors', icon: Palette },
  { id: 'layout', label: 'Layout', icon: Layout },
  { id: 'features', label: 'Features', icon: Settings }
];

export function StyleEditor({ value, onChange }: StyleEditorProps) {
  const [activeTab, setActiveTab] = React.useState('colors');
  
  // Ensure options exist with default values
  value.options = value.options || {
    showLunarPhases: false,
    showHolidays: false,
    showWeather: false,
    showNotes: false
  };

  const updateValue = (path: string[], newValue: any) => {
    const newSettings = { ...value };
    let current: any = newSettings;
    
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }
    
    current[path[path.length - 1]] = newValue;
    onChange(newSettings);
  };

  const handleColorChange = (colorKey: string, newColor: string) => {
    updateValue(['theme', 'colors', colorKey], newColor);
  };

  const handleOptionChange = (optionKey: string, newValue: boolean) => {
    updateValue(['options', optionKey], newValue);
  };

  return (
    <div className="space-y-6">
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={TABS}
      >
        <TabContent tabId="colors" activeTab={activeTab}>
          <Card className="p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Color Settings</h3>
              
              {Object.entries(value.theme?.colors ?? {}).map(([key, color]) => (
                <div key={key} className="grid gap-2">
                  <Label className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <div className="flex gap-2">
                    <ColorPicker
                      color={color}
                      onChange={(newColor) => handleColorChange(key, newColor)}
                    />
                    <Input
                      value={color}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="flex-1"
                      placeholder={`Enter ${key} color`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabContent>

        <TabContent tabId="layout" activeTab={activeTab}>
          <Card className="p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Layout Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>First Day of Week</Label>
                    <p className="text-sm text-gray-500">Choose starting day</p>
                  </div>
                  <Select
                    value={value.firstDayOfWeek}
                    onValueChange={(val: '0' | '1') => 
                      updateValue(['firstDayOfWeek'], val)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Sunday</SelectItem>
                      <SelectItem value="1">Monday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Week Numbers</Label>
                    <p className="text-sm text-gray-500">Show week numbers</p>
                  </div>
                  <Switch
                    isChecked={value.showWeekNumbers}
                    onCheckedChange={(checked: boolean) => 
                      updateValue(['showWeekNumbers'], checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Months per Row</Label>
                    <p className="text-sm text-gray-500">Display multiple months</p>
                  </div>
                  <Select
                    value={(value.monthsPerRow ?? 1).toString()}
                    onValueChange={(val) => 
                      updateValue(['monthsPerRow'], parseInt(val))
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">One</SelectItem>
                      <SelectItem value="2">Two</SelectItem>
                      <SelectItem value="3">Three</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </TabContent>

        <TabContent tabId="features" activeTab={activeTab}>
          <Card className="p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Features</h3>

              {[
                {
                  key: 'showLunarPhases',
                  label: 'Lunar Phases',
                  description: 'Show moon phases'
                },
                {
                  key: 'showHolidays',
                  label: 'Holidays',
                  description: 'Display holidays'
                },
                {
                  key: 'showWeather',
                  label: 'Weather',
                  description: 'Show weather info'
                },
                {
                  key: 'showNotes',
                  label: 'Notes',
                  description: 'Enable note taking'
                }
              ].map(({ key, label, description }: { key: keyof typeof value.options, label: string, description: string }) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <Label>{label}</Label>
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                  <Switch
                    isChecked={value.options[key]}
                    onCheckedChange={(checked: boolean) => 
                      handleOptionChange(key, checked)
                    }
                  />
                </div>
              ))}
            </div>
          </Card>
        </TabContent>
      </Tabs>
    </div>
  );
}

export default StyleEditor;