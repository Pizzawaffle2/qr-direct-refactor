// src/components/ui/card.tsx
import { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className, onClick }: CardProps) => {
  return (
    <div className={`p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return <div className={`border-b pb-2 mb-4 ${className}`}>{children}</div>;
};

export const CardContent = ({ children, className }: CardContentProps) => {
  return <div className={`${className}`}>{children}</div>;
};
