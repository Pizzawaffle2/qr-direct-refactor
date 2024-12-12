// src/pages/api/qr-code.ts
import { NextApiRequest, NextApiResponse } from 'next';
import QRCode from 'qrcode';
import { QROptions } from '@/types/qr';
import { getContrastRatio } from '@/utils/contrast';

interface GenerateQRRequest {
  value: string;
  options: QROptions;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { value, options } = req.body as GenerateQRRequest;

    // Validate required fields
    if (!value) {
      return res.status(400).json({ 
        error: 'Value is required to generate a QR code.' 
      });
    }

    // Validate contrast ratio
    const contrastRatio = getContrastRatio(
      options.foregroundColor || '#000000',
      options.backgroundColor || '#FFFFFF'
    );

    if (contrastRatio < 7) {
      return res.status(400).json({
        error: 'Insufficient contrast',
        details: `Current contrast ratio (${contrastRatio.toFixed(1)}:1) is below the recommended 7:1 for reliable scanning.`
      });
    }

    // Set up QR code options
    const qrOptions = {
      width: options.size || 256,
      margin: options.margin || 4,
      color: {
        dark: options.enableGradient ? '#000000' : (options.foregroundColor || '#000000'),
        light: options.backgroundColor || '#FFFFFF',
      },
      errorCorrectionLevel: options.errorCorrectionLevel || 'H',
      quality: 1,
    };

    // Generate QR code
    const qrCode = await QRCode.toDataURL(value, qrOptions);

    // Return success response
    return res.status(200).json({
      qrCode,
      metadata: {
        size: qrOptions.width,
        margin: qrOptions.margin,
        errorLevel: qrOptions.errorCorrectionLevel,
        contrastRatio: contrastRatio.toFixed(1),
      }
    });

  } catch (error) {
    console.error('Error generating QR code:', error);
    
    return res.status(500).json({ 
      error: 'Failed to generate QR code',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}

// Configure body parser size limit for larger QR codes
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};