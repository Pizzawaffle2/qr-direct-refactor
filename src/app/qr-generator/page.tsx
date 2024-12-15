// src/app/qr-generator/page.tsx
'use client';

import { useState } from 'react';
import { Tabs } from '@/components/UI/tabs';
import { Palette, Image as ImageIcon, Sliders } from 'lucide-react';
import { BasicTab } from '@/components/QRCode/BasicTab';
import { StyleTab } from '@/components/QRCode/StyleTab';
import { AdvancedTab } from '@/components/QRCode/AdvancedTab';
import { QRCodePreview } from '@/components/QRCode/QRCodePreview';
import { QROptions, QRDotType } from '@/types/qr';
import toast from 'react-hot-toast';

const defaultOptions: QROptions = {
  data: '',
  width: 300,
  height: 300,
  margin: 4,
  dotsOptions: {
    color: '#000000',
    type: 'square',
  },
  backgroundOptions: {
    color: '#FFFFFF',
  },
  borderOptions: {
    color: '#000000',
    radius: 0,
    width: 0,
  },
  errorCorrectionLevel: 'M',
  pluginOptions: {
    key: '',
    isActive: false,
  },
};

export default function QRGeneratorPage() {
  const [activeTab, setActiveTab] = useState<'basic' | 'style' | 'advanced'>('basic');
  const [options, setOptions] = useState<QROptions>(defaultOptions);

  // Basic tab handlers
  const handleDataChange = (data: string) => {
    setOptions(prev => ({ ...prev, data }));
  };

  const handleColorChange = (color: string, type: 'dots' | 'background') => {
    setOptions(prev => ({
      ...prev,
      [type === 'dots' ? 'dotsOptions' : 'backgroundOptions']: {
        ...prev[type === 'dots' ? 'dotsOptions' : 'backgroundOptions'],
        color,
      },
    }));
  };

  // Style tab handlers
  const handleDotTypeChange = (type: QRDotType) => {
    setOptions(prev => ({
      ...prev,
      dotsOptions: { ...prev.dotsOptions, type },
    }));
  };

  const handleBorderChange = (value: string | number, property: 'color' | 'radius' | 'width') => {
    setOptions(prev => ({
      ...prev,
      borderOptions: {
        ...prev.borderOptions,
        [property]: property === 'color' ? value : Number(value),
      },
    }));
  };

  // Advanced tab handlers
  const handleMarginChange = (margin: number) => {
    setOptions(prev => ({ ...prev, margin }));
  };

  const handleErrorCorrectionChange = (level: 'L' | 'M' | 'Q' | 'H') => {
    setOptions(prev => ({ ...prev, errorCorrectionLevel: level }));
  };

  const handlePluginOptionsChange = (key: string, isActive: boolean) => {
    setOptions(prev => ({
      ...prev,
      pluginOptions: { key, isActive },
    }));
  };

  // Download handler
  const handleDownload = async () => {
    try {
      // The QR code styling library will handle the download
      const qr = document.querySelector('#qr-code-container canvas');
      if (qr) {
        const dataUrl = (qr as HTMLCanvasElement).toDataURL();
        const link = document.createElement('a');
        link.download = `qr-code-${Date.now()}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('QR code downloaded successfully!');
      }
    } catch (error) {
      toast.error('Failed to download QR code');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8">
          QR Code Generator
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <Tabs
              activeTab={activeTab}
              onChange={(tab) => setActiveTab(tab as 'basic' | 'style' | 'advanced')}
              tabs={[
                { id: 'basic', label: 'Basic', icon: Palette },
                { id: 'style', label: 'Style', icon: Sliders },
                { id: 'advanced', label: 'Advanced', icon: ImageIcon },
              ]}
            >
              {activeTab === 'basic' && (
                <BasicTab
                  data={options.data}
                  dotsColor={options.dotsOptions.color}
                  backgroundColor={options.backgroundOptions.color}
                  onDataChange={handleDataChange}
                  onColorChange={handleColorChange}
                />
              )}

              {activeTab === 'style' && (
                <StyleTab
                  dotType={options.dotsOptions.type}
                  borderColor={options.borderOptions.color}
                  borderRadius={options.borderOptions.radius}
                  borderWidth={options.borderOptions.width}
                  onDotTypeChange={handleDotTypeChange}
                  onBorderChange={handleBorderChange}
                />
              )}

              {activeTab === 'advanced' && (
                <AdvancedTab
                  margin={options.margin}
                  errorCorrectionLevel={options.errorCorrectionLevel}
                  pluginKey={options.pluginOptions.key}
                  pluginActive={options.pluginOptions.isActive}
                  onMarginChange={handleMarginChange}
                  onErrorCorrectionChange={handleErrorCorrectionChange}
                  onPluginOptionsChange={handlePluginOptionsChange}
                />
              )}
            </Tabs>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-8">
            <QRCodePreview 
              options={options}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}