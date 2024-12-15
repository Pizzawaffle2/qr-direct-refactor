// src/app/bio-link/components/LinkCustomizer.tsx
'use client';

import { useState } from 'react';
import { BioLink } from '@/app/bio-links/types';
import { ChromePicker } from 'react-color';
import { 
  Link, 
  Edit2, 
  Trash2, 
  Move, 
  Image as ImageIcon,
  ExternalLink 
} from 'lucide-react';

interface LinkCustomizerProps {
  link: BioLink;
  onUpdate: (updatedLink: BioLink) => void;
  onDelete: (id: string) => void;
}

export function LinkCustomizer({ link, onUpdate, onDelete }: LinkCustomizerProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const animations = [
    { value: 'none', label: 'None' },
    { value: 'fade', label: 'Fade' },
    { value: 'slide', label: 'Slide' },
    { value: 'bounce', label: 'Bounce' }
  ];

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Move className="w-5 h-5 text-gray-400 cursor-move" />
          <input
            type="text"
            value={link.title}
            onChange={(e) => onUpdate({ ...link, title: e.target.value })}
            className="px-2 py-1 border rounded"
            placeholder="Link Title"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            title="Edit"
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            title="Delete"
            onClick={() => onDelete(link.id)}
            className="p-2 hover:bg-red-50 text-red-500 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="space-y-4 pt-4 border-t">
          <input
            type="url"
            value={link.url}
            onChange={(e) => onUpdate({ ...link, url: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            placeholder="https://"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Background Color</label>
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="w-full h-8 rounded border"
                style={{ backgroundColor: link.backgroundColor }}
              />
            </div>

            <div>
              <label htmlFor="animation-select" className="block text-sm font-medium mb-1">Animation</label>
              <select
                id="animation-select"
                value={link.animation}
                onChange={(e) => onUpdate({ ...link, animation: e.target.value as BioLink['animation'] })}
                className="w-full px-3 py-2 border rounded"
              >
                {animations.map((anim) => (
                  <option key={anim.value} value={anim.value}>
                    {anim.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {showColorPicker && (
            <div className="absolute z-10">
              <div
                className="fixed inset-0"
                onClick={() => setShowColorPicker(false)}
              />
              <ChromePicker
                color={link.backgroundColor}
                onChange={(color) => onUpdate({ ...link, backgroundColor: color.hex })}
              />
            </div>
          )}
        </div>
      )}

      {/* Preview */}
      <div className="mt-4">
        <div
          className={`p-3 rounded-lg transition-all ${link.animation}`}
          style={{
            backgroundColor: link.backgroundColor || '#f3f4f6',
            color: link.textColor || '#000000'
          }}
        >
          <div className="flex items-center justify-between">
            <span>{link.title}</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}