// src/types/qr.ts

/**
 * Available shapes for QR code dots and corners
 */
export type QRShape = 'square' | 'circle' | 'rounded';

/**
 * Defines styles for QR code dots.
 */
export interface QRDotStyle {
    shape: QRShape;
    color: string;
}

/**
 * Error correction levels for QR code generation.
 */
export type QRErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

/**
 * Interface for core QR code generation options.
 */
export interface QROptions {
  // Core Options
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  errorCorrectionLevel: QRErrorCorrectionLevel;

  // Logo Options
  logo?: string;
  logoSize: number;
  logoMargin: number;
  logoPadding: number;
  logoBackgroundColor: string;
  logoOpacity: number;
  logoScale?: number;

  // Style Options
  dotStyle: QRDotStyle;
  cornerStyle: QRDotStyle;
  dotScale: number;
  cornerSquareScale: number;
  cornerDotScale: number;
  margin: number;

  // Background Options
  backgroundDots?: boolean;
  backgroundDotsColor?: string;

  // Gradient Options
  enableGradient: boolean;
  gradientColors: [string, string];
  gradientRotation?: number;
}

/**
 * Interface for QR code download/export options.
 */
export interface QRDownloadOptions {
  scale: number;
  includeMargin: boolean;
  name: string;
  format: 'svg' | 'jpeg' | 'png';
  quality?: number;
}

/**
 * Interface for predefined QR code styles.
 */
export interface QRCodeStyle {
  name: string;
  description: string;
  dotStyle: string;
  cornerStyle: string;
  colors: {
    foreground: string;
    background: string;
    gradient?: string[];
  };
  dotScale?: number;
  cornerSquareScale?: number;
  cornerDotScale?: number;
}

/**
 * Default configuration for QR code generation.
 */
export const defaultOptions: QROptions = {
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