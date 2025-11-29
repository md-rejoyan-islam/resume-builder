"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loadStripe } from "@stripe/stripe-js";

import { Check, Lock, ShoppingCart } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function CheckoutContent() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setIsComplete(true);
    }
  }, [searchParams]);

  const plan = {
    name: "Professional",
    price: 29,
    period: "month",
    features: [
      "Unlimited resume templates",
      "All document types",
      "Advanced customization",
      "Priority support",
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planName: plan.name,
          planPrice: plan.price,
          planPeriod: plan.period,
          planId: "professional",
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      if (stripe && data.sessionId) {
        // const { error } = await stripe.redirectToCheckout({
        //   sessionId: data.sessionId,
        // });
        // if (error) {
        //   setError(error.message || "An error occurred");
        // }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsProcessing(false);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-64px)]">
          <div className="w-full max-w-md text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-6">
                <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Purchase Successful!</h1>
            <p className="text-foreground/60 mb-8">
              Your subscription is now active. Check your email for
              confirmation.
            </p>
            <Button
              onClick={() => (window.location.href = "/")}
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full"
            >
              Back to Home
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-card rounded-2xl border border-border p-8 h-fit">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0 h-12 w-12 rounded-lg bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{plan.name} Plan</h3>
                  <p className="text-sm text-foreground/60">
                    {plan.period}ly subscription
                  </p>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-foreground/80">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Subtotal</span>
                <span>${plan.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Tax (estimated)</span>
                <span>${(plan.price * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-3 border-t border-border">
                <span>Total</span>
                <span>${(plan.price * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <h2 className="text-xl font-bold mb-6">Checkout</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Stripe Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-300">
                  <strong>Test Card:</strong> Use 4242 4242 4242 4242 with any
                  future expiry date and any 3-digit CVC to test the payment.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Card Details
                </label>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-900 dark:text-blue-300">
                    Stripe payment form will appear here. Click &quot;Pay
                    Now&quot; to proceed to Stripe Checkout.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
                disabled={isProcessing}
              >
                <Lock className="h-4 w-4 mr-2" />
                {isProcessing
                  ? "Processing..."
                  : `Pay $${(plan.price * 1.1).toFixed(2)}`}
              </Button>

              <p className="text-xs text-foreground/60 text-center">
                Your payment is secure and encrypted with SSL. You will be
                redirected to Stripe.
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
