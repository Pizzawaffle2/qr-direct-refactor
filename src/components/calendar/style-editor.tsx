'use client';

import React from 'react';
import { Label } from '@/components/UI/Label';
import Switch from '@/components/UI/Switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/Select';
import { Card } from '@/components/UI/Card';
import { ColorPicker } from '@/components/UI/ColorPicker';
import { Palette, Layout, Settings } from 'lucide-react';
import { Tabs, TabContent } from '@/components/UI/tabs';
import { CalendarSettings, ThemeColors, DEFAULT_THEME } from '@/types/calendar';
import { useCalendarSettings } from '@/context/CalendarSettingsContext';

const TABS = [
  { id: 'colors', label: 'Colors', icon: Palette },
  { id: 'layout', label: 'Layout', icon: Layout },
  { id: 'features', label: 'Features', icon: Settings },
];

export function StyleEditor({ onChange }: { onChange?: (settings: Partial<CalendarSettings>) => void }) {
  const { settings, updateSettings } = useCalendarSettings();
  const [activeTab, setActiveTab] = React.useState('colors');

  // Get theme colors from DEFAULT_THEME
  const themeColors = React.useMemo(() => DEFAULT_THEME.colors, []);

  const handleColorChange = (colorKey: string, newColor: string) => {
    const updatedTheme = {
      ...DEFAULT_THEME,
      colors: {
        ...DEFAULT_THEME.colors,
        [colorKey]: newColor
      }
    };

    // Update the theme in the settings
    const updatedSettings = {
      ...settings,
      theme: updatedTheme 
    };
    updateSettings(updatedSettings);
    onChange?.(updatedSettings);
  };

  const handleLayoutChange = (key: keyof CalendarSettings, value: any) => {
    const updatedSettings = {
      ...settings,
      [key]: value
    };
    updateSettings(updatedSettings);
    onChange?.(updatedSettings);
  };

  return (
    <div className="space-y-6">
      <Tabs activeTab={activeTab} onChange={setActiveTab} tabs={TABS}>
        <TabContent tabId="colors" activeTab={activeTab}>
          <Card className="p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Color Settings</h3>
              {Object.entries(themeColors).map(([key, color]) => (
                <div key={key} className="grid gap-2">
                  <Label className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <ColorPicker
                    color={color}
                    onChange={(newColor) => handleColorChange(key, newColor)}
                  />
                </div>
              ))}
            </div>
          </Card>
        </TabContent>
        <TabContent tabId="layout" activeTab={activeTab}>
          <Card className="p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Layout Settings</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label>First Day of Week</Label>
                  <p className="text-sm text-gray-500">Choose starting day</p>
                </div>
                <Select
                  value={settings.firstDayOfWeek.toString()}
                  onValueChange={(val: string) => handleLayoutChange('firstDayOfWeek', parseInt(val))}
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
                  checked={settings.showWeekNumbers}
                  onCheckedChange={(checked) => handleLayoutChange('showWeekNumbers', checked)}
                />
              </div>
            </div>
          </Card>
        </TabContent>
        <TabContent tabId="features" activeTab={activeTab}>
          <Card className="p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Features</h3>
              {[
                { key: 'showLunarPhases', label: 'Lunar Phases', description: 'Show moon phases' },
                { key: 'showHolidays', label: 'Holidays', description: 'Display holidays' },
                { key: 'showWeather', label: 'Weather', description: 'Show weather info' }
              ].map(({ key, label, description }) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <Label>{label}</Label>
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                  <Switch
                    checked={settings[key as keyof CalendarSettings] as boolean}
                    onCheckedChange={(checked) => handleLayoutChange(key, checked)}
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