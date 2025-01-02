// src/components/calendar/frame-patterns.tsx
'use client';

import React, { useMemo } from 'react';
import { FrameType, CornerStyle } from '@/types/calendar';
import { cn } from '@/lib/utils';

// SVG Patterns for different themes and seasons
export const FRAME_PATTERNS = {
  // Basic Patterns
  none: `
    <pattern id="none" patternUnits="userSpaceOnUse" width="60" height="60">
      <path d="M0 0h60v60H0z" fill="none"/>
    </pattern>
  `,
  basic: `
    <pattern id="basic" patternUnits="userSpaceOnUse" width="40" height="40">
      <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.1"/>
    </pattern>
  `,
  minimal: `
    <pattern id="minimal" patternUnits="userSpaceOnUse" width="60" height="60">
      <path d="M0 0h60v60H0z" fill="none"/>
    </pattern>
  `,

  // Seasonal Patterns
  spring: `
    <pattern id="spring" patternUnits="userSpaceOnUse" width="80" height="80">
      <circle cx="40" cy="40" r="3" fill="#FDA4AF" opacity="0.2"/>
      <path d="M37 40c0-5 6-5 6 0s-6 5-6 0z" fill="#FDA4AF" opacity="0.1"/>
      <path d="M40 37c5 0 5 6 0 6s-5-6 0-6z" fill="#FDA4AF" opacity="0.1"/>
    </pattern>
  `,

  summer: `
    <pattern id="summer" patternUnits="userSpaceOnUse" width="100" height="100">
      <path d="M0 20c30-20 70-20 100 0" stroke="#0EA5E9" stroke-width="1" fill="none" opacity="0.1"/>
      <path d="M0 50c30-20 70-20 100 0" stroke="#0EA5E9" stroke-width="1" fill="none" opacity="0.1"/>
      <path d="M0 80c30-20 70-20 100 0" stroke="#0EA5E9" stroke-width="1" fill="none" opacity="0.1"/>
    </pattern>
  `,

  autumn: `
    <pattern id="autumn" patternUnits="userSpaceOnUse" width="100" height="100">
      <path d="M20 20c0 20 20 20 20 0s-20-20-20 0z" fill="#C2410C" opacity="0.1" transform="rotate(30 30 30)"/>
      <path d="M60 60c0 20 20 20 20 0s-20-20-20 0z" fill="#C2410C" opacity="0.1" transform="rotate(-30 70 70)"/>
      <path d="M20 80c0 20 20 20 20 0s-20-20-20 0z" fill="#EA580C" opacity="0.1" transform="rotate(15 30 90)"/>
    </pattern>
  `,

  // Holiday Patterns
  christmas: `
    <pattern id="christmas" patternUnits="userSpaceOnUse" width="100" height="100">
      <path d="M20 20c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20z" fill="#c41e3a" opacity="0.1"/>
      <path d="M25 25l10-10M35 25l-10-10" stroke="#2C5530" stroke-width="2" opacity="0.1"/>
      <circle cx="30" cy="20" r="3" fill="#c41e3a" opacity="0.2"/>
    </pattern>
  `,

  snowflakes: `
    <pattern id="snowflakes" patternUnits="userSpaceOnUse" width="60" height="60">
      <path d="M30 5v20M30 35v20M5 30h20M35 30h20M15 15l30 30M15 45l30-30" 
            stroke="#94A3B8" stroke-width="1" opacity="0.1"/>
      <circle cx="30" cy="30" r="2" fill="#94A3B8" opacity="0.2"/>
    </pattern>
  `
};

// Corner decorations for different styles
export const CORNER_DECORATIONS = {
  christmas: {
    topLeft: `
      <path d="M0 0c20 20 60 20 80 0" stroke="#2C5530" stroke-width="3" fill="none"/>
      <circle cx="40" cy="10" r="4" fill="#c41e3a"/>
      <path d="M35 15c0-10 10-10 10 0s-10 10-10 0z" fill="#2C5530"/>
    `,
    topRight: `
      <path d="M0 0c20 20 60 20 80 0" stroke="#2C5530" stroke-width="3" fill="none" transform="scale(-1, 1) translate(-80, 0)"/>
      <circle cx="40" cy="10" r="4" fill="#c41e3a"/>
      <path d="M35 15c0-10 10-10 10 0s-10 10-10 0z" fill="#2C5530"/>
    `,
  },
  autumn: {
    topLeft: `
      <path d="M0 0c50 50 150 50 200 0" stroke="#EA580C" stroke-width="2" fill="none" opacity="0.2"/>
      <path d="M0 40c50 50 150 50 200 0" stroke="#C2410C" stroke-width="2" fill="none" opacity="0.1"/>
    `,
    topRight: `
      <path d="M0 0c50 50 150 50 200 0" stroke="#EA580C" stroke-width="2" fill="none" opacity="0.2" transform="scale(-1, 1) translate(-80, 0)"/>
      <path d="M0 40c50 50 150 50 200 0" stroke="#C2410C" stroke-width="2" fill="none" opacity="0.1" transform="scale(-1, 1) translate(-80, 0)"/>
    `
  }
};

interface ThemeFrameProps {
  type: FrameType;
  cornerStyle?: CornerStyle;
  color: string;
  opacity?: number;
  className?: string;
  children: React.ReactNode;
}

export function ThemeFrame({
  type,
  cornerStyle,
  color,
  opacity = 0.1,
  className,
  children
}: ThemeFrameProps) {
  const pattern = useMemo(() => FRAME_PATTERNS[type], [type]);
  const corners = useMemo(
    () => (cornerStyle && CORNER_DECORATIONS[cornerStyle as keyof typeof CORNER_DECORATIONS]) || null,
    [cornerStyle]
  );

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Background Pattern */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <defs dangerouslySetInnerHTML={{ __html: pattern }} />
        <rect
          width="100%"
          height="100%"
          fill={`url(#${type})`}
          style={{ color, opacity }}
        />
      </svg>

      {/* Corner Decorations */}
      {corners && (
        <>
          <svg className="absolute left-0 top-0 h-20 w-20" viewBox="0 0 80 80">
            <g dangerouslySetInnerHTML={{ __html: corners.topLeft }} style={{ color }} />
          </svg>
          <svg className="absolute right-0 top-0 h-20 w-20" viewBox="0 0 80 80">
            <g dangerouslySetInnerHTML={{ __html: corners.topRight }} style={{ color }} />
          </svg>
        </>
      )}

      {/* Main Content */}
      {children}
    </div>
  );
}

export function getFrameTypeForDate(date: Date): FrameType {
  const month = date.getMonth();

  // Special months
  if (month === 11) return 'christmas'; // December

  // Seasons
  if (month <= 1 || month === 11) return 'snowflakes'; // Winter
  if (month >= 2 && month <= 4) return 'spring'; // Spring
  if (month >= 5 && month <= 7) return 'summer'; // Summer
  return 'autumn'; // Fall (months 8-10)
}

export function getCornerStyleForDate(date: Date): CornerStyle | undefined {
  const month = date.getMonth();
  
  if (month === 11) return 'snowflake'; // December
  if (month >= 8 && month <= 10) return 'beveled'; // Fall
  return undefined;
}

export default ThemeFrame;