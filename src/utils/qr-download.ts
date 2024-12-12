// src/utils/qr-download.ts
import { QRDownloadOptions } from '@/types/qr';

export async function downloadQRCode(
  canvas: HTMLCanvasElement, 
  options: QRDownloadOptions
): Promise<void> {
  try {
    // Create a temporary canvas for scaling
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d')!;
    
    // Set scaled dimensions
    tempCanvas.width = canvas.width * options.scale;
    tempCanvas.height = canvas.height * options.scale;
    
    // Add margin if requested
    if (options.includeMargin) {
      const margin = 20 * options.scale;
      tempCanvas.width += margin * 2;
      tempCanvas.height += margin * 2;
      
      // Fill background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      
      // Draw scaled QR code with margin
      ctx.drawImage(
        canvas,
        margin,
        margin,
        canvas.width * options.scale,
        canvas.height * options.scale
      );
    } else {
      // Draw scaled QR code without margin
      ctx.drawImage(
        canvas,
        0,
        0,
        canvas.width * options.scale,
        canvas.height * options.scale
      );
    }

    // Generate download link
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${options.name}-${timestamp}`;

    switch (options.format) {
      case 'svg':
        // Convert to SVG
        const svgData = await canvasToSVG(tempCanvas);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
        link.href = URL.createObjectURL(svgBlob);
        link.download = `${filename}.svg`;
        break;

      case 'jpeg':
        link.href = tempCanvas.toDataURL('image/jpeg', options.quality || 0.92);
        link.download = `${filename}.jpg`;
        break;

      default: // PNG
        link.href = tempCanvas.toDataURL('image/png');
        link.download = `${filename}.png`;
    }

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error('Error downloading QR code:', error);
    throw new Error('Failed to download QR code');
  }
}

// Helper function to convert canvas to SVG
async function canvasToSVG(canvas: HTMLCanvasElement): Promise<string> {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;
  
  let paths = '';
  
  // Convert pixel data to SVG paths
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      if (data[index] === 0) { // Black pixel
        paths += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
      }
    }
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <style>rect { fill: black; }</style>
      ${paths}
    </svg>
  `;
}