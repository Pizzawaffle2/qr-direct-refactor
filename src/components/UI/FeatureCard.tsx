// src/components/UI/FeatureCard.tsx
'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface FeatureCardProps {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export default function FeatureCard({ 
  href, 
  title, 
  description, 
  icon: Icon, 
  color,
  bgColor 
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={href}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        glass-card h-full p-6 relative overflow-hidden
        transition-all duration-300 
        hover:translate-y-[-2px]
      `}>
        {/* Animated Corner Gradient */}
        <div className={`
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          bg-gradient-to-br ${bgColor}
        `} />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon with Background */}
          <div className={`
            w-12 h-12 rounded-lg mb-4
            flex items-center justify-center
            ${bgColor} ${color}
            transition-transform duration-300
            group-hover:scale-110
          `}>
            <Icon className="w-6 h-6" />
          </div>

          {/* Text Content */}
          <h3 className={`
            text-lg font-semibold mb-2
            text-gray-900 dark:text-gray-100
            transition-colors duration-300
            ${isHovered ? color : ''}
          `}>
            {title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}