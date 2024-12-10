// src/components/ui/tabs.tsx
import { ReactNode, useState } from 'react';

interface TabsProps {
  children: ReactNode;
}

interface TabTriggerProps {
  value: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

interface TabContentProps {
  value: string;
  active: boolean;
  children: ReactNode;
}

export const Tabs = ({ children }: TabsProps) => {
  return <div className="tabs">{children}</div>;
};

export const TabsList = ({ children }: TabsProps) => {
  return <div className="tabs-list flex space-x-2">{children}</div>;
};

export const TabsTrigger = ({ value, active, onClick, children }: TabTriggerProps) => (
  <button
    className={`px-4 py-2 rounded ${
      active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, active, children }: TabContentProps) => (
  <div className={`${active ? 'block' : 'hidden'}`}>{children}</div>
);
