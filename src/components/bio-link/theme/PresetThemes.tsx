// src/components/bio-link/theme/PresetThemes.ts
import { BioPageTheme } from '@/types/bio-page';

export const PRESET_THEMES: Record<string, BioPageTheme> = {
  classic: {
    name: 'Classic',
    backgroundColor: '#FFFFFF',
    buttonStyle: 'rounded',
    buttonAnimation: 'scale',
    colorScheme: {
      primary: '#39E09Bc9c9f5',
      secondary: '#86EFC0',
      text: '#000000',
      background: '#FFFFFF'
    },
    fontFamily: 'Inter',
    fontSize: 'medium',
    textAlign: 'center',
    fontWeight: 'medium'
  },
  dark: {
    name: 'Dark Mode',
    backgroundColor: '#000000',
    buttonStyle: 'rounded',
    buttonAnimation: 'scale',
    colorScheme: {
      primary: '#FFFFFF',
      secondary: '#666666',
      text: '#FFFFFF',
      background: '#000000'
    },
    fontFamily: 'Inter',
    fontSize: 'medium',
    textAlign: 'center',
    fontWeight: 'medium'
  },
  minimal: {
    name: 'Minimal',
    backgroundColor: '#F5F5F5',
    buttonStyle: 'pill',
    buttonAnimation: 'shine',
    colorScheme: {
      primary: '#000000',
      secondary: '#666666',
      text: '#000000',
      background: '#FFFFFF'
    },
    fontFamily: 'Inter',
    fontSize: 'medium',
    textAlign: 'center',
    fontWeight: 'medium'
  },
  neon: {
    name: 'Neon',
    backgroundColor: '#0D001A',
    buttonStyle: 'rounded',
    buttonAnimation: 'shine',
    colorScheme: {
      primary: '#FF00FF',
      secondary: '#00FFFF',
      text: '#FFFFFF',
      background: 'rgba(255, 0, 255, 0.1)'
    },
    fontFamily: 'Montserrat',
    fontSize: 'medium',
    textAlign: 'center',
    fontWeight: 'medium'
  },
  gradient: {
    name: 'Gradient',
    backgroundColor: '#4158D0',
    buttonStyle: 'pill',
    buttonAnimation: 'scale',
    colorScheme: {
      primary: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
      secondary: '#FFFFFF',
      text: '#FFFFFF',
      background: 'rgba(255, 255, 255, 0.1)'
    },
    fontFamily: 'Poppins',
    fontSize: 'medium',
    textAlign: 'center',
    fontWeight: 'medium'
  },
  retro: {
    name: 'Retro',
    backgroundColor: '#FFD700',
    buttonStyle: 'sharp',
    buttonAnimation: 'bounce',
    colorScheme: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      text: '#2C3E50',
      background: '#FFFFFF'
    },
    fontFamily: 'Space Mono',
    fontSize: 'medium',
    textAlign: 'center',
    fontWeight: 'medium'
  },
  minimalist: {
    name: 'Minimalist',
    backgroundColor: '#FFFFFF',
    buttonStyle: 'rounded',
    buttonAnimation: 'fade',
    colorScheme: {
      primary: '#F3F4F6',
      secondary: '#9CA3AF',
      text: '#111827',
      background: '#FFFFFF'
    },
    fontFamily: 'Inter',
    fontSize: 'medium',
    textAlign: 'center',
    fontWeight: 'medium'
  },
  corporate: {
    name: 'Corporate',
    backgroundColor: '#F8FAFC',
    buttonStyle: 'rounded',
    buttonAnimation: 'scale',
    colorScheme: {
      primary: '#0EA5E9',
      secondary: '#64748B',
      text: '#0F172A',
      background: '#FFFFFF'
    },
    fontFamily: 'Open Sans',
    fontSize: 'medium',
    textAlign: 'center',
    fontWeight: 'medium'
  },
  nature: {
    name: 'Nature',
    backgroundColor: '#F0FDF4',
    buttonStyle: 'pill',
    buttonAnimation: 'scale',
    colorScheme: {
      primary: '#16A34A',
      secondary: '#4ADE80',
      text: '#166534',
      background: '#FFFFFF'
    },
    fontFamily: 'Montserrat',
    fontSize: 'medium',
    textAlign: 'center',
    fontWeight: 'medium'
  },
  pastel: {
    name: 'Pastel',
    backgroundColor: '#FDF2F8',
    buttonStyle: 'pill',
    buttonAnimation: 'scale',
    colorScheme: {
      primary: '#EC4899',
      secondary: '#DB2777',
      text: '#831843',
      background: '#FDF2F8'
    },
    fontFamily: 'Poppins',
    fontSize: 'medium',
    textAlign: 'center',
    fontWeight: 'medium'
  }
};

// Add this to assist with the gradient theme
export const getButtonBackground = (theme: BioPageTheme) => {
  if (theme.name === 'Gradient') {
    return {
      background: theme.colorScheme.primary,
      backgroundSize: '200% 200%',
      animation: 'gradient 5s ease infinite'
    };
  }
  return { backgroundColor: theme.colorScheme.primary };
};

export function PresetThemes() {
  const { bioPage, updateTheme } = useBioPageStore();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Theme Templates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(PRESET_THEMES).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => updateTheme(theme)}
            className={`p-4 border rounded-lg transition-colors hover:border-blue-500 ${
              bioPage.theme.name === theme.name ? 'border-blue-500 bg-blue-50' : ''
            }`}
          >
            <div className="flex flex-col gap-2">
              <span className="font-medium">{theme.name}</span>
              <div className="flex gap-2">
                {Object.values(theme.colorScheme).map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div 
                className="mt-2 p-2 rounded-lg text-sm"
                style={{ 
                  backgroundColor: theme.colorScheme.primary,
                  color: theme.colorScheme.background
                }}
              >
                Preview Button
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
import { useState } from 'react';

function useBioPageStore() {
  const [bioPage, setBioPage] = useState({
    theme: PRESET_THEMES.classic
  });

  const updateTheme = (theme: BioPageTheme) => {
    setBioPage((prevBioPage) => ({
      ...prevBioPage,
      theme
    }));
  };

  return { bioPage, updateTheme };
}
