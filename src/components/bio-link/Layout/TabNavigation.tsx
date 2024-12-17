
// src/app/bio-link/components/layout/TabNavigation.tsx
import { TabType } from '@/app/bio-links/types';
import { Palette, Layout, Eye } from 'lucide-react';
import { useBioPageStore } from '@/app/bio-links/store/bioPageStore';

const TABS: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
  { id: 'edit', label: 'Edit Content', icon: <Layout /> },
  { id: 'theme', label: 'Customize Theme', icon: <Palette /> },
  { id: 'preview', label: 'Preview', icon: <Eye /> },
];

export function TabNavigation() {
  const { activeTab, setActiveTab } = useBioPageStore();

  return (
    <div className="flex justify-center gap-4 mb-8">
      {TABS.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors
            ${activeTab === id 
              ? 'bg-blue-500 text-white' 
              : 'bg-white hover:bg-gray-50'
            }`}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}