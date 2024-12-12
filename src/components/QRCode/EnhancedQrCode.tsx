'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { QROptions } from '@/types/qr';
import { motion as m, LazyMotion, domAnimation } from 'framer-motion';
import { generateQRCode } from '@/utils/qr-api';
import toast from 'react-hot-toast';

interface Props {
  value: string;
  options: QROptions;
  onGenerated?: (dataUrl: string) => void;
}

export default function EnhancedQRCode({ value, options, onGenerated }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const applyCustomStyles = useCallback(async (baseQrCode: string) => {
    if (!canvasRef.current) return baseQrCode;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not found');
      return baseQrCode;
    }

    // Create a temporary image to load the base QR code
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = baseQrCode;
    });

    // Set canvas dimensions
    canvas.width = options.size;
    canvas.height = options.size;

    // Draw the base QR code
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Apply gradient if enabled
    if (options.enableGradient) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Create gradient with rotation
      const angle = (options.gradientRotation || 0) * (Math.PI / 180);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 2;
      
      const startX = centerX - radius * Math.cos(angle);
      const startY = centerY - radius * Math.sin(angle);
      const endX = centerX + radius * Math.cos(angle);
      const endY = centerY + radius * Math.sin(angle);
      
      const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
      gradient.addColorStop(0, options.gradientColors[0]);
      gradient.addColorStop(1, options.gradientColors[1]);

      // Fill background
      ctx.fillStyle = options.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Apply gradient to QR modules
      ctx.fillStyle = gradient;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] === 0) { // Black pixel
          const x = (i / 4) % canvas.width;
          const y = Math.floor((i / 4) / canvas.width);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    // Add logo if specified
    if (options.logo) {
      try {
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        
        await new Promise((resolve, reject) => {
          logoImg.onload = resolve;
          logoImg.onerror = reject;
          if (options.logo) {
            logoImg.src = options.logo;
          } else {
            throw new Error('Logo URL is undefined');
          }
        });

        const logoSize = options.logoSize;
        const x = (canvas.width - logoSize) / 2;
        const y = (canvas.height - logoSize) / 2;

        // Add logo background
        ctx.fillStyle = options.logoBackgroundColor;
        ctx.fillRect(
          x - options.logoMargin,
          y - options.logoMargin,
          logoSize + 2 * options.logoMargin,
          logoSize + 2 * options.logoMargin
        );

        // Draw logo with opacity
        ctx.globalAlpha = options.logoOpacity;
        ctx.drawImage(logoImg, x, y, logoSize, logoSize);
        ctx.globalAlpha = 1.0;
      } catch (error) {
        console.error('Error loading logo:', error);
        toast.error('Failed to load logo image');
      }
    }

    return canvas.toDataURL();
  }, [options]);

  const generateQR = useCallback(async () => {
    if (!value) return;

    setIsGenerating(true);
    setIsLoading(true);

    try {
      // Generate base QR code using API
      const { qrCode } = await generateQRCode(value, {
        ...options,
        // Disable gradient in API call as we'll apply it client-side
        enableGradient: false
      });

      // Apply custom styles (gradient, logo)
      const finalQrCode = await applyCustomStyles(qrCode);

      // Notify parent with generated QR code
      if (onGenerated) {
        onGenerated(finalQrCode);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate QR code');
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
    }
  }, [value, options, applyCustomStyles, onGenerated]);

  useEffect(() => {
    generateQR();
  }, [generateQR]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {isLoading && (
          <m.div
            className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </m.div>
        )}
        <m.div
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
          animate={isGenerating ? { scale: 0.98 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <canvas 
            ref={canvasRef} 
            className="max-w-full h-auto"
          />
        </m.div>
      </m.div>
    </LazyMotion>
  );
}