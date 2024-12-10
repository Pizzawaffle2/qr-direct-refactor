// src/components/ui/slider.tsx
import React, { useState } from 'react';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
}

const Slider: React.FC<SliderProps> = ({ value, onChange, min = 0, max = 100, step = 1, label, className }) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setCurrentValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-2 text-sm text-gray-700 dark:text-gray-300">{label}</label>}
      <div className="flex items-center space-x-2">
        <input
          type="range"
          value={currentValue}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          title={label || 'Value slider'}
          aria-label={label || 'Value slider'}
          className="flex-grow appearance-none bg-gray-200 dark:bg-gray-700 h-2 rounded-full"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">{currentValue}</span>
      </div>
    </div>
  );
};

export default Slider;
