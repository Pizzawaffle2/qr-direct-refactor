'use client';

import { useState } from 'react';
import { ThemeCustomizer } from '@/components/bio-link/ThemeCustomizer';
import { ThemePreview } from '@/components/bio-link/ThemePreview';
import { LinkCustomizer } from '@/components/bio-link/LinkCustomizer';
import { PRESET_THEMES } from '@/constants/bio-link/presetThemes';
import { BioPageTheme, BioLink } from './types';
import { Palette, Layout, Eye } from 'lucide-react';

interface ThemePreviewProps {
  theme: BioPageTheme;
  links: BioLink[];
  profileName: string;
  bio: string;
  profileImage?: string | null | undefined;
}

export default function BioLinkPage() {
  const [activeTab, setActiveTab] = useState<'edit' | 'theme' | 'preview'>('edit');
  const [theme, setTheme] = useState<BioPageTheme>(PRESET_THEMES.classic);
  const [links, setLinks] = useState<BioLink[]>([]);
  const [profileName, setProfileName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8">
          Bio Link Generator
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <TabButton
            active={activeTab === 'edit'}
            onClick={() => setActiveTab('edit')}
            icon={<Layout />}
            label="Edit Content"
          />
          <TabButton
            active={activeTab === 'theme'}
            onClick={() => setActiveTab('theme')}
            icon={<Palette />}
            label="Customize Theme"
          />
          <TabButton
            active={activeTab === 'preview'}
            onClick={() => setActiveTab('preview')}
            icon={<Eye />}
            label="Preview"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Editor/Customizer */}
          <div>
            {activeTab === 'edit' && (
              <div className="space-y-6">
                {/* Profile Editor */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Profile</h2>
                  {/* Add profile editing components */}
                </div>

                {/* Links Editor */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Links</h2>
                  {/* Add link editing components */}
                </div>
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="space-y-6">
                {/* Preset Themes */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Preset Themes</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(PRESET_THEMES).map(([key, presetTheme]) => (
                      <button
                        key={key}
                        onClick={() => setTheme(presetTheme)}
                        className={`p-4 border rounded-lg hover:border-blue-500 transition-colors ${
                          theme.name === presetTheme.name ? 'border-blue-500 bg-blue-50' : ''
                        }`}
                      >
                        {presetTheme.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Customizer */}
                <ThemeCustomizer
                  theme={theme}
                  onThemeChange={setTheme}
                />
              </div>
            )}
          </div>

          {/* Right Column - Live Preview */}
          <div className="lg:sticky lg:top-8">
            <ThemePreview
              theme={theme}
              links={links}
              profileName={profileName}
              bio={bio}
              profileImage={profileImage}
            />
          </div>
        </div>
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
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors
        ${active 
          ? 'bg-blue-500 text-white' 
          : 'bg-white hover:bg-gray-50'
        }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}