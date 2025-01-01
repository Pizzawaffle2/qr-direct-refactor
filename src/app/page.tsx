'use client';

import { Sparkles, ArrowRight, Calendar, Link as LinkIcon, Users, UserPlus, Printer, 
         BarChart3, User, Settings, HelpCircle, Info, ArrowUpRight } from 'lucide-react';
import FeatureCard from '@/components/UI/FeatureCard';

export default function Home() {
  const features = [
    { 
      href: '/qr-generator', 
      title: 'QR Generator', 
      description: 'Create stunning, customizable QR codes instantly.', 
      icon: Sparkles, 
      color: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-500/10 dark:bg-blue-400/10' 
    },
    { 
      href: '/calendar-maker', 
      title: 'Calendar Maker', 
      description: 'Create and design beautiful calendars and scheduling links that integrate with any calendar.', 
      icon: Calendar, 
      color: 'text-indigo-500 dark:text-indigo-400',
      bgColor: 'bg-indigo-500/10 dark:bg-indigo-400/10'
    },
    { 
      href: '/link-shortener', 
      title: 'Link Shortener', 
      description: 'Create memorable, branded short links instantly.', 
      icon: LinkIcon, 
      color: 'text-cyan-500 dark:text-cyan-400',
      bgColor: 'bg-cyan-500/10 dark:bg-cyan-400/10'
    },
    { 
      href: '/bio-links', 
      title: 'Bio Links', 
      description: 'Create beautiful link-in-bio pages for social media.', 
      icon: Users, 
      color: 'text-pink-500 dark:text-pink-400',
      bgColor: 'bg-pink-500/10 dark:bg-pink-400/10'
    },
    { 
      href: '/teams', 
      title: 'Teams', 
      description: 'Collaborate with your team and manage access controls.', 
      icon: UserPlus, 
      color: 'text-amber-500 dark:text-amber-400',
      bgColor: 'bg-amber-500/10 dark:bg-amber-400/10'
    },
    { 
      href: '/print-shop', 
      title: 'Get It Printed!', 
      description: 'Professional printing services for your QR codes and designs.', 
      icon: Printer, 
      color: 'text-emerald-500 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-400/10'
    },
    { 
      href: '/analytics', 
      title: 'Analytics', 
      description: 'Track and optimize campaign performance.', 
      icon: BarChart3, 
      color: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-500/10 dark:bg-purple-400/10'
    },
    { 
      href: '/profile', 
      title: 'Profile', 
      description: 'Manage your account and preferences.', 
      icon: User, 
      color: 'text-orange-500 dark:text-orange-400',
      bgColor: 'bg-orange-500/10 dark:bg-orange-400/10'
    },
    { 
      href: '/settings', 
      title: 'Settings', 
      description: 'Customize your workspace and integrations.', 
      icon: Settings, 
      color: 'text-slate-500 dark:text-slate-400',
      bgColor: 'bg-slate-500/10 dark:bg-slate-400/10'
    },
    { 
      href: '/support', 
      title: 'Support', 
      description: 'Get help and explore our knowledge base.', 
      icon: HelpCircle, 
      color: 'text-rose-500 dark:text-rose-400',
      bgColor: 'bg-rose-500/10 dark:bg-rose-400/10'
    },
    { 
      href: '/billing', 
      title: 'Billing', 
      description: 'Manage subscription and payment options.', 
      icon: ArrowRight, 
      color: 'text-green-500 dark:text-green-400',
      bgColor: 'bg-green-500/10 dark:bg-green-400/10'
    },
    { 
      href: '/about', 
      title: 'About Us', 
      description: 'Discover our story and mission.', 
      icon: Info, 
      color: 'text-gray-700 dark:text-gray-400',
      bgColor: 'bg-gray-500/10 dark:bg-gray-400/10'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))] overflow-hidden">
      <div className="morphing-background" />
      
      {/* Header */}
      <header className="relative w-full">
        <div className="glass-card border-0 rounded-none">
          <div className="container mx-auto px-6 py-12">
            <h1 className="text-center text-5xl font-bold animated-gradient-text tracking-tight mb-4">
              QR Direct
            </h1>
            <p className="text-center text-lg text-gray-600 dark:text-gray-300">
              The future of digital connection management
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a href="/qr-generator" className="btn-primary inline-flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/about" className="btn-secondary inline-flex items-center gap-2">
                Learn More <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-6 py-16">
        {/* Main Content Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold animated-gradient-text mb-4">
            Your All-in-One Platform
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Generate QR codes, manage links, create digital profiles, and collaborate 
            with your team - all from one intuitive platform.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {features.map((feature) => (
            <FeatureCard key={feature.href} {...feature} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="glass-card max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Join thousands of users who are already managing their digital presence with QR Direct.
            </p>
            <a href="/qr-generator" className="btn-primary inline-flex items-center gap-2">
              Create Your First QR Code <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}