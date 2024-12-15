// src/constants/qr-templates.ts
import { QRTemplate } from '@/types/qr';

export const QR_TEMPLATES: QRTemplate[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    thumbnail: '/templates/minimal.png',
    description: 'Clean and simple design',
    options: {
      data: '',
      width: 300,
      height: 300,
      margin: 4,
      dotsOptions: {
        color: '#000000',
        type: 'square'
      },
      cornersSquareOptions: {
        type: 'square',
        color: '#000000'
      },
      cornersDotOptions: {
        type: 'square',
        color: '#000000'
      },
      backgroundOptions: {
        color: '#FFFFFF'
      },
      borderOptions: {
        color: '#000000',
        width: 0,
        radius: 0
      },
      errorCorrectionLevel: 'M'
    }
  },
  {
    id: 'rounded',
    name: 'Rounded',
    thumbnail: '/templates/rounded.png',
    description: 'Soft and modern appearance',
    options: {
      data: '',
      width: 300,
      height: 300,
      margin: 4,
      dotsOptions: {
        color: '#1a1a1a',
        type: 'rounded'
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#1a1a1a'
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#1a1a1a'
      },
      backgroundOptions: {
        color: '#FFFFFF'
      },
      borderOptions: {
        color: '#1a1a1a',
        width: 2,
        radius: 16
      },
      errorCorrectionLevel: 'M'
    }
  },
  {
    id: 'corporate',
    name: 'Corporate',
    thumbnail: '/templates/corporate.png',
    description: 'Professional with logo space',
    options: {
      data: '',
      width: 300,
      height: 300,
      margin: 6,
      dotsOptions: {
        color: '#2563eb',
        type: 'classy-rounded'
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#1d4ed8'
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#1d4ed8'
      },
      backgroundOptions: {
        color: '#FFFFFF'
      },
      borderOptions: {
        color: '#2563eb',
        width: 2,
        radius: 12
      },
      errorCorrectionLevel: 'H'
    }
  },
  {
    id: 'sunset-gradient',
    name: 'Sunset',
    thumbnail: '/templates/sunset.png',
    description: 'Warm gradient colors',
    options: {
      data: '',
      width: 300,
      height: 300,
      margin: 4,
      dotsOptions: {
        type: 'rounded',
        color: '#8B5CF6',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#f97316' },
            { offset: 1, color: '#db2777' }
          ]
        }
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#f97316'
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#db2777'
      },
      backgroundOptions: {
        color: '#FFFFFF'
      },
      borderOptions: {
        color: '#f97316',
        width: 2,
        radius: 12
      },
      errorCorrectionLevel: 'Q'
    }
  },
  {
    id: 'ocean-gradient',
    name: 'Ocean',
    thumbnail: '/templates/ocean.png',
    description: 'Cool ocean-inspired gradient',
    options: {
      data: '',
      width: 300,
      height: 300,
      margin: 4,
      dotsOptions: {
        type: 'rounded',
        color: '#0ea5e9',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#0ea5e9' },
            { offset: 1, color: '#2dd4bf' }
          ]
        }
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#0ea5e9'
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#2dd4bf'
      },
      backgroundOptions: {
        color: '#FFFFFF'
      },
      borderOptions: {
        color: '#0ea5e9',
        width: 2,
        radius: 12
      },
      errorCorrectionLevel: 'Q'
    }
  },
  {
    id: 'neon',
    name: 'Neon',
    thumbnail: '/templates/neon.png',
    description: 'Vibrant neon style',
    options: {
      data: '',
      width: 300,
      height: 300,
      margin: 4,
      dotsOptions: {
        color: '#10B981',
        type: 'dots'
      },
      cornersSquareOptions: {
        type: 'dot',
        color: '#10B981'
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#10B981'
      },
      backgroundOptions: {
        color: '#18181B'
      },
      borderOptions: {
        color: '#10B981',
        width: 2,
        radius: 8
      },
      errorCorrectionLevel: 'M'
    }
  },
  {
    id: 'minimal-dark',
    name: 'Dark Mode',
    thumbnail: '/templates/darkmode.png',
    description: 'Dark theme variation',
    options: {
      data: '',
      width: 300,
      height: 300,
      margin: 4,
      dotsOptions: {
        color: '#FFFFFF',
        type: 'square'
      },
      cornersSquareOptions: {
        type: 'square',
        color: '#FFFFFF'
      },
      cornersDotOptions: {
        type: 'square',
        color: '#FFFFFF'
      },
      backgroundOptions: {
        color: '#18181B'
      },
      borderOptions: {
        color: '#27272A',
        width: 2,
        radius: 8
      },
      errorCorrectionLevel: 'M'
    }
  },
  {
    id: 'purple-radial',
    name: 'Purple Radial',
    thumbnail: '/templates/purpleradial.png',
    description: 'Radial gradient effect',
    options: {
      data: '',
      width: 300,
      height: 300,
      margin: 4,
      dotsOptions: {
        type: 'classy-rounded',
        color: '#8B5CF6',
        gradient: {
          type: 'radial',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#8B5CF6' },
            { offset: 1, color: '#D946EF' }
          ]
        }
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#8B5CF6'
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#D946EF'
      },
      backgroundOptions: {
        color: '#FFFFFF'
      },
      borderOptions: {
        color: '#8B5CF6',
        width: 2,
        radius: 12
      },
      errorCorrectionLevel: 'Q'
    }
  },
  {
    id: 'dotted',
    name: 'Dotted',
    thumbnail: '/templates/dotted.png',
    description: 'Modern dotted pattern',
    options: {
      data: '',
      width: 300,
      height: 300,
      margin: 4,
      dotsOptions: {
        color: '#4B5563',
        type: 'dots'
      },
      cornersSquareOptions: {
        type: 'dot',
        color: '#4B5563'
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#4B5563'
      },
      backgroundOptions: {
        color: '#F9FAFB'
      },
      borderOptions: {
        color: '#E5E7EB',
        width: 2,
        radius: 24
      },
      errorCorrectionLevel: 'M'
    }
  }
];