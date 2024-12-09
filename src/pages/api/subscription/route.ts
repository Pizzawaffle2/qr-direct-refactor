import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Stripe secret key is not defined');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

interface LineItem {
  price: string;
  quantity: number;
}

interface CheckoutSession {
  payment_method_types: string[];
  line_items: LineItem[];
  mode: 'subscription';
  success_url: string;
  cancel_url: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: 'your_price_id', // From Stripe dashboard
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/cancel`,
  });

  if (session.url) {
    res.redirect(303, session.url);
  } else {
    res.status(500).send('Session URL is null');
  }
}
