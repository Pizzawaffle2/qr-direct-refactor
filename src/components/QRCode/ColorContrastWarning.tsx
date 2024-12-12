// src/components/QRCode/ContrastWarning.tsx
import { AlertTriangle } from 'lucide-react';
import InputField from '@/components/UI/InputField';

interface ContrastWarningProps {
  contrastRatio: number;
  isVisible: boolean;
}

export function ContrastWarning({ contrastRatio, isVisible }: ContrastWarningProps) {
  if (!isVisible) return null;

  return (
    <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
      <div className="flex items-center gap-2 text-yellow-800">
        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
        <div className="text-sm">
          <span className="font-medium">Low contrast detected: </span>
          <span>{contrastRatio.toFixed(1)}:1</span>
          <p className="mt-0.5 text-yellow-700">
            QR codes require a minimum contrast ratio of 7:1 for reliable scanning.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ColorInputWithWarning({
  label,
  value,
  onChange,
  hasWarning,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hasWarning: boolean;
}) {
  return (
    <div className="relative">
      <InputField
        label={label}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hasWarning && (
        <AlertTriangle 
          className="absolute right-2 top-9 text-yellow-500 animate-pulse" 
          aria-label="Warning: Low contrast"
        />
      )}
    </div>
  );
}