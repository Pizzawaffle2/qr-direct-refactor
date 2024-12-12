// src/constants/qr-styles.ts
import { QRCodeStyle } from '@/types/qr';

interface StyleCategory {
  name: string;
  description: string;
}

// Define categories
export const STYLE_CATEGORIES: Record<string, StyleCategory> = {
  classic: {
    name: 'Classic',
    description: 'Traditional styles with maximum compatibility'
  },
  modern: {
    name: 'Modern',
    description: 'Contemporary designs with gradients'
  },
  corporate: {
    name: 'Corporate',
    description: 'Professional styles for business use'
  },
  nature: {
    name: 'Nature',
    description: 'Styles inspired by natural elements'
  },
  vibrant: {
    name: 'Vibrant',
    description: 'Bold and colorful designs'
  }
};

// Unified QR code styles
export const QR_STYLES: (QRCodeStyle & { category: keyof typeof STYLE_CATEGORIES })[] = [
  {
    name: 'Classic Black',
    description: 'Traditional black and white for maximum compatibility',
    category: 'classic',
    dotStyle: 'square',
    cornerStyle: 'square',
    colors: {
      foreground: '#000000',
      background: '#FFFFFF'
    },
    dotScale: 1,
    cornerSquareScale: 1
  },
  {
    name: 'Modern Blue',
    description: 'Contemporary blue gradient design',
    category: 'modern',
    dotStyle: 'rounded',
    cornerStyle: 'rounded',
    colors: {
      foreground: '#2563EB',
      background: '#EFF6FF',
      gradient: ['#2563EB', '#3B82F6']
    },
    dotScale: 0.9,
    cornerSquareScale: 1
  },
  {
    name: 'Forest',
    description: 'Deep green inspired by forests',
    category: 'nature',
    dotStyle: 'rounded',
    cornerStyle: 'square',
    colors: {
      foreground: '#064E3B',
      background: '#ECFDF5',
      gradient: ['#064E3B', '#059669']
    },
    dotScale: 0.8,
    cornerSquareScale: 1
  },
  {
    name: 'Corporate Slate',
    description: 'Professional slate design for business use',
    category: 'corporate',
    dotStyle: 'square',
    cornerStyle: 'square',
    colors: {
      foreground: '#0F172A',
      background: '#F8FAFC',
      gradient: ['#0F172A', '#334155']
    },
    dotScale: 1,
    cornerSquareScale: 1
  },
  {
    name: 'Sunset',
    description: 'Warm sunset-inspired gradient',
    category: 'vibrant',
    dotStyle: 'rounded',
    cornerStyle: 'circle',
    colors: {
      foreground: '#9F1239',
      background: '#FFF1F2',
      gradient: ['#9F1239', '#BE123C']
    },
    dotScale: 0.85,
    cornerSquareScale: 0.9
  },
  {
    name: 'Ocean',
    description: 'Calming blue inspired by oceans',
    category: 'nature',
    dotStyle: 'circle',
    cornerStyle: 'rounded',
    colors: {
      foreground: '#0C4A6E',
      background: '#F0F9FF',
      gradient: ['#0C4A6E', '#0EA5E9']
    },
    dotScale: 0.75,
    cornerSquareScale: 1
  },
  {
    name: 'Royal Purple',
    description: 'Elegant purple gradient design',
    category: 'vibrant',
    dotStyle: 'square',
    cornerStyle: 'rounded',
    colors: {
      foreground: '#4C1D95',
      background: '#F5F3FF',
      gradient: ['#4C1D95', '#7C3AED']
    },
    dotScale: 0.9,
    cornerSquareScale: 0.95
  },
  {
    name: 'Business Gray',
    description: 'Subtle gradient for corporate use',
    category: 'corporate',
    dotStyle: 'square',
    cornerStyle: 'square',
    colors: {
      foreground: '#374151',
      background: '#F9FAFB',
      gradient: ['#374151', '#6B7280']
    },
    dotScale: 1,
    cornerSquareScale: 1
  }
];

// Helper functions
export function getStyleByName(name: string): QRCodeStyle | undefined {
  return QR_STYLES.find(style => style.name === name);
}

export function getStylesByCategory(category: keyof typeof STYLE_CATEGORIES) {
  return QR_STYLES.filter(style => style.category === category);
}

export function applyStyleToOptions(style: QRCodeStyle) {
  return {
    foregroundColor: style.colors.foreground,
    backgroundColor: style.colors.background,
    enableGradient: !!style.colors.gradient,
    gradientColors: style.colors.gradient || [style.colors.foreground, style.colors.foreground],
    dotStyle: { shape: style.dotStyle, color: style.colors.foreground },
    cornerStyle: { shape: style.cornerStyle, color: style.colors.foreground },
    dotScale: style.dotScale || 1,
    cornerSquareScale: style.cornerSquareScale || 1,
    cornerDotScale: style.cornerDotScale || 1,
  };
}

// Template interface for color picker
export interface ColorTemplate {
  name: string;
  category: keyof typeof STYLE_CATEGORIES;
  fg: string;
  bg: string;
  gradient?: [string, string];
  description: string;
}

// Create color templates from QR styles
export const COLOR_TEMPLATES: ColorTemplate[] = QR_STYLES.map(style => ({
  name: style.name,
  category: style.category,
  fg: style.colors.foreground,
  bg: style.colors.background,
  gradient: style.colors.gradient as [string, string] | undefined,
  description: style.description
}));