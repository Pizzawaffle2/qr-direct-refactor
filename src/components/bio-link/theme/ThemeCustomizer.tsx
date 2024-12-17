
// src/app/bio-link/components/theme/ThemeCustomizer.tsx
import { BioPageTheme } from '@/app/bio-links/types';
import { TabButton } from '@/components/UI/TabButton';
import { ColorSchemeCustomizer } from './ColorSchemeCustomizer';
import { ButtonStyleCustomizer } from './ButtonStyleCustomizer';
import { useState } from 'react';
import { useEffect } from 'react';
import { Paintbrush, Type, Layout } from 'lucide-react';
import { TypographyCustomizer } from './TypographyCustomizer';
import { useBioPageStore } from '@/app/bio-links/store/bioPageStore';
export function ThemeCustomizer() {
    const { bioPage, updateTheme } = useBioPageStore();
    const [activeTab, setActiveTab] = useState('colors');
    const [theme, setTheme] = useState(bioPage.theme);

    useEffect(() => {
        setTheme(bioPage.theme);
    }, [bioPage.theme]);
    const onThemeChange = (newTheme: LocalBioPageTheme) => {
        const updatedTheme: BioPageTheme = {
          ...newTheme,
          fontSize: (theme.fontSize as 'small' | 'medium' | 'large') || 'medium',  // Provide defaults
          textAlign: theme.textAlign || 'center',
          fontWeight: theme.fontWeight || 'normal'
        };
        
        setTheme(updatedTheme);
        updateTheme(updatedTheme);
      };
      
  return (
    <div className="space-y-6">
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
      </div>

      <div className="p-6 bg-white rounded-lg shadow-sm">
        {activeTab === 'colors' && (
          <ColorSchemeCustomizer theme={theme} onThemeChange={onThemeChange} />
        )}
        {activeTab === 'buttons' && (
          <ButtonStyleCustomizer theme={theme} onThemeChange={onThemeChange} />
        )}
      {activeTab === 'typography' && (
  <TypographyCustomizer />
  )}
      </div>
    </div>
  );
}
