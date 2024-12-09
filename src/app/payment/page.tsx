import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (priceId: string) => {
    setLoading(true);
    const stripe = await stripePromise;

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId }),
    });

    const { sessionId } = await response.json();

    if (!stripe) {
      console.error("Stripe has not loaded");
      setLoading(false);
      return;
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Choose Your Plan</h1>
      <div className="flex gap-4">
        <button
          onClick={() => handleSubscribe("prod_RMgkwijBXPBcX2")}
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600"
        >
          Free Plan
        </button>
        <button
          onClick={() => handleSubscribe("prod_RMgkxKtUwS05b8")}
          disabled={loading}
          className="bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-600"
        >
          Premium Plan
        </button>
      </div>
    </div>
  );
}
