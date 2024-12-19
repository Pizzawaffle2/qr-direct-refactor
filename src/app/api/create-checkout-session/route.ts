// src\app\api\create-checkout-session\route.ts

import Stripe from "stripe";
import { NextResponse } from "next/server";

console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);
console.log("Base URL:", process.env.NEXT_PUBLIC_BASE_URL);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(req: Request) {
  const { priceId } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error");
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}
