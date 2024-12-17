
// src/app/bio-link/components/theme/ButtonStyleCustomizer.tsx
import { BioPageTheme, ButtonStyle, AnimationType } from '@/app/bio-links/types';

interface ButtonStyleCustomizerProps {
  theme: BioPageTheme;
  onThemeChange: (theme: BioPageTheme) => void;
}

export function ButtonStyleCustomizer({ theme, onThemeChange }: ButtonStyleCustomizerProps) {
  const BUTTON_STYLES: Array<{ value: ButtonStyle; label: string }> = [
    { value: 'rounded', label: 'Rounded' },
    { value: 'sharp', label: 'Sharp' },
    { value: 'pill', label: 'Pill' }
  ];

  const ANIMATIONS: Array<{ value: AnimationType; label: string }> = [
    { value: 'none', label: 'None' },
    { value: 'fade', label: 'Fade' },
    { value: 'slide', label: 'Slide' },
    { value: 'bounce', label: 'Bounce' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Button Style</h3>
        <div className="grid grid-cols-3 gap-4">
          {BUTTON_STYLES.map(style => (
            <button
              key={style.value}
              onClick={() => onThemeChange({ ...theme, buttonStyle: style.value })}
              className={`p-3 border rounded-lg hover:border-blue-500 transition-colors ${
                theme.buttonStyle === style.value ? 'border-blue-500 bg-blue-50' : ''
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Button Animation</h3>
        <div className="grid grid-cols-2 gap-4">
          {ANIMATIONS.map(animation => (
            <button
              key={animation.value}
              onClick={() => onThemeChange({ ...theme, buttonAnimation: animation.value })}
              className={`p-3 border rounded-lg hover:border-blue-500 transition-colors ${
                theme.buttonAnimation === animation.value ? 'border-blue-500 bg-blue-50' : ''
              }`}
            >
              {animation.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}