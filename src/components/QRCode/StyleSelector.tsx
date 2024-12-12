// src/components/QRCode/StyleSelector.tsx

import { QRShape } from '@/types/qr';
import { Square, Circle, Type } from 'lucide-react';

interface StyleOption {
  name: string;
  value: QRShape;
  icon: typeof Square | typeof Circle | typeof Type;
}

interface StyleSelectorProps {
  label: string;
  value: QRShape;
  onChange: (value: QRShape) => void;
}

const SHAPE_OPTIONS: StyleOption[] = [
  { name: 'Square', value: 'square', icon: Square },
  { name: 'Circle', value: 'circle', icon: Circle },
  { name: 'Rounded', value: 'rounded', icon: Type },
];

export function StyleSelector({
  label,
  value,
  onChange,
}: StyleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <div className="flex flex-wrap gap-2">
        {SHAPE_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isActive = value === option.value;
          
          return (
            <button
              type="button"
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md transition-all
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${
                  isActive
                    ? 'bg-blue-500 text-white ring-1 ring-blue-600'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }
              `}
              aria-label={`Select ${option.name} style`}
            >
              <Icon className="w-4 h-4" />
              <span>{option.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}