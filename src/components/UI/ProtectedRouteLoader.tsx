// components/UI/ProtectedRouteLoader.tsx
'use client';

import { useEffect, useState } from 'react';

export default function ProtectedRouteLoader() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))] flex items-center justify-center z-50">
      <div className="glass-card rounded-xl p-8 text-center max-w-md mx-auto">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Checking Authorization{dots}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we verify your access
        </p>
      </div>
    </div>
  );
}