'use client';

import { Sparkles, ArrowRight, Calendar, Link as LinkIcon, Users, UserPlus, Printer, BarChart3, User, Settings, HelpCircle, Info } from 'lucide-react';
import FeatureCard from '@/components/UI/FeatureCard';

export default function Home() {
  const features = [
    { href: '/qr-generator', title: 'QR Generator', description: 'Create stunning, customizable QR codes instantly.', icon: Sparkles, color: 'text-blue-500' },
    { href: '/calendars', title: 'Calendar Maker', description: 'Create and design beautiful calendars and scheduling links that integrate with any calendar.', icon: Calendar, color: 'text-indigo-500' },
    { href: '/link-shortener', title: 'Link Shortener', description: 'Create memorable, branded short links instantly.', icon: LinkIcon, color: 'text-cyan-500' },
    { href: '/bio-links', title: 'Bio Links', description: 'Create beautiful link-in-bio pages for social media.', icon: Users, color: 'text-pink-500' },
    { href: '/teams', title: 'Teams', description: 'Collaborate with your team and manage access controls.', icon: UserPlus, color: 'text-amber-500' },
    { href: '/print-shop', title: 'Get It Printed!', description: 'Professional printing services for your QR codes and designs.', icon: Printer, color: 'text-emerald-500' },
    { href: '/analytics', title: 'Analytics', description: 'Track and optimize campaign performance.', icon: BarChart3, color: 'text-purple-500' },
    { href: '/profile', title: 'Profile', description: 'Manage your account and preferences.', icon: User, color: 'text-orange-500' },
    { href: '/settings', title: 'Settings', description: 'Customize your workspace and integrations.', icon: Settings, color: 'text-slate-500' },
    { href: '/support', title: 'Support', description: 'Get help and explore our knowledge base.', icon: HelpCircle, color: 'text-rose-500' },
    { href: '/billing', title: 'Billing', description: 'Manage subscription and payment options.', icon: ArrowRight, color: 'text-green-500' },
    { href: '/about', title: 'About Us', description: 'Discover our story and mission.', icon: Info, color: 'text-gray-700' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))] overflow-hidden">
      <div className="morphing-background" />
      
      <header className="relative w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/30 dark:border-gray-700/30">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-center text-5xl font-bold animated-gradient-text tracking-tight">
            QR Direct
          </h1>
          <p className="text-center mt-2 text-gray-600 dark:text-gray-300">
            The future of digital connection management
          </p>
        </div>
      </header>

      <main className="relative container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text">
            Your All-in-One Platform
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Generate QR codes, manage links, create digital profiles, and collaborate with your team - all from one intuitive platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.href} {...feature} />
          ))}
        </div>
      </main>

    </div>
  );
}