// src/app/bio-link/components/CustomizationPanel.tsx
'use client';

import { useState } from 'react';
import { ChromePicker } from 'react-color';
import { 
  Palette, 
  Type, 
  Layout, 
  Image as ImageIcon,
  Share2 
} from 'lucide-react';

interface CustomizationPanelProps {
  theme: any;
  onUpdate: (theme: any) => void;
}

export function CustomizationPanel({ theme, onUpdate }: CustomizationPanelProps) {
  const [activeTab, setActiveTab] = useState('layout');

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('layout')}
          className={`px-4 py-2 rounded ${activeTab === 'layout' ? 'bg-blue-50 text-blue-500' : ''}`}
        >
          Layout
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`px-4 py-2 rounded ${activeTab === 'style' ? 'bg-blue-50 text-blue-500' : ''}`}
        >
          Style
        </button>
        <button
          onClick={() => setActiveTab('fonts')}
          className={`px-4 py-2 rounded ${activeTab === 'fonts' ? 'bg-blue-50 text-blue-500' : ''}`}
        >
          Typography
        </button>
      </div>

      {/* Layout Options */}
      {activeTab === 'layout' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Layout Style</label>
            <div className="grid grid-cols-3 gap-3">
              <button className="p-4 border rounded hover:border-blue-500">List</button>
              <button className="p-4 border rounded hover:border-blue-500">Grid</button>
              <button className="p-4 border rounded hover:border-blue-500">Cards</button>
            </div>
          </div>
          {/* Add spacing controls */}
          {/* Add alignment options */}
        </div>
      )}

      {/* Style Options */}
      {activeTab === 'style' && (
        <div className="space-y-4">
          {/* Background options */}
          {/* Button styles */}
          {/* Color schemes */}
        </div>
      )}

      {/* Typography Options */}
      {activeTab === 'fonts' && (
        <div className="space-y-4">
          {/* Font family selector */}
          {/* Font size controls */}
          {/* Text alignment */}
        </div>
      )}
    </div>
  );
}