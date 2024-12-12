// src/utils/contrast.ts

/**
 * Calculate the relative luminance of a color
 * Based on WCAG 2.0 formula
 */
function getLuminance(hexColor: string): number {
    // Convert hex to RGB
    const rgb = parseInt(hexColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
  
    // Convert to relative luminance values
    const [rs, gs, bs] = [r, g, b].map(c => {
      const x = c / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
  
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }
  
  /**
   * Calculate contrast ratio between two colors
   * Returns a value between 1 and 21
   */
  export function getContrastRatio(color1: string, color2: string): number {
    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }
  
  /**
   * Check if the contrast ratio is sufficient for QR code scanning
   * Returns true if contrast is sufficient (>= 7:1)
   */
  export function hasGoodQRContrast(foreground: string, background: string): boolean {
    return getContrastRatio(foreground, background) >= 7;
  }