// src/components/UI/Footer.tsx
'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Sun, Moon, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BsTwitterX } from "react-icons/bs";


const FOOTER_LINKS = {
  product: [
    { label: 'QR Generator', href: '/qr-generator' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Bio Links', href: '/bio-links' },
    { label: 'Print Shop', href: '/print-shop' }
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' }
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/TOS' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'GDPR', href: '/gdpr' }
  ]
};

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: BsTwitterX, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/104994608', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' }
];

export default function Footer() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <footer className="relative z-10">
      <div className="glass-card border-0 rounded-none border-t border-gray-200/30 dark:border-gray-700/30">
        <div className="container mx-auto px-6 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xl font-bold animated-gradient-text mb-4">
                QR Direct
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Simplifying QR code management for everyone.
              </p>
              {/* Social Links */}
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Product</h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Company</h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Legal</h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200/30 dark:border-gray-700/30 pt-8 flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} QR Direct. All rights reserved.
            </p>
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
