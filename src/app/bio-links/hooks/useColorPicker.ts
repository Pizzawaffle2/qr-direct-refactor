
// src/app/bio-link/hooks/useColorPicker.ts
import { useState } from 'react';
import { ColorSchemeKey } from '../types';

export function useColorPicker() {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeColorKey, setActiveColorKey] = useState<ColorSchemeKey>('primary');

  const openColorPicker = (key: ColorSchemeKey) => {
    setActiveColorKey(key);
    setShowColorPicker(true);
  };

  const closeColorPicker = () => {
    setShowColorPicker(false);
  };

  return {
    showColorPicker,
    activeColorKey,
    openColorPicker,
    closeColorPicker
  };
}
