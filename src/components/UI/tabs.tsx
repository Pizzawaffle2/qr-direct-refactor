// src/components/UI/tabs.tsx
'use client';

import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface TabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
  tabs: {
    id: string;
    label: string;
    icon: LucideIcon;
  }[];
  children: ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onChange, tabs, children }) => {
  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-300 mb-4" role="tablist">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition ${
                isActive
                  ? 'border-b-2 border-blue-500 text-blue-500 font-semibold'
                  : 'text-gray-600 hover:text-blue-400'
              }`}
              onClick={() => onChange(tab.id)}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div>{children}</div>
    </div>
  );
};

interface TabContentProps {
  tabId: string;
  activeTab: string;
  children: ReactNode;
}

export const TabContent: React.FC<TabContentProps> = ({ tabId, activeTab, children }) => {
  return tabId === activeTab ? (
    <div id={`panel-${tabId}`} role="tabpanel" aria-labelledby={`tab-${tabId}`}>{children}</div>
  ) : null;
};
