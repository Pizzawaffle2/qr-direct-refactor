// src/components/QRCode/QRCodePreview.tsx
'use client';

import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download } from 'lucide-react';
import toast from 'react-hot-toast';

interface PreviewProps {
  options: any; // We'll replace this with the proper QR options type
  onDownload?: () => void;
}

export function QRCodePreview({ options, onDownload }: PreviewProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    qrCode.current = new QRCodeStyling(options);

    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.current.append(qrRef.current);
    }

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }
    };
  }, [options]);

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Preview</h3>
      </div>

      <div className="bg-white rounded-lg p-4 flex items-center justify-center">
        <div ref={qrRef} className="w-full aspect-square max-w-[300px]" />
      </div>

      <button
        onClick={onDownload}
        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Download className="w-5 h-5" />
        Download QR Code
      </button>
    </div>
  );
}