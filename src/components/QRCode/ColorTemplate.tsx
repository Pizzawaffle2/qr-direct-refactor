// src/components/QRCode/ColorTemplate.tsx
import { useState } from 'react';
import styles from './ColorTemplate.module.css';

interface ColorTemplateProps {
  template: {
    name: string;
    fg: string;
    bg: string;
    gradient?: [string, string];
    description?: string;
    category?: 'modern' | 'classic' | 'vibrant' | 'corporate' | 'nature';
  };
  onClick: () => void;
  isActive?: boolean;
}

export function ColorTemplate({ template, onClick, isActive = false }: ColorTemplateProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Mini QR code pattern for preview
  const qrPattern = `
    <svg viewBox="0 0 7 7" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <rect x="0" y="0" width="3" height="3"/>
      <rect x="4" y="0" width="3" height="3"/>
      <rect x="0" y="4" width="3" height="3"/>
      <rect x="2" y="2" width="3" height="3" fill-opacity="0.5"/>
    </svg>
  `;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative p-3 rounded-lg border transition-all
        ${isActive 
          ? 'border-blue-500 shadow-md ring-2 ring-blue-200' 
          : 'border-gray-200 dark:border-gray-700 hover:shadow-md'
        }
        hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      `}
      title={template.description || `Apply the ${template.name} template`}
      aria-label={`${template.name} template: ${template.description || ''}`}
    >
      {/* Preview Container */}
      <div className="relative">
        <div
          className={`
            ${styles.templatePreview}
            ${template.gradient ? styles.gradientBg : styles.solidBg}
            ${styles.border}
            group-hover:shadow-lg
            transition-all duration-200
            ${isHovered ? 'scale-105' : 'scale-100'}
          `}
          style={{
            '--start-color': template.gradient?.[0] || template.fg,
            '--end-color': template.gradient?.[1] || template.bg,
            '--bg-color': template.bg,
            '--border-color': template.fg,
            '--pattern-color': template.fg,
          } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: qrPattern }}
        />
        
        {/* Category Badge */}
        {template.category && (
          <span className={`
            absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2
            px-2 py-0.5 text-xs rounded-full
            ${getCategoryColor(template.category)}
          `}>
            {template.category}
          </span>
        )}

        {/* Active Indicator */}
        {isActive && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
        )}
      </div>

      {/* Template Info */}
      <div className="mt-2 space-y-1">
        <span className={`
          block text-sm font-medium
          ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}
        `}>
          {template.name}
        </span>
        
        {/* Color Preview on Hover */}
        {isHovered && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: template.fg }} />
                <span>FG: {template.fg}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: template.bg }} />
                <span>BG: {template.bg}</span>
              </div>
              {template.gradient && (
                <div className="flex items-center gap-2">
                  <div className="w-12 h-3 rounded-full" 
                    style={{ 
                      background: `linear-gradient(to right, ${template.gradient[0]}, ${template.gradient[1]})` 
                    }} 
                  />
                  <span>Gradient</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </button>
  );
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'modern':
      return 'bg-purple-100 text-purple-800';
    case 'classic':
      return 'bg-gray-100 text-gray-800';
    case 'vibrant':
      return 'bg-pink-100 text-pink-800';
    case 'corporate':
      return 'bg-blue-100 text-blue-800';
    case 'nature':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}