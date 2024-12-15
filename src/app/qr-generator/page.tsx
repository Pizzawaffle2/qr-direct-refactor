// src/app/qr-generator/page.tsx
'use client';

import { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState<'templates' | 'basic' | 'style' | 'advanced'>('templates');
  const [options, setOptions] = useState<QROptions>(defaultOptions);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  // Templates tab handlers
  const handleTemplateSelect = (template: QRTemplate) => {
    setOptions(prev => ({
      ...template.options,
      data: prev.data, // Preserve existing QR content
      dotsOptions: {
        ...template.options.dotsOptions,
        type: template.options.dotsOptions.type as QROptions['dotsOptions']['type'],
      },
      cornersSquareOptions: {
        ...template.options.cornersSquareOptions,
        type: template.options.cornersSquareOptions.type as QROptions['cornersSquareOptions']['type'],
      },
      cornersDotOptions: {
        ...template.options.cornersDotOptions,
        type: template.options.cornersDotOptions.type as QROptions['cornersDotOptions']['type'],
      },
    }));
    setSelectedTemplateId(template.id);
  };

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
  const handleDotTypeChange = (type: QROptions['dotsOptions']['type']) => {
    setOptions(prev => ({
      ...prev,
      dotsOptions: { ...prev.dotsOptions, type },
    }));
  };

  const handleDotStyleChange = (newOptions: Partial<QROptions['dotsOptions']>) => {
    setOptions(prev => ({
      ...prev,
      dotsOptions: {
        ...prev.dotsOptions,
        ...newOptions,
      },
    }));
  };

  const handleCornerChange = (changes: {
    square?: Partial<QROptions['cornersSquareOptions']>;
    dot?: Partial<QROptions['cornersDotOptions']>;
  }) => {
    setOptions(prev => ({
      ...prev,
      ...(changes.square && { cornersSquareOptions: { ...prev.cornersSquareOptions, ...changes.square } }),
      ...(changes.dot && { cornersDotOptions: { ...prev.cornersDotOptions, ...changes.dot } }),
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

  const handleImageOptionsChange = (imageOptions?: QROptions['imageOptions']) => {
    setOptions(prev => ({
      ...prev,
      imageOptions,
    }));
  };

  // Download handler
  const handleDownload = async () => {
    try {
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

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Controls */}
          <div className="space-y-6 max-h-[90vh] overflow-y-auto pr-2">
            {/* QR Input - Always visible */}
            <QRInput 
              value={options.data} 
              onChange={handleDataChange}
            />

            {/* Tabs */}
            <div className="sticky top-0 z-10 bg-gradient-to-b from-[rgb(var(--background-start))] to-transparent pb-4">
              <Tabs
                activeTab={activeTab}
                onChange={(tab) => setActiveTab(tab as typeof activeTab)}
                tabs={[
                  { id: 'templates', label: 'Templates', icon: Layout },
                  { id: 'basic', label: 'Basic', icon: Palette },
                  { id: 'style', label: 'Style', icon: Sliders },
                  { id: 'advanced', label: 'Advanced', icon: ImageIcon },
                ]}
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
                  onColorChange={handleColorChange}
                />
              )}

              {activeTab === 'style' && (
                <StyleTab
                  dotType={options.dotsOptions.type}
                  dotsColor={options.dotsOptions.color}
                  dotsGradient={options.dotsOptions.gradient}
                  cornerSquareType={options.cornersSquareOptions.type}
                  cornerSquareColor={options.cornersSquareOptions.color}
                  cornerDotType={options.cornersDotOptions.type}
                  cornerDotColor={options.cornersDotOptions.color}
                  borderColor={options.borderOptions.color}
                  borderRadius={options.borderOptions.radius}
                  borderWidth={options.borderOptions.width}
                  onDotTypeChange={handleDotTypeChange}
                  onDotStyleChange={handleDotStyleChange}
                  onCornerChange={handleCornerChange}
                  onBorderChange={handleBorderChange}
                />
              )}

              {activeTab === 'advanced' && (
                <AdvancedTab
                  margin={options.margin}
                  errorCorrectionLevel={options.errorCorrectionLevel}
                  imageOptions={options.imageOptions}
                  onMarginChange={handleMarginChange}
                  onErrorCorrectionChange={handleErrorCorrectionChange}
                  onImageOptionsChange={handleImageOptionsChange}
                />
              )}
            </div>

            {/* Quick Tips */}
            <div className="glass-card p-4 rounded-lg sticky bottom-0 bg-white/80 backdrop-blur-sm">
              <p className="text-sm text-gray-600">
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