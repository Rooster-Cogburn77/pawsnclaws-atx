import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabase } from "@/lib/supabase";

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
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createServerSupabase();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata || {};

        // Record the donation
        await supabase.from("donations").insert({
          amount: session.amount_total,
          donation_type: metadata.donation_type === "monthly" ? "recurring" : "one_time",
          payment_method: "stripe",
          stripe_payment_id: session.payment_intent as string,
          stripe_subscription_id: session.subscription as string,
          donor_name: metadata.donor_name,
          donor_email: session.customer_email,
          is_anonymous: metadata.donor_name === "Anonymous",
          message: metadata.message,
          fee_covered: metadata.cover_fees === "true",
          campaign_id: metadata.campaign_id || null,
          status: "completed",
        });

        console.log("Donation recorded:", session.id);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const metadata = subscription.metadata || {};

        // Upsert subscription record
        await supabase.from("subscriptions").upsert(
          {
            stripe_subscription_id: subscription.id,
            stripe_customer_id: subscription.customer as string,
            amount: subscription.items.data[0]?.price.unit_amount || 0,
            interval: subscription.items.data[0]?.price.recurring?.interval || "month",
            status: subscription.status === "active" ? "active" : "paused",
            tier: metadata.tier,
            colony_id: metadata.colony_id || null,
            animal_id: metadata.animal_id || null,
          },
          { onConflict: "stripe_subscription_id" }
        );

        console.log("Subscription updated:", subscription.id);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        await supabase
          .from("subscriptions")
          .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
          .eq("stripe_subscription_id", subscription.id);

        console.log("Subscription cancelled:", subscription.id);
        break;
      }

      case "invoice.payment_succeeded": {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const invoice = event.data.object as any;
        const subscriptionId = invoice.subscription;

        // Record recurring donation payment
        if (subscriptionId) {
          await supabase.from("donations").insert({
            amount: invoice.amount_paid,
            donation_type: "recurring",
            payment_method: "stripe",
            stripe_payment_id: invoice.payment_intent,
            stripe_subscription_id: subscriptionId,
            donor_email: invoice.customer_email,
            status: "completed",
          });

          console.log("Recurring donation recorded:", invoice.id);
        }
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;

        await supabase
          .from("donations")
          .update({ status: "refunded" })
          .eq("stripe_payment_id", charge.payment_intent);

        console.log("Donation refunded:", charge.id);
        break;
      }
    }
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
