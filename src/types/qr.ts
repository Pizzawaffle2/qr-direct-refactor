// src/types/qr.ts
export type QRDotType = 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
export type QRCornerType = 'extra-rounded' | 'square';
export type QRCornerDotType = 'dot' | 'square';
export type QRErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QROptions {
  // Core Options
  data: string;
  width: number;
  height: number;
  margin: number;
  errorCorrectionLevel: QRErrorCorrectionLevel;

  // Style Options
  dotsOptions: {
    color: string;
    type: QRDotType;
  };
  backgroundOptions: {
    color: string;
  };
  borderOptions: {
    color: string;
    radius: number;
    width: number;
  };

  // Plugin Options
  pluginOptions: {
    key: string;
    isActive: boolean;
  };
}