// src/app/bio-link/constants/presetThemes.ts
import { BioPageTheme } from '@/app/bio-links/types';

export const PRESET_THEMES: Record<string, BioPageTheme> = {
  classic: {
    name: 'Classic',
    backgroundColor: '#ffffff',
    fontFamily: 'Inter',
    buttonStyle: 'rounded',
    buttonAnimation: 'scale',
    colorScheme: {
      primary: '#000000',
      secondary: '#333333',
      text: '#111827',
      background: '#FFFFFF',
    }
  },
  modern: {
    name: 'Modern',
    backgroundColor: '#f8fafc',
    fontFamily: 'Poppins',
    buttonStyle: 'pill',
    buttonAnimation: 'scale',
    colorScheme: {
      primary: '#3B82F6',
      secondary: '#1D4ED8',
      text: '#1F2937',
      background: '#F8FAFC',
    }
  },
  minimal: {
    name: 'Minimal',
    backgroundColor: '#ffffff',
    fontFamily: 'Montserrat',
    buttonStyle: 'sharp',
    buttonAnimation: 'none',
    colorScheme: {
      primary: '#374151',
      secondary: '#4B5563',
      text: '#111827',
      background: '#FFFFFF',
    }
  },
  vibrant: {
    name: 'Vibrant',
    backgroundColor: '#fdf2f8',
    fontFamily: 'Roboto',
    buttonStyle: 'rounded',
    buttonAnimation: 'shine',
    colorScheme: {
      primary: '#EC4899',
      secondary: '#DB2777',
      text: '#831843',
      background: '#FDF2F8',
    }
  },
  dark: {
    name: 'Dark Mode',
    backgroundColor: '#111827',
    fontFamily: 'Inter',
    buttonStyle: 'rounded',
    buttonAnimation: 'scale',
    colorScheme: {
      primary: '#60A5FA',
      secondary: '#3B82F6',
      text: '#F3F4F6',
      background: '#111827',
    }
  }
};

export const DEFAULT_THEME: BioPageTheme = {
  name: 'Default',
  backgroundColor: '#FFFFFF',
  fontFamily: 'Inter',
  buttonStyle: 'rounded',
  buttonAnimation: 'none',
  colorScheme: {
    primary: '#3B82F6',
    secondary: '#64748B',
    text: '#1F2937',
    background: '#FFFFFF'
  }
};