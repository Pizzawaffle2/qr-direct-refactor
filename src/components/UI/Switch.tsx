// src/components/ui/switch.tsx
import React from 'react';

interface SwitchProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({ isChecked, onChange, label, className }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
          aria-label={label || 'Toggle switch'}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 peer-checked:dark:bg-blue-500 transition-all">
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
              isChecked ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </div>
      </label>
    </div>
  );
};

export default Switch;
