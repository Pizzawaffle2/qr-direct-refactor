// src/utils/qr-api.ts
import { QROptions } from '@/types/qr';

interface GenerateQRResponse {
  qrCode: string;
  metadata: {
    size: number;
    margin: number;
    errorLevel: string;
    contrastRatio: string;
  };
}

interface GenerateQRError {
  error: string;
  details?: string;
}

export async function generateQRCode(
  value: string,
  options: QROptions
): Promise<GenerateQRResponse> {
  const response = await fetch('/api/qr-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value, options }),
  });

  if (!response.ok) {
    const errorData = await response.json() as GenerateQRError;
    throw new Error(errorData.details || errorData.error);
  }

  return response.json();
}

export async function getQRCodeCapabilities(): Promise<{
  supported_features: {
    formats: string[];
    error_correction_levels: string[];
    min_size: number;
    max_size: number;
    min_contrast_ratio: number;
  };
  recommended_settings: {
    error_correction_level: string;
    min_size: number;
    margin: number;
  };
}> {
  const response = await fetch('/api/qr-code');
  
  if (!response.ok) {
    throw new Error('Failed to fetch QR code capabilities');
  }

  return response.json();
}