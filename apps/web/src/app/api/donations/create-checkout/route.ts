import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("Stripe secret key not configured");
  }
  return new Stripe(key, {
    apiVersion: "2025-12-15.clover",
  });
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      amount,
      donationType,
      coverFees,
      donorName,
      donorEmail,
      message,
      campaignId,
    } = body;

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: "Minimum donation is $1" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const metadata: Record<string, string> = {
      donor_name: donorName || "Anonymous",
      cover_fees: coverFees ? "true" : "false",
      donation_type: donationType,
    };

    if (message) metadata.message = message.substring(0, 500);
    if (campaignId) metadata.campaign_id = campaignId;

    const stripe = getStripe();

    if (donationType === "monthly") {
      // Create a subscription checkout session
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: donorEmail,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Monthly Donation to PawsNClaws ATX",
                description: "Recurring monthly support for Austin's animals",
              },
              unit_amount: amount,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${appUrl}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/donate`,
        metadata,
        subscription_data: {
          metadata,
        },
      });

      return NextResponse.json({ url: session.url });
    } else {
      // Create a one-time payment checkout session
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: donorEmail,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Donation to PawsNClaws ATX",
                description: "One-time donation to help Austin's animals",
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        success_url: `${appUrl}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/donate`,
        metadata,
      });

      return NextResponse.json({ url: session.url });
    }
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
