'use client';

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only try to use useUser() after component is mounted
  const auth = mounted ? useUser() : { user: null, isLoading: true };
  const { user = null, isLoading = true } = auth;

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">QR Direct</Link>
        </h1>
        <nav className="space-x-4">
          <Link href="/qr-generator" className="hover:underline">
            QR Generator
          </Link>
          <Link href="/analytics" className="hover:underline">
            Analytics
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          {/* Auth Links */}
          {mounted && (
            <>
              {!isLoading && user ? (
                <div className="flex items-center space-x-4">
                  <span>Welcome, {user.name}</span>
                  <a href="/api/auth/logout" className="hover:underline">
                    Logout
                  </a>
                </div>
              ) : (
                <a href="/api/auth/login" className="hover:underline">
                  Login
                </a>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}