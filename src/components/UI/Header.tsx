'use client';

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect, useRef } from 'react';
import { Settings, User, LogOut, Menu, X } from 'lucide-react';
import { Spinner } from './Spinner';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, isLoading } = useUser();

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = () => {
    setLoading(true);
    window.location.href = '/api/auth/login';
  };

  const handleLogout = () => {
    setLoading(true);
    window.location.href = '/api/auth/logout';
  };

  const navLinks = [
    { href: '/qr-generator', label: 'QR Generator' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/about', label: 'About' }
  ];

  return (
    <header className="relative z-50">
      <div className="glass-card border-0 rounded-none shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-xl font-bold animated-gradient-text hover:opacity-90 transition-all"
            >
              QR Direct
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {mounted && (
                <>
                  {isLoading || loading ? (
                    <Spinner />
                  ) : user ? (
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 focus:outline-none group"
                      >
                        <img
                          src={user.picture || '/default-avatar.png'}
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full border-2 border-blue-500/30 group-hover:border-blue-500 transition-colors"
                        />
                      </button>

                      {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 glass-card divide-y divide-gray-200 dark:divide-gray-700 rounded-lg overflow-hidden">
                          <div className="px-4 py-3">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                              {user.email}
                            </p>
                          </div>

                          <div className="py-1">
                            {[
                              { href: '/profile', icon: User, label: 'Profile' },
                              { href: '/settings', icon: Settings, label: 'Settings' }
                            ].map(item => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                              >
                                <item.icon className="w-4 h-4 mr-2" />
                                {item.label}
                              </Link>
                            ))}
                          </div>

                          <div className="py-1">
                            <button
                              onClick={handleLogout}
                              className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 w-full text-left"
                            >
                              <LogOut className="w-4 h-4 mr-2" />
                              Logout
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="btn-primary"
                      disabled={loading}
                    >
                      {loading ? <Spinner /> : 'Login'}
                    </button>
                  )}
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-2 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}