// src/app/billing/page.tsx
'use client';

import React from 'react';
import Script from 'next/script';

// Add type declaration at the top of the file
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': {
        'pricing-table-id': string;
        'publishable-key': string;
      };
    }
  }
}

export default function BillingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))]">
      <div className="morphing-background" />
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Choose Your Plan
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start with our free tier and upgrade as you grow
          </p>
        </div>

        <div className="glass-card rounded-xl p-8 max-w-5xl mx-auto">
          <Script
            src="https://js.stripe.com/v3/pricing-table.js"
            strategy="afterInteractive"
          />
          
          <stripe-pricing-table
            pricing-table-id="prctbl_1QZGxlJK7gurQaSqqDtlY5J9"
            publishable-key="pk_live_51QJQUWJK7gurQaSqCrwZzYP9rxoY8PkUQNIYKS95JjVxcUccxTD1OWHKAdbiMlJ4hCHlpJX2Kcbg5ClWVECscefY00ED1YyPlb"
          />
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Have questions? <a href="/support" className="text-blue-500 hover:text-blue-600">Check our FAQ</a> or{' '}
            <a href="/contact" className="text-blue-500 hover:text-blue-600">contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
}