// src/app/billing/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId: string;
}

interface Subscription {
  planName: string;
  amount: number;
  interval: string;
  priceId: string;
}

export default function BillingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchBillingDetails() {
      try {
        const plansResponse = await fetch('/api/billing/plans');
        const plansData = await plansResponse.json();
        setPlans(plansData);

        const subscriptionResponse = await fetch('/api/billing/subscription');
        const subscriptionData = await subscriptionResponse.json();
        setCurrentSubscription(subscriptionData);
      } catch (error) {
        console.error('Error fetching billing details:', error);
        toast.error('Failed to load billing details.');
      }
    }

    fetchBillingDetails();
  }, []);

  const handleSubscribe = async (priceId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/billing/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();
      if (url) {
        router.push(url);
      } else {
        throw new Error('Failed to get Stripe session URL');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to start subscription process.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!currentSubscription) return;

    const confirmCancel = confirm('Are you sure you want to cancel your subscription?');
    if (!confirmCancel) return;

    setLoading(true);
    try {
      const response = await fetch('/api/billing/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        toast.success('Subscription canceled successfully.');
        setCurrentSubscription(null);
      } else {
        throw new Error('Failed to cancel subscription.');
      }
    } catch (error) {
      console.error('Cancellation error:', error);
      toast.error('Failed to cancel subscription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Billing & Subscriptions</h1>

        {currentSubscription ? (
          <div className="p-6 bg-white rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Current Plan</h2>
            <p className="text-gray-600 mt-2">{currentSubscription.planName}</p>
            <p className="text-gray-600">Billed at ${currentSubscription.amount / 100} per {currentSubscription.interval}</p>
            <button
              onClick={handleCancelSubscription}
              disabled={loading}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Cancel Subscription'}
            </button>
          </div>
        ) : (
          <div className="p-6 bg-white rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold text-gray-900">No Active Subscription</h2>
            <p className="text-gray-600 mt-2">Start your journey with one of our plans below to unlock premium features!</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
              <p className="text-gray-600 mt-2">{plan.description}</p>
              <p className="text-4xl font-bold mt-4">${plan.price / 100}/mo</p>
              <button
                onClick={() => handleSubscribe(plan.priceId)}
                disabled={loading || (currentSubscription && currentSubscription.priceId === plan.priceId)}
                className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Processing...' : currentSubscription && currentSubscription.priceId === plan.priceId ? 'Current Plan' : 'Subscribe'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
