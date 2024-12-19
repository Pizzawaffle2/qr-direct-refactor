

// src/components/settings/SubscriptionSection.tsx
'use client';

import { useState } from 'react';
import { CreditCard, Check, AlertTriangle } from 'lucide-react';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    features: [
      '10 QR codes/month',
      'Basic analytics',
      'Ads on QR pages',
      'Standard support',
      'Limited branding',
      'No API access',
    ],
    current: false
  },
  {
    name: 'Pro',
    price: '$12',
    interval: 'month',
    features: [
      'Unlimited QR codes',
      'Advanced analytics',
      'No Ads',
      'Custom branding',
      'API access',
    ],
    current: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Everything in Pro',
      'Dedicated support',
      'Custom integrations',
      'Team management',
    ],
    current: false
  }
];

export function SubscriptionSection() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async (planName: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName,
        }),
      });
      
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error upgrading plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Subscription</h2>
      
      {/* Current Plan Status */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center gap-3">
        <Check className="w-5 h-5 text-green-500" />
        <div className="flex-1">
          <h3 className="font-medium">Pro Plan</h3>
          <p className="text-sm text-gray-600">Your next billing date is January 1, 2025</p>
        </div>
      </div>

      {/* Usage Limits */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg space-y-3">
        <h3 className="font-medium">Current Usage</h3>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>QR Codes</span>
              <span>850/1000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>API Calls</span>
              <span>15,000/20,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-xl p-6 ${
              plan.current ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="text-xl font-bold">{plan.name}</div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{plan.price}</span>
              {plan.interval && (
                <span className="text-gray-600">/{plan.interval}</span>
              )}
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade(plan.name)}
              disabled={plan.current || loading}
              className={`mt-6 w-full py-2 rounded-lg ${
                plan.current
                  ? 'bg-gray-100 text-gray-600 cursor-default'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {plan.current ? 'Current Plan' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Method */}
      <div className="mt-8 border-t pt-6">
        <h3 className="font-medium mb-4">Payment Method</h3>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <div>
              <div>•••• •••• •••• 4242</div>
              <div className="text-sm text-gray-600">Expires 12/25</div>
            </div>
          </div>
          <button className="text-blue-500 hover:text-blue-600">
            Update
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="mt-8">
        <h3 className="font-medium mb-4">Billing History</h3>
        <div className="border rounded-lg divide-y">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div>
                <div>Pro Plan</div>
                <div className="text-sm text-gray-600">Dec 1, 2024</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">$12.00</span>
                <a href="#" className="text-blue-500 hover:text-blue-600">
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}