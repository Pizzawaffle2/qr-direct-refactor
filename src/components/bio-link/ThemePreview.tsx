// src/app/bio-link/components/ThemePreview.tsx
'use client';

import { BioPageTheme, BioLink, AnimationType } from '@/app/bio-links/types';

// Removed local declaration of AnimationType
import { ExternalLink } from 'lucide-react';

interface ThemePreviewProps {
  theme: BioPageTheme;
  links: BioLink[];
  profileName: string;
  bio: string;
  profileImage?: string;
}

export function ThemePreview({
  theme,
  links,
  profileName,
  bio,
  profileImage
}: ThemePreviewProps) {
  const getButtonClasses = () => {
    const baseClasses = 'w-full p-3 mb-3 transition-all';
    const styleClasses = {
      rounded: 'rounded-lg',
      sharp: 'rounded-none',
      pill: 'rounded-full'
    };
    const animationClasses: Record<AnimationType, string> = {
      none: '',
      scale: 'hover:scale-105',
      shine: 'hover:shadow-lg',
      fade: 'hover:opacity-90',
      slide: 'hover:translate-x-1',
      bounce: 'hover:scale-[1.02] active:scale-[0.98]'
      };

    return `${baseClasses} ${styleClasses[theme.buttonStyle]} ${animationClasses[theme.buttonAnimation]}`;
  };

  return (
    <div 
      className="w-full max-w-md mx-auto p-6 rounded-2xl shadow-lg"
      style={{ 
        backgroundColor: theme.backgroundColor,
        fontFamily: theme.fontFamily
      }}
    >
      {/* Profile Section */}
      <div className="text-center mb-8">
        {profileImage && (
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
            <img 
              src={profileImage} 
              alt={profileName}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h2 
          className="text-2xl font-bold mb-2"
          style={{ color: theme.colorScheme.text }}
        >
          {profileName || 'Your Name'}
        </h2>
        <p 
          className="text-sm"
          style={{ color: theme.colorScheme.secondary }}
        >
          {bio || 'Your bio goes here'}
        </p>
      </div>

      {/* Links */}
      <div className="space-y-3">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={getButtonClasses()}
            style={{ 
              backgroundColor: theme.colorScheme.primary,
              color: theme.colorScheme.background
            }}
          >
            <div className="flex items-center justify-between">
              <span>{link.title || 'Untitled Link'}</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}