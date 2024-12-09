import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Stripe from 'stripe';

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    if (session_id) {
      const fetchSession = async () => {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const session = await stripe.checkout.sessions.retrieve(session_id);
        // Handle the session data as needed
      };

      fetchSession();
    }
  }, [session_id]);

  return <div>Thank you for subscribing!</div>;
}
