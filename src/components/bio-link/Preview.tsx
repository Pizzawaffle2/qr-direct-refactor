// src/app/bio-link/components/Preview.tsx
'use client';

import { useState } from 'react';
import { Smartphone, Monitor, Tablet } from 'lucide-react';

interface PreviewProps {
  bioPage: any;
}

export function Preview({ bioPage }: PreviewProps) {
  const [device, setDevice] = useState<'mobile' | 'desktop' | 'tablet'>('mobile');

  const deviceClasses = {
    mobile: 'w-[375px] h-[667px]',
    desktop: 'w-full',
    tablet: 'w-[768px] h-[1024px]'
  };

  return (
    <div className="space-y-4">
      {/* Device Selector */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setDevice('mobile')}
          className={`p-2 rounded ${device === 'mobile' ? 'bg-blue-50 text-blue-500' : ''}`}
          title="Mobile"
        >
          <Smartphone className="w-5 h-5" />
        </button>
        <button
          onClick={() => setDevice('desktop')}
          className={`p-2 rounded ${device === 'desktop' ? 'bg-blue-50 text-blue-500' : ''}`}
          title="Desktop"
        >
          <Monitor className="w-5 h-5" />
        </button>
        <button
          onClick={() => setDevice('tablet')}
          className={`p-2 rounded ${device === 'tablet' ? 'bg-blue-50 text-blue-500' : ''}`}
          title="Tablet"
        >
          <Tablet className="w-5 h-5" />
        </button>
      </div>

      {/* Preview Frame */}
      <div className={`mx-auto overflow-hidden bg-white rounded-lg shadow-lg ${deviceClasses[device]}`}>
        {/* Preview content goes here */}
      </div>
    </div>
  );
}