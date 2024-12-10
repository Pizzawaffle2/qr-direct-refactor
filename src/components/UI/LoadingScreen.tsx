// components/UI/LoadingScreen.tsx
'use client';

import { Spinner } from './Spinner';

export default function LoadingScreen({ message = "Redirecting to login..." }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))] flex items-center justify-center">
      <div className="glass-card rounded-xl p-8 text-center">
        <Spinner className="mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
}