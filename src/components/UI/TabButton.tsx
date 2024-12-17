// src\components\UI\TabButton.tsx
import React, { ReactNode } from 'react';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  className?: string;
}

export function TabButton({ active, onClick, icon, label, className = '' }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors
        ${active ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}
        ${className}`}
      aria-pressed={active ? 'true' : 'false'}
      aria-label={label}
      title={label}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}