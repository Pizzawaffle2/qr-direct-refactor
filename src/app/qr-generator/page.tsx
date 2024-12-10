'use client';

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import InputField from '@/components/UI/InputField';
import toast from 'react-hot-toast';
import { 
  Image as ImageIcon, 
  Loader, 
  Download, 
  Save,
  Sliders,
  Eye,
  EyeOff,
  RefreshCcw,
  Check,
  X 
} from 'lucide-react';

interface QROptions {
  size: number;
  quietZone: number;
  foregroundColor: string;
  backgroundColor: string;
  logoSize: number;
  logoOpacity: number;
  cornerRadius: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

export default function QRGeneratorPage() {
  const [qrText, setQrText] = useState('');
  const [logo, setLogo] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');

  const [options, setOptions] = useState<QROptions>({
    size: 256,
    quietZone: 16,
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    logoSize: 50,
    logoOpacity: 100,
    cornerRadius: 0,
    errorCorrectionLevel: 'H'
  });

  const handleGenerateQRCode = async () => {
    if (!qrText.trim()) {
      toast.error('Please enter text to encode');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/qr/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: qrText,
          ...options,
          logo,
        }),
      });

      if (!response.ok) throw new Error('Failed to create QR code');

      const data = await response.json();
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} glass-card p-4 rounded-lg shadow-lg`}>
          <div className="flex items-center">
            <Check className="w-6 h-6 text-green-500 mr-2" />
            <p className="text-sm">QR Code created successfully!</p>
          </div>
        </div>
      ));
      setPreviewKey(prev => prev + 1);
    } catch (error) {
      console.error('Error creating QR code:', error);
      toast.error('Failed to create QR code');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = (file: File) => {
    if (file.size > 500000) {
      toast.error('Logo file is too large. Maximum size is 500KB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogo(reader.result as string);
      toast.success('Logo uploaded successfully!');
    };
    reader.onerror = () => toast.error('Failed to load logo');
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    try {
      const link = document.createElement('a');
      link.download = `qr-code-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      toast.success('QR Code downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download QR code');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Card */}
          <div className="glass-card rounded-xl p-8">
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8">
              QR Code Generator
            </h1>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Controls */}
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-lg">
                  <InputField
                    label="Text or URL to Encode"
                    type="text"
                    value={qrText}
                    onChange={(e) => setQrText(e.target.value)}
                    placeholder="Enter text or paste a URL"
                  />
                </div>

                <div className="glass-card p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Basic Settings</h3>
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                    >
                      <Sliders className="w-4 h-4 mr-1" />
                      {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <InputField
                      label="Foreground Color"
                      type="color"
                      value={options.foregroundColor}
                      onChange={(e) => setOptions({ ...options, foregroundColor: e.target.value })}
                    />
                    <InputField
                      label="Background Color"
                      type="color"
                      value={options.backgroundColor}
                      onChange={(e) => setOptions({ ...options, backgroundColor: e.target.value })}
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        QR Code Size
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="128"
                          max="512"
                          step="32"
                          value={options.size}
                          onChange={(e) => setOptions({ ...options, size: Number(e.target.value) })}
                          className="flex-grow"
                          title="QR Code Size Slider"
                        />
                        <span className="text-sm text-gray-500 w-16">{options.size}px</span>
                      </div>
                    </div>

                    {showAdvanced && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Corner Radius
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="range"
                              min="0"
                              max="50"
                              value={options.cornerRadius}
                              onChange={(e) => setOptions({ ...options, cornerRadius: Number(e.target.value) })}
                              className="flex-grow"
                              title="Corner Radius Slider"
                            />
                            <span className="text-sm text-gray-500 w-12">{options.cornerRadius}%</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Quiet Zone
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="range"
                              min="0"
                              max="32"
                              value={options.quietZone}
                              onChange={(e) => setOptions({ ...options, quietZone: Number(e.target.value) })}
                              className="flex-grow"
                              title="Quiet Zone Slider"
                            />
                            <span className="text-sm text-gray-500 w-12">{options.quietZone}px</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Error Correction Level
                          </label>
                          <select
                            aria-label="Error Correction Level"
                            value={options.errorCorrectionLevel}
                            onChange={(e) => setOptions({ 
                              ...options, 
                              errorCorrectionLevel: e.target.value as QROptions['errorCorrectionLevel'] 
                            })}
                            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700"
                          >
                            <option value="L">Low (7%)</option>
                            <option value="M">Medium (15%)</option>
                            <option value="Q">Quartile (25%)</option>
                            <option value="H">High (30%)</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="glass-card p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Logo Options</h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Upload Logo (optional)
                      </label>
                      <div className="mt-1 flex items-center">
                        <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                          <ImageIcon className="h-5 w-5 mr-2 text-gray-400" />
                          {logo ? 'Change Logo' : 'Upload Logo'}
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            title="Upload logo image"
                            onChange={(e) => e.target.files?.[0] && handleLogoUpload(e.target.files[0])}
                          />
                        </label>
                      </div>
                    </div>

                    {logo && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Logo Size
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="range"
                              min="30"
                              max="150"
                              value={options.logoSize}
                              onChange={(e) => setOptions({ ...options, logoSize: Number(e.target.value) })}
                              className="flex-grow"
                              title="Logo Size Slider"
                            />
                            <span className="text-sm text-gray-500 w-12">{options.logoSize}px</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Logo Opacity
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="range"
                              min="20"
                              max="100"
                              value={options.logoOpacity}
                              onChange={(e) => setOptions({ ...options, logoOpacity: Number(e.target.value) })}
                              className="flex-grow"
                              title="Logo Opacity Slider"
                            />
                            <span className="text-sm text-gray-500 w-12">{options.logoOpacity}%</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setLogo('')}
                          className="flex items-center text-red-500 hover:text-red-600"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Remove Logo
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="flex flex-col space-y-6">
                <div className="glass-card p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Preview</h3>
                    <button
                      onClick={() => setPreviewMode(prev => prev === 'light' ? 'dark' : 'light')}
                      className="flex items-center text-sm"
                    >
                      {previewMode === 'light' ? (
                        <Eye className="w-4 h-4 mr-1" />
                      ) : (
                        <EyeOff className="w-4 h-4 mr-1" />
                      )}
                      {previewMode === 'light' ? 'Light' : 'Dark'} Background
                    </button>
                  </div>

                  <div className={`flex items-center justify-center p-8 rounded-lg ${
                    previewMode === 'light' ? 'bg-white' : 'bg-gray-900'
                  }`}>
                    {qrText ? (
                      <QRCodeCanvas
                        key={previewKey}
                        value={qrText}
                        size={options.size}
                        fgColor={options.foregroundColor}
                        bgColor={options.backgroundColor}
                        level={options.errorCorrectionLevel}
                        quietZone={options.quietZone}
                        imageSettings={logo ? {
                          src: logo,
                          height: options.logoSize,
                          width: options.logoSize,
                          excavate: true,
                        } : undefined}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-64 w-64 border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-gray-500 text-center">
                          Enter text to generate QR code
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={handleGenerateQRCode}
                    disabled={loading || !qrText.trim()}
                    className="flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-5 h-5 mr-2" />
                    )}
                    {loading ? 'Saving...' : 'Save QR Code'}
                  </button>

                  {qrText && (
                    <>
                      <button
                        onClick={handleDownload}
                        className="flex items-center px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download PNG
                      </button>

                      <button
                        onClick={() => setPreviewKey(prev => prev + 1)}
                        className="flex items-center px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
                      >
                        <RefreshCcw className="w-5 h-5 mr-2" />
                        Refresh
                      </button>
                    </>
                  )}
                </div>

                {qrText && (
                  <div className="glass-card p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tips for Best Results
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Use high error correction (H) when adding a logo</li>
                      <li>• Ensure good contrast between colors</li>
                      <li>• Test the QR code with different devices</li>
                      <li>• Keep the quiet zone clear for better scanning</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Templates */}
          <div className="mt-8 glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Templates</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: 'Classic', fg: '#000000', bg: '#FFFFFF' },
                { name: 'Navy', fg: '#1E3A8A', bg: '#EFF6FF' },
                { name: 'Forest', fg: '#064E3B', bg: '#ECFDF5' },
                { name: 'Purple', fg: '#5B21B6', bg: '#F5F3FF' },
                { name: 'Sunset', fg: '#9D174D', bg: '#FDF2F8' },
                { name: 'Ocean', fg: '#0E7490', bg: '#ECFEFF' },
                { name: 'Amber', fg: '#92400E', bg: '#FFFBEB' },
                { name: 'Slate', fg: '#1E293B', bg: '#F8FAFC' },
              ].map((template) => (
                <button
                  key={template.name}
                  onClick={() => setOptions({
                    ...options,
                    foregroundColor: template.fg,
                    backgroundColor: template.bg,
                  })}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-full h-8 rounded mb-2"
                    style={{
                      backgroundColor: template.bg,
                      border: `2px solid ${template.fg}`,
                    }}
                  />
                  <span className="text-sm">{template.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}