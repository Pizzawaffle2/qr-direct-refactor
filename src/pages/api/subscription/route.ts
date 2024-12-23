// src/app/api/subscription/route.ts
import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import Stripe from 'stripe';

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Product and Price IDs from Stripe Dashboard
const SUBSCRIPTION_PLANS = {
  PRO: {
    productId: 'prod_RDIGmNg3n6Ifxq',
    priceId: process.env.STRIPE_PRO_PRICE_ID,
  },
  TEAM: {
    productId: process.env.STRIPE_TEAM_PRODUCT_ID,
    priceId: process.env.STRIPE_TEAM_PRICE_ID,
  }
};

export async function POST(request: Request) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { priceId } = await request.json();

    // Validate priceId exists in our plans
    const validPriceIds = Object.values(SUBSCRIPTION_PLANS).map(plan => plan.priceId);
    if (!priceId || !validPriceIds.includes(priceId)) {
      return NextResponse.json(
        { error: 'Invalid subscription plan' },
        { status: 400 }
      );
    }

    // Get or create customer
    let customerId: string;
    const customers = await stripe.customers.list({
      email: session.user.email,
      limit: 1,
    });

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email: session.user.email,
        metadata: {
          auth0Id: session.user.sub,
        },
      });
      customerId = customer.id;
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      success_url: `${request.headers.get('origin')}/dashboard?subscription=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/billing?subscription=cancelled`,
      subscription_data: {
        metadata: {
          auth0Id: session.user.sub,
          tier: priceId === SUBSCRIPTION_PLANS.PRO.priceId ? 'pro' : 'team',
        },
        trial_period_days: 14, // Optional: Add a 14-day trial
      },
      metadata: {
        tier: priceId === SUBSCRIPTION_PLANS.PRO.priceId ? 'pro' : 'team',
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const customers = await stripe.customers.list({
      email: session.user.email,
      limit: 1,
      expand: ['data.subscriptions'],
    });

    if (customers.data.length === 0) {
      return NextResponse.json({ subscription: null });
    }

    const customer = customers.data[0];
    const subscription = customer.subscriptions?.data[0];

    if (!subscription) {
      return NextResponse.json({ subscription: null });
    }

    return NextResponse.json({
      subscription: {
        id: subscription.id,
        status: subscription.status,
        priceId: subscription.items.data[0].price.id,
        tier: subscription.metadata.tier,
        interval: subscription.items.data[0].price.recurring?.interval,
        amount: subscription.items.data[0].price.unit_amount,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        trialEnd: subscription.trial_end,
      },
    });
  } catch (error) {
    console.error('Subscription fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const customers = await stripe.customers.list({
      email: session.user.email,
      limit: 1,
      expand: ['data.subscriptions'],
    });

    if (customers.data.length === 0 || !customers.data[0].subscriptions?.data[0]) {
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 404 }
      );
    }

    const subscription = customers.data[0].subscriptions.data[0];

    // Cancel at period end instead of immediate cancellation
    await stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: true,
    });

    return NextResponse.json({
      message: 'Subscription will be cancelled at the end of the billing period',
      subscription: {
        id: subscription.id,
        cancelAtPeriodEnd: true,
        currentPeriodEnd: subscription.current_period_end,
      },
    });
  } catch (error) {
    console.error('Subscription cancellation error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}