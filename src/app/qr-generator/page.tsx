// src/app/qr-generator/page.tsx
'use client';

import { useState, useMemo, useCallback } from 'react';
import { Tabs } from '@/components/UI/tabs';
import { Palette, Image as ImageIcon, Sliders, Layout } from 'lucide-react';
import { QRInput } from '@/components/QRCode/QRInput';
import { BasicTab } from '@/components/QRCode/BasicTab';
import { StyleTab } from '@/components/QRCode/StyleTab';
import { AdvancedTab } from '@/components/QRCode/AdvancedTab';
import { TemplatesTab } from '@/components/QRCode/TemplatesTab';
import { QRCodePreview } from '@/components/QRCode/QRCodePreview';
import { QRTemplate, QROptions } from '@/types/qr';
import { QR_TEMPLATES } from '@/constants/qr-templates';
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
  cornersSquareOptions: {
    type: 'square',
    color: '#000000',
  },
  cornersDotOptions: {
    type: 'square',
    color: '#000000',
  },
  backgroundOptions: {
    color: '#FFFFFF',
  },
  borderOptions: {
    color: '#000000',
    width: 0,
    radius: 0,
  },
  errorCorrectionLevel: 'M',
};

export default function QRGeneratorPage() {
  console.log('QRGeneratorPage rendered');

  const [activeTab, setActiveTab] = useState<'templates' | 'basic' | 'style' | 'advanced'>('templates');
  console.log('Active tab:', activeTab);

  const [options, setOptions] = useState<QROptions>(defaultOptions);
  console.log('QR options:', options);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  console.log('Selected template ID:', selectedTemplateId);

  // Helper functions
  const updateOptions = useCallback(
    (updates: Partial<QROptions>) => {
      console.log('Updating options with:', updates);
      setOptions(prev => ({ ...prev, ...updates }));
    },
    []
  );

  const handleTemplateSelect = useCallback(
    (template: QRTemplate) => {
      console.log('Template selected:', template);
      updateOptions({
        ...template.options,
        data: options.data, // Preserve existing QR content
      });
      setSelectedTemplateId(template.id);
    },
    [options.data, updateOptions]
  );

  const handleDownload = async () => {
    try {
      console.log('Download initiated');
      const qr = document.querySelector('#qr-code-container canvas');
      if (qr) {
        const dataUrl = (qr as HTMLCanvasElement).toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `qr-code-${Date.now()}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('QR code downloaded successfully!');
        console.log('QR code downloaded successfully');
      } else {
        throw new Error('QR code canvas not found');
      }
    } catch (error) {
      console.error('Download failed:', error);
      toast.error(`Failed to download QR code: ${error.message}`);
    }
  };

  const tabs = useMemo(
    () => [
      { id: 'templates', label: 'Templates', icon: Layout },
      { id: 'basic', label: 'Basic', icon: Palette },
      { id: 'style', label: 'Style', icon: Sliders },
      { id: 'advanced', label: 'Advanced', icon: ImageIcon },
    ],
    []
  );
  console.log('Tabs:', tabs);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))] text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8">
          QR Code Generator
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Controls */}
          <div className="space-y-6 max-h-[90vh] overflow-auto pr-2">
            {/* QR Input - Always visible */}
            <QRInput 
              value={options.data} 
              onChange={data => {
                console.log('QR Input changed:', data);
                updateOptions({ data });
              }}
              aria-label="QR Code Data Input"
            />

            {/* Tabs */}
            <div className="sticky top-0 z-10 bg-gradient-to-b from-[rgb(var(--background-start))] to-transparent pb-4">
              <Tabs
                activeTab={activeTab}
                onChange={tab => {
                  console.log('Tab changed to:', tab);
                  setActiveTab(tab as typeof activeTab);
                }}
                tabs={tabs}
                aria-label="QR Code Generator Tabs"
              />
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'templates' && (
                <TemplatesTab
                  onTemplateSelect={handleTemplateSelect}
                  selectedTemplateId={selectedTemplateId}
                />
              )}

              {activeTab === 'basic' && (
                <BasicTab
                  dotsColor={options.dotsOptions.color}
                  backgroundColor={options.backgroundOptions.color}
                  onColorChange={(color, type) => {
                    console.log('Color change:', { color, type });
                    updateOptions({
                      [type === 'dots' ? 'dotsOptions' : 'backgroundOptions']: {
                        ...options[type === 'dots' ? 'dotsOptions' : 'backgroundOptions'],
                        color,
                      },
                    });
                  }}
                />
              )}

              {activeTab === 'style' && (
                <StyleTab
                  {...options}
                  onDotTypeChange={type => {
                    console.log('Dot type change:', type);
                    updateOptions({ dotsOptions: { ...options.dotsOptions, type } });
                  }}
                  onDotStyleChange={newOptions => {
                    console.log('Dot style change:', newOptions);
                    updateOptions({ dotsOptions: { ...options.dotsOptions, ...newOptions } });
                  }}
                  onCornerChange={changes => {
                    console.log('Corner change:', changes);
                    updateOptions({
                      ...(changes.square && {
                        cornersSquareOptions: { ...options.cornersSquareOptions, ...changes.square },
                      }),
                      ...(changes.dot && {
                        cornersDotOptions: { ...options.cornersDotOptions, ...changes.dot },
                      }),
                    });
                  }}
                  onBorderChange={(value, property) => {
                    console.log('Border change:', { value, property });
                    updateOptions({
                      borderOptions: {
                        ...options.borderOptions,
                        [property]: property === 'color' ? value : Number(value),
                      },
                    });
                  }}
                />
              )}

              {activeTab === 'advanced' && (
                <AdvancedTab
                  margin={options.margin}
                  errorCorrectionLevel={options.errorCorrectionLevel}
                  imageOptions={options.imageOptions}
                  onMarginChange={margin => {
                    console.log('Margin change:', margin);
                    updateOptions({ margin });
                  }}
                  onErrorCorrectionChange={level => {
                    console.log('Error correction level change:', level);
                    updateOptions({ errorCorrectionLevel: level });
                  }}
                  onImageOptionsChange={imageOptions => {
                    console.log('Image options change:', imageOptions);
                    updateOptions({ imageOptions });
                  }}
                />
              )}
            </div>

            {/* Quick Tips */}
            <div className="glass-card p-4 rounded-lg sticky bottom-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {activeTab === 'templates' && '💡 Choose a template as a starting point, then customize it in other tabs'}
                {activeTab === 'basic' && '💡 Choose colors to match your brand or design'}
                {activeTab === 'style' && '💡 Experiment with different dot styles and corner options'}
                {activeTab === 'advanced' && '💡 Higher error correction allows for better readability with logos'}
              </p>
            </div>
          </div>

          {/* Right Column - Preview */}
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
