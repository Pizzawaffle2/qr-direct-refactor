// src/components/QRCode/QRCodePreview.tsx
import { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download, Maximize2, Minimize2, Copy } from 'lucide-react';
import { QROptions } from '@/types/qr';
import toast from 'react-hot-toast';

interface PreviewProps {
  options: QROptions;
  onDownload?: () => void;
}

export function QRCodePreview({ options, onDownload }: PreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [previewSize, setPreviewSize] = useState(300);
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    const updatedOptions = {
      ...options,
      width: previewSize,
      height: previewSize,
      dotsOptions: {
        ...options.dotsOptions,
        gradient: options.dotsOptions.gradient ? {
          ...options.dotsOptions.gradient,
          colorStops: options.dotsOptions.gradient.colorStops.map(stop => ({
            offset: stop.offset,
            color: stop.color
          }))
        } : undefined
      },
      cornersDotOptions: {
        ...options.cornersDotOptions,
        type: options.cornersDotOptions?.type as 'square' | 'dot' | undefined,
      },
      ...(options.imageOptions && {
        image: options.imageOptions.source,
        imageOptions: {
          imageSize: options.imageOptions.imageSize,
          margin: options.imageOptions.margin,
          hideBackgroundDots: true,
          crossOrigin: 'anonymous',
        },
      }),
      // Add border options
      borderOptions: {
        width: options.borderOptions.width,
        color: options.borderOptions.color,
        radius: options.borderOptions.radius,
      }
    };

    qrCode.current = new QRCodeStyling(updatedOptions);
    
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.current.append(qrRef.current);
    }

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }
    };
  }, [options, previewSize]);

  const handleCopyToClipboard = async () => {
    try {
      const canvas = qrRef.current?.querySelector('canvas');
      if (canvas) {
        const blob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((blob) => resolve(blob!), 'image/png')
        );
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        toast.success('QR code copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to copy QR code');
    }
  };

  const handleResize = (increase: boolean) => {
    setPreviewSize(prev => {
      const newSize = increase ? prev + 50 : prev - 50;
      return Math.min(Math.max(newSize, 200), 600);
    });
  };

  return (
    <div className={`glass-card p-6 rounded-lg transition-all ${
      isExpanded ? 'fixed inset-4 z-50 bg-white/95 backdrop-blur-sm' : ''
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Preview</h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleResize(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Decrease size"
            disabled={previewSize <= 200}
          >
            <Minimize2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleResize(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Increase size"
            disabled={previewSize >= 600}
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 flex items-center justify-center">
        <div
          id="qr-code-container"
          ref={qrRef}
          className="transition-all duration-300"
          style={{ width: previewSize, height: previewSize }}
        />
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={onDownload}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Download className="w-5 h-5" />
          Download
        </button>
        <button
          onClick={handleCopyToClipboard}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          title="Copy to clipboard"
        >
          <Copy className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}