// src/utils/debug.ts

export function logStyleApplication(templateName: string, options: any) {
    console.group(`Applying style: ${templateName}`);
    console.log('Options:', {
      foregroundColor: options.foregroundColor,
      backgroundColor: options.backgroundColor,
      enableGradient: options.enableGradient,
      gradientColors: options.gradientColors,
      dotStyle: options.dotStyle,
      cornerStyle: options.cornerStyle,
      dotScale: options.dotScale,
      cornerSquareScale: options.cornerSquareScale,
    });
    console.groupEnd();
  }