import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planName, planPrice, planPeriod, planId } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${planName} Plan - ${
                planPeriod.charAt(0).toUpperCase() + planPeriod.slice(1)
              }ly`,
              description: `Subscribe to ${planName} plan for professional document creation`,
            },
            unit_amount: Math.round(planPrice * 100),
            recurring: {
              interval: planPeriod === "month" ? "month" : "year",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/checkout?success=true`,
      cancel_url: `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/pricing`,
      customer_email: body.email,
      billing_address_collection: "required",
      metadata: {
        planName,
        planId,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      sessionUrl: session.url,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
