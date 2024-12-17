// src/app/bio-links/page.tsx
'use client';

import { useBioPageStore, useBioPageLoadingState, useBioPageError } from './store/bioPageStore';
import { ProfileEditor } from '@/components/bio-link/profile/ProfileEditor';
import { PresetThemes } from '@/components/bio-link/theme/PresetThemes';
import { ThemeCustomizer } from '@/components/bio-link/theme/ThemeCustomizer';
import { ThemePreview } from '@/components/bio-link/theme/ThemePreview';
import { LinkCustomizer } from '@/components/bio-link/link/LinkCustomizer';
import { TabNavigation } from '@/components/bio-link/Layout/TabNavigation';

export default function BioLinkPage() {
  const { bioPage, activeTab, savePage } = useBioPageStore();
  const { isSaving } = useBioPageLoadingState();
  const error = useBioPageError();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8">
          Bio Link Generator
        </h1>
        
        <TabNavigation />
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Editor/Customizer */}
          <div className="space-y-6">
            {activeTab === 'edit' && (
              <>
                <ProfileEditor />
                <LinkCustomizer />
              </>
            )}
            {activeTab === 'theme' && (
              <>
                <PresetThemes />
                <ThemeCustomizer />
              </>
            )}
            <button
              onClick={savePage}
              disabled={isSaving}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {/* Right Column - Live Preview */}
          <div className="lg:sticky lg:top-8">
            <ThemePreview
              theme={bioPage.theme}
              links={bioPage.links}
              profileName={bioPage.name}
              bio={bioPage.bio}
              profileImage={bioPage.profileImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}