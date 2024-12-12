// src/app/qr-generator/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { QROptions } from '@/types/qr';
import { motion } from 'framer-motion';
import { Download, Upload, Palette, Image as ImageIcon, Sliders, RotateCcw } from 'lucide-react';
import { Tabs } from '@/components/UI/tabs';
import EnhancedQRCode from '@/components/QRCode/EnhancedQrCode';
import { BasicTab } from '@/components/QRCode/BasicTab';
import { StyleTab } from '@/components/QRCode/StyleTab';
import { AdvancedTab } from '@/components/QRCode/AdvancedTab';
import toast from 'react-hot-toast';

const defaultOptions: QROptions = {
  size: 256,
  foregroundColor: '#000000',
  backgroundColor: '#FFFFFF',
  errorCorrectionLevel: 'H',
  logoSize: 50,
  logoMargin: 10,
  logoPadding: 0,
  logoBackgroundColor: '#FFFFFF',
  logoOpacity: 1,
  dotStyle: { shape: 'square', color: '#000000' },
  cornerStyle: { shape: 'square', color: '#000000' },
  dotScale: 1,
  cornerSquareScale: 1,
  cornerDotScale: 1,
  margin: 16,
  enableGradient: false,
  gradientColors: ['#000000', '#000000'],
  gradientRotation: 0,
};

export default function QRGeneratorPage() {
  // State
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [qrText, setQrText] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<QROptions>(defaultOptions);

  // Handlers
  const handleOptionsChange = useCallback((newOptions: Partial<QROptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  }, []);

  const handleLogoUpload = useCallback((file: File) => {
    if (file.size > 500000) {
      toast.error('Logo file is too large. Maximum size is 500KB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      handleOptionsChange({ logo: reader.result as string });
      toast.success('Logo uploaded successfully!');
    };
    reader.onerror = () => toast.error('Failed to upload logo.');
    reader.readAsDataURL(file);
  }, [handleOptionsChange]);

  const handleDownload = useCallback(() => {
    if (qrCodeDataUrl) {
      const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
      const link = document.createElement('a');
      link.href = qrCodeDataUrl;
      link.download = `qr-code-${timestamp}.png`;
      link.click();
      toast.success('QR Code downloaded successfully!');
    }
  }, [qrCodeDataUrl]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(qrText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Text copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  }, [qrText]);

  const handleReset = useCallback(() => {
    setOptions(defaultOptions);
    toast.success('Reset to default settings');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8">
          QR Code Generator
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <Tabs
              activeTab={activeTab}
              onChange={setActiveTab}
              tabs={[
                { id: 'basic', label: 'Basic', icon: Palette },
                { id: 'style', label: 'Style', icon: Sliders },
                { id: 'advanced', label: 'Advanced', icon: ImageIcon },
              ]}
            >
              {activeTab === 'basic' && (
                <BasicTab
                  options={options}
                  qrText={qrText}
                  onTextChange={setQrText}
                  onOptionsChange={handleOptionsChange}
                  onCopy={handleCopy}
                  isCopied={copied}
                />
              )}

              {activeTab === 'style' && (
                <StyleTab
                  options={options}
                  onOptionsChange={handleOptionsChange}
                />
              )}

              {activeTab === 'advanced' && (
                <AdvancedTab
                  options={options}
                  onLogoUpload={handleLogoUpload}
                  onOptionsChange={handleOptionsChange}
                />
              )}
            </Tabs>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-8 space-y-6">
            <div className="glass-card p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Preview</h3>
                <button
                  onClick={() => setPreviewMode(prev => prev === 'light' ? 'dark' : 'light')}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  {previewMode === 'light' ? 'Light' : 'Dark'} Background
                </button>
              </div>

              <motion.div
                className={`flex items-center justify-center p-8 rounded-lg transition-colors ${
                  previewMode === 'light' ? 'bg-white' : 'bg-gray-900'
                }`}
                layout
              >
                <EnhancedQRCode
                  value={qrText}
                  options={options}
                  onGenerated={setQrCodeDataUrl}
                />
              </motion.div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleDownload}
                  disabled={!qrCodeDataUrl}
                  className="flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}