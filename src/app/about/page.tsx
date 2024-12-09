/* src\app\about\page.tsx */
'use client';

import { Rocket, Heart, Shield, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))] overflow-hidden">
      <div className="morphing-background" />

      <div className="relative container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text mb-6">
            About QR Direct
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            QR Direct is your all-in-one platform for creating, managing, and tracking digital connections. 
            We make QR codes, link management, and analytics accessible to everyone.
          </p>
        </div>

        {/* Mission Section */}
        <div className="glass-card rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We're on a mission to bridge the physical and digital worlds through innovative QR solutions. 
            Our platform empowers businesses and individuals to create meaningful connections and track 
            their impact in real-time.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Rocket className="w-6 h-6 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Innovation
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              We constantly push the boundaries of what's possible with QR technology 
              and digital connections.
            </p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-pink-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                User-Centric
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Every feature we build starts with our users' needs and feedback.
            </p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-green-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Security
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              We prioritize the security and privacy of our users' data above everything else.
            </p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-yellow-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Performance
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Our platform is built for speed and reliability, ensuring your QR codes 
              work flawlessly every time.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="glass-card rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Built for Everyone
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Whether you're a small business owner, marketing professional, or individual creator, 
            QR Direct provides the tools you need to succeed in the digital world.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Our platform is designed to scale with your needs, from simple QR codes to 
            complex marketing campaigns with advanced analytics and team collaboration features.
          </p>
        </div>
      </div>
    </div>
  );
}