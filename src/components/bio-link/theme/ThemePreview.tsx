// src/components/bio-link/theme/ThemePreview.tsx
'use client';

import { ExternalLink } from 'lucide-react';

interface ThemePreviewProps {
  theme: {
    backgroundColor: string;
    fontFamily: string;
    colorScheme: {
      text: string;
      secondary: string;
      primary: string;
      background: string;
    };
  };
  links: Array<{
    id: string;
    url: string;
    title: string;
    backgroundColor?: string;
    textColor?: string;
  }>;
  profileName?: string;
  bio?: string;
  profileImage?: string;
}

export function ThemePreview({
    theme,
    links,
    profileName,
    bio,
    profileImage
  }: ThemePreviewProps) {
    return (
      <div className="relative w-full max-w-md mx-auto">
        {/* Phone Frame */}
        <div className="relative w-full aspect-[9/16] rounded-[2.5rem] overflow-hidden bg-black shadow-xl">
          {/* Status Bar */}
          <div className="absolute top-0 inset-x-0 h-6 bg-black z-10">
            <div className="absolute top-1 right-4 w-14 h-4 rounded-sm bg-gray-800" />
          </div>
  
          {/* Dynamic Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-black rounded-b-2xl z-20" />
  
          {/* Screen Content */}
          <div 
            className="absolute inset-0 mt-6 overflow-y-auto scrollbar-hide"
            style={{
              backgroundColor: theme.backgroundColor || '#ffffff',
              fontFamily: theme.fontFamily
            }}
          >
          {/* Content Container */}
          <div className="px-6 py-8">
            {/* Profile Section */}
            <div className="text-center mb-8">
              {/* Profile Image */}
              <div className="w-24 h-24 mx-auto mb-4 relative">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={profileName || 'Profile'}
                    className="w-full h-full object-cover rounded-full ring-4 ring-white shadow-md"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-300">
                      {profileName?.[0]?.toUpperCase() || '?'}
                    </span>
                  </div>
                )}
              </div>

              {/* Name & Bio */}
              <h2 
                className="text-xl font-bold mb-2"
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

            {/* Links Section */}
            <div className="space-y-3 mt-6">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-3 rounded-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: link.backgroundColor || theme.colorScheme.primary,
                    color: link.textColor || theme.colorScheme.background
                  }}
                >
                  <div className="flex items-center justify-between px-2">
                    <span className="flex-1 text-center font-medium truncate">
                      {link.title}
                    </span>
                    <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-75" />
                  </div>
                </a>
              ))}

              {links.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  Add links to see them appear here
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-3xl" />
      </div>
    </div>
  );
}