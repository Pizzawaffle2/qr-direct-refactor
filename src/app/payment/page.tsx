// src/app/payment/page.tsx
'use client';

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Check, Loader2 } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const PLANS = [
  {
    id: "prod_RMgkwijBXPBcX2",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "100 QR codes per month",
      "Basic analytics",
      "Standard support",
      "Basic link shortener",
      "Single user"
    ],
    highlight: false
  },
  {
    id: "prod_RMgkxKtUwS05b8",
    name: "Premium",
    price: "$12",
    period: "per month",
    description: "For growing businesses",
    features: [
      "Unlimited QR codes",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
      "Team collaboration",
      "API access",
      "Custom domains",
      "Webhook integrations"
    ],
    highlight: true
  }
];

export default function PaymentPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    setLoading(priceId);
    try {
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe has not loaded");
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
      // You might want to show a toast message here
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Choose Your Plan
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your needs. All plans include our core features with 
            different usage limits and capabilities.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 ${
                plan.highlight
                  ? 'border-2 border-blue-500 shadow-blue-500/25'
                  : 'border border-gray-200'
              } bg-white shadow-xl`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </div>
                </div>
              )}

              <div className="flex flex-col h-full">
                <div>
                  <h2 className="text-2xl font-bold">{plan.name}</h2>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="ml-2 text-gray-600">/{plan.period}</span>
                  </div>
                  <p className="mt-2 text-gray-600">{plan.description}</p>
                </div>

                <div className="mt-8 space-y-4 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading !== null}
                  className={`mt-8 w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2 
                    ${plan.highlight
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.id ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Get Started with ${plan.name}`
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Have questions? <a href="/contact" className="text-blue-500 hover:text-blue-600">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
}