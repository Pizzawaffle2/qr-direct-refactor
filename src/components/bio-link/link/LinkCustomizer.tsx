// src/components/bio-link/link/LinkCustomizer.tsx
'use client';

import { useState } from 'react';
import { useBioPageStore } from '@/app/bio-links/store/bioPageStore';
import { AnimationType, BioLink } from '@/app/bio-links/types';
import { ChromePicker } from 'react-color';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Link,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Github,
  Globe,
  Mail,
  Youtube,
  Plus,
  Edit2,
  Trash2,
  GripVertical,
  ExternalLink,
  PenOff
} from 'lucide-react';
import { BsTwitterX } from "react-icons/bs";
import { TbBrandOnlyfans, TbBrandTiktok } from "react-icons/tb";

const PRESET_LINKS = [
  { 
    title: 'Website',
    icon: 'globe',
    IconComponent: Globe,
    placeholder: 'https://your-website.com',
    defaultColor: '#39E09B'  // Linktree green
  },
  { 
    title: 'Instagram',
    icon: 'instagram',
    IconComponent: Instagram,
    placeholder: 'https://instagram.com/username',
    defaultColor: '#E4405F'  // Instagram brand color
  },
  { 
    title: 'X',
    icon: 'X',
    IconComponent: BsTwitterX,
    placeholder: 'https://twitter.com/username',
    defaultColor: '#000000'
  },
  { 
    title: 'LinkedIn',
    icon: 'linkedin',
    IconComponent: Linkedin,
    placeholder: 'https://linkedin.com/in/username',
    defaultColor: '#0A66C2'  // LinkedIn brand color
  },
  { 
    title: 'GitHub',
    icon: 'github',
    IconComponent: Github,
    placeholder: 'https://github.com/username',
    defaultColor: '#24292E'  // GitHub brand color
  },
  { 
    title: 'YouTube',
    icon: 'youtube',
    IconComponent: Youtube,
    placeholder: 'https://youtube.com/@channel',
    defaultColor: '#FF0000'  // YouTube brand color
  },
  { 
    title: 'TikTok',
    icon: 'tiktok',
    IconComponent: TbBrandTiktok,
    placeholder: 'https://tiktok.com/@username',
    defaultColor: '#000000'
  },
  { 
    title: 'Email',
    icon: 'mail',
    IconComponent: Mail,
    placeholder: 'mailto:your@email.com',
    defaultColor: '#000000'
  },
  { 
    title: 'OnlyFans',
    icon: 'OnlyFans',
    IconComponent: TbBrandOnlyfans,
    placeholder: 'https://onlyfans.com/username',
    defaultColor: '#000000'
  },
];

const ANIMATION_OPTIONS: { value: AnimationType; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'slide', label: 'Slide' },
  { value: 'bounce', label: 'Bounce' },
  { value: 'fade', label: 'Fade' },
  { value: 'scale', label: 'Scale' },
  { value: 'shine', label: 'Shine' }
];

function validateUrl(url: string): string {
  if (!url) return url;
  if (url.startsWith('mailto:')) return url;
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
}

function isValidUrl(url: string): boolean {
  if (!url) return true; // Empty URL is considered valid (but inactive)
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

interface SortableLinkItemProps {
  link: BioLink;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  onUpdate: (id: string, updates: Partial<BioLink>) => void;
  showColorPicker: { id: string; type: 'bg' | 'text' } | null;
  onShowColorPicker: (id: string, type: 'bg' | 'text') => void;
  themeColors: {
    primary: string;
    background: string;
  };
}

function SortableLinkItem({
  link,
  onEdit,
  onDelete,
  isEditing,
  onUpdate,
  showColorPicker,
  onShowColorPicker,
  themeColors
}: SortableLinkItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const preset = PRESET_LINKS.find(p => p.title === link.title);
  const IconComponent = preset?.IconComponent || Link;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border rounded-lg p-4 bg-white"
    >
      <div className="flex flex-col gap-4">
        {/* Title and Controls Row */}
        <div className="flex items-center gap-4">
          <button
            className="cursor-move"
            {...attributes}
            {...listeners}
            title="Drag to reorder"
            aria-label="Drag to reorder"
          >
            <GripVertical className="w-5 h-5 text-gray-400" />
          </button>
          
          <div className="flex items-center gap-2 flex-1">
            <IconComponent className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={link.title}
              onChange={(e) => onUpdate(link.id, { title: e.target.value })}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Link Title"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(link.id)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title={isEditing ? "Hide styling options" : "Show styling options"}
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(link.id)}
              className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
              title="Delete link"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* URL Input - Always Visible */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <input
              type="url"
              value={link.url}
              onChange={(e) => onUpdate(link.id, { url: validateUrl(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={preset?.placeholder || 'https://'}
            />
            {link.url && !isValidUrl(link.url) && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid URL</p>
            )}
          </div>
          {link.url && (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              title="Test link"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Styling Options - Expandable */}
        {isEditing && (
          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div>
              <label className="block text-sm font-medium mb-1">Animation</label>
              <select
                value={link.animation || 'none'}
                onChange={(e) => onUpdate(link.id, { animation: e.target.value as AnimationType })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                title='Animation'
              >
                {ANIMATION_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Colors</label>
              <div className="flex gap-2">
                <button
                  onClick={() => onShowColorPicker(link.id, 'bg')}
                  className="flex-1 h-10 rounded-lg border"
                  style={{ backgroundColor: link.backgroundColor || themeColors.primary }}
                  title="Choose background color"
                />
                <button
                  onClick={() => onShowColorPicker(link.id, 'text')}
                  className="flex-1 h-10 rounded-lg border"
                  style={{ backgroundColor: link.textColor || themeColors.background }}
                  title="Choose text color"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function LinkCustomizer() {
  const { bioPage, updateLink, addLink, removeLink, updateLinks } = useBioPageStore();
  const [showColorPicker, setShowColorPicker] = useState<{ id: string; type: 'bg' | 'text' } | null>(null);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = bioPage.links.findIndex(link => link.id === active.id);
      const newIndex = bioPage.links.findIndex(link => link.id === over.id);
      
      updateLinks(arrayMove(bioPage.links, oldIndex, newIndex));
    }
  };

  const handleAddPresetLink = (preset: typeof PRESET_LINKS[0]) => {
    addLink({
      title: preset.title,
      url: '',
      icon: preset.icon,
      animation: 'none',
      backgroundColor: bioPage.theme.colorScheme.primary,
      textColor: bioPage.theme.colorScheme.background
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Preset Links */}
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold mb-4">Add Link</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {PRESET_LINKS.map((preset) => (
            <button
              key={preset.title}
              onClick={() => handleAddPresetLink(preset)}
              className="p-3 border rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <preset.IconComponent className="w-4 h-4" />
              <span>{preset.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Draggable Link List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={bioPage.links.map(link => link.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="p-6 space-y-3">
            {bioPage.links.map((link) => (
              <SortableLinkItem
                key={link.id}
                link={link}
                onEdit={setEditingLinkId}
                onDelete={removeLink}
                isEditing={editingLinkId === link.id}
                onUpdate={updateLink}
                showColorPicker={showColorPicker}
                onShowColorPicker={(id, type) => setShowColorPicker({ id, type })}
                themeColors={{
                  primary: bioPage.theme.colorScheme.primary,
                  background: bioPage.theme.colorScheme.background
                }}
              />
            ))}

            {bioPage.links.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Click one of the buttons above to add your first link
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>

      {/* Color Picker Overlay */}
      {showColorPicker && (
        <div className="absolute z-50">
          <div
            className="fixed inset-0"
            onClick={() => setShowColorPicker(null)}
          />
          <div className="relative">
            <ChromePicker
              color={
                showColorPicker.type === 'bg' 
                  ? bioPage.links.find(l => l.id === showColorPicker.id)?.backgroundColor || bioPage.theme.colorScheme.primary
                  : bioPage.links.find(l => l.id === showColorPicker.id)?.textColor || bioPage.theme.colorScheme.background
              }
              onChange={(color) => {
                updateLink(showColorPicker.id, {
                  [showColorPicker.type === 'bg' ? 'backgroundColor' : 'textColor']: color.hex
                });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}