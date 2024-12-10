// components/auth/withAuth.tsx
'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import LoadingScreen from '../UI/LoadingScreen';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const { user, isLoading } = useUser();

    useEffect(() => {
      if (!isLoading && !user) {
        window.location.href = '/api/auth/login';
      }
    }, [user, isLoading]);

    if (isLoading || !user) {
      return <LoadingScreen />;
    }

    return <WrappedComponent {...props} />;
  };
}