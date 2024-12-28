// src/types/qr.ts

export type QRDotType = 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded';
export type QRCornerSquareType = 'square' | 'dot' | 'extra-rounded';
export type QRCornerDotType = 'square' | 'dot';
export type QRErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRGradient {
  type: 'linear' | 'radial';
  rotation: number;
  colorStops: Array<{
    offset: number;
    color: string;
  }>;
}

export interface QRDotsOptions {
  color: string;
  type: QRDotType;
  gradient?: QRGradient;
}

export interface QRCornersSquareOptions {
  type: QRCornerSquareType;
  color: string;
}

export interface QRCornersDotOptions {
  type: QRCornerDotType;
  color: string;
}

export interface QRBackgroundOptions {
  color: string;
  gradient?: QRGradient;
}

export interface QRBorderOptions {
  color: string;
  width: number;
  radius: number;
}

export interface QRImageOptions {
  source: string;
  width: number;
  height: number;
  margin: number;
  imageSize: number;
}

export interface QROptions {
  data: string;
  width: number;
  height: number;
  margin: number;
  dotsOptions: {
    color: string;
    type: QRDotType;
    gradient?: Gradient;
  };
  cornersSquareOptions: {
    type: string;
    color: string;
  };
  cornersDotOptions: {
    type: string;
    color: string;
  };
  backgroundOptions: {
    color: string;
  };
  borderOptions: {
    color: string;
    width: number;
    radius: number;
  };
  errorCorrectionLevel: string;
  imageOptions?: {
    hideBackgroundDots?: boolean;
    imageSize?: number;
    margin?: number;
    crossOrigin?: string;
    image?: string;
  };
}

export interface QRTemplate {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  options: {
    data: string;
    width: number;
    height: number;
    margin: number;
    dotsOptions: {
      color: string;
      type: string;
      gradient?: Gradient;
    };
    cornersSquareOptions: {
      type: string;
      color: string;
    };
    cornersDotOptions: {
      type: string;
      color: string;
    };
    backgroundOptions: {
      color: string;
    };
    borderOptions: {
      color: string;
      width: number;
      radius: number;
    };
    errorCorrectionLevel: string;
  };
}

export interface Gradient {
  type: 'linear' | 'radial';
  rotation: number;
  colorStops: { offset: number; color: string }[];
}

export interface DotsOptions {
  color?: string;
  type: string;
  gradient?: Gradient;
}