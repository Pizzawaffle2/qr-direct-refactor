'use client';

import { DndContext } from '@dnd-kit/core';
import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <UserProvider>
        <ThemeProvider>
          <DndContext>
            {children}
            <Toaster position="top-right" />
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </DndContext>
        </ThemeProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}