import { NextApiRequest, NextApiResponse } from 'next';
import QRCode from 'qrcode';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { value, options } = req.body;

      if (!value) {
        return res.status(400).json({ error: 'Value is required to generate a QR code.' });
      }

      const qrCode = await QRCode.toDataURL(value, {
        width: options.size || 256,
        margin: options.margin || 4,
        color: {
          dark: options.foregroundColor || '#000000',
          light: options.backgroundColor || '#FFFFFF',
        },
        errorCorrectionLevel: options.errorCorrectionLevel || 'H',
      });

      res.status(200).json({ qrCode });
    } catch (error) {
      console.error('Error generating QR code:', error);
      res.status(500).json({ error: 'Failed to generate QR code.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
