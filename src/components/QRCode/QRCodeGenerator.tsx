// src/components/QRCode/QRCodeGenerator.tsx
'use client';

import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import QRBorderPlugin from 'qr-border-plugin';

interface QRCodeGeneratorProps {
  options: {
    data: string;
    width: number;
    height: number;
    margin: number;
    dotsOptions: {
      color: string;
      type: 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
    };
    cornersSquareOptions?: {
      color: string;
      type: 'extra-rounded' | 'square';
    };
    cornersDotOptions?: {
      color: string;
      type: 'dot' | 'square';
    };
    backgroundOptions: { color: string };
    borderOptions?: {
      plugin: typeof QRBorderPlugin;
      color: string;
      radius: number;
      width: number;
    };
  };
  onGenerated?: (url: string) => void;
}

const defaultBorderOptions = {
  plugin: QRBorderPlugin,
  color: '#000000',
  radius: 10,
  width: 4,
};

export default function QRCodeGenerator({ options, onGenerated }: QRCodeGeneratorProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    const { borderOptions, ...qrOptions } = options;
    qrCode.current = new QRCodeStyling({
      ...qrOptions,
    });

    if (qrRef.current) {
      qrCode.current.append(qrRef.current);
    }

    return () => {
      qrCode.current = null;
    };
  }, []);

  useEffect(() => {
    if (qrCode.current) {
      qrCode.current.update(options);
      if (onGenerated) {
        qrCode.current.getRawData('png').then((data) => {
          if (data) {
            const url = URL.createObjectURL(data as Blob);
            onGenerated(url);
          }
        });
      }
    }
  }, [options, onGenerated]);

  return <div ref={qrRef} className="relative aspect-square" />;
}
