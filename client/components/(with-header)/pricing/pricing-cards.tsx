"use client";

import { Button } from "@/components/ui/button";
import { Check, CornerLeftDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingCards() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 9,
      yearlyPrice: 90,
      description: "Perfect for getting started",
      features: [
        "3 Resume templates",
        "2 Cover letter templates",
        "Basic customization",
        "Email support",
        "1 GB storage",
        "Basic disclosure letters",
        "PDF download only",
      ],
      popular: false,
      cta: "Get Started",
    },
    {
      name: "Professional",
      monthlyPrice: 29,
      yearlyPrice: 290,
      description: "Best for job seekers",
      features: [
        "All document types (6+)",
        "Unlimited templates",
        "AI-powered suggestions",
        "Priority email support",
        "10 GB storage",
        "Advanced customization",
        "PDF + Word export",
        "Analytics dashboard",
        "Interview prep guides",
        "Collaboration features",
      ],
      popular: true,
      cta: "Get Started",
    },
    {
      name: "Individual",
      monthlyPrice: 49,
      yearlyPrice: 490,
      description: "For professionals & freelancers",
      features: [
        "Everything in Professional",
        "Personal domain",
        "Portfolio showcase",
        "50 GB storage",
        "Priority phone support",
        "Advanced analytics",
        "Custom branding",
        "Multiple portfolios",
        "Client testimonials page",
        "Advanced export options",
        "Premium templates",
      ],
      popular: false,
      cta: "Get Started",
    },
  ];

  return (
    <>
      {/* Toggle Billing */}
      <div className="flex justify-center mb-12">
        <BillingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} isYearly={isYearly} />
        ))}
      </div>
    </>
  );
}

function BillingToggle({
  isYearly,
  setIsYearly,
}: {
  isYearly: boolean;
  setIsYearly: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-4 relative">
      <span
        className={`text-sm font-medium ${
          !isYearly ? "text-foreground" : "text-foreground/60"
        }`}
      >
        Monthly
      </span>
      <button
        onClick={() => setIsYearly(!isYearly)}
        className={`relative inline-flex h-8 cursor-pointer w-14 items-center rounded-full transition-colors ${
          isYearly ? "bg-primary" : "bg-secondary"
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
            isYearly ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
      <div className="relative">
        <span
          className={`text-sm font-medium ${
            isYearly ? "text-foreground" : "text-foreground/60"
          }`}
        >
          Yearly
        </span>
      </div>
      <div className="absolute -right-[90px] -top-[31px] text-xs vdplx hidden items-center pnlaa sm:flex">
        <CornerLeftDown className="h-4 w-4 text-blue-600 mt-3 mr-0.5" />
        <span className="badge badge-soft badge-primary mb-2 bg-blue-100/80 text-blue-600 px-2 rounded-md py-1 dark:bg-blue-900/30 dark:text-blue-400">
          Save up to 10%
        </span>
      </div>
    </div>
  );
}

function PricingCard({
  plan,
  isYearly,
}: {
  plan: {
    name: string;
    monthlyPrice: number;
    yearlyPrice: number;
    description: string;
    features: string[];
    popular: boolean;
    cta: string;
  };
  isYearly: boolean;
}) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const period = isYearly ? "year" : "month";

  return (
    <div
      className={`rounded-2xl border transition-all ${
        plan.popular
          ? "border-primary bg-card shadow-lg scale-105"
          : "border-border bg-card hover:border-primary/50"
      }`}
    >
      {plan.popular && (
        <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-t-2xl  font-semibold">
          Most Popular
        </div>
      )}

      <div className="p-8">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-foreground/60 mb-6">{plan.description}</p>

        <div className="mb-6">
          <div className="flex items-baseline relative gap-2">
            <span className="text-lg absolute top-0 font-medium text-blue-600">
              $
            </span>
            <span className="text-5xl font-bold ml-4 text-blue-600">
              {price}
            </span>
            <span className="text-foreground/60">/{period}</span>
          </div>
          {isYearly && plan.monthlyPrice && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
              Save ${(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(0)}
              /year
            </p>
          )}
        </div>

        <Link href="/checkout" className="w-full">
          <Button
            className={`w-full mb-8 h-11 uppercase  hover:bg-blue-600 dark:hover:bg-blue-600 dark:border-primary ${
              plan.popular
                ? "bg-linear-to-r   from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                : "border-primary"
            }`}
            variant={plan.popular ? "default" : "outline"}
          >
            {plan.cta}
          </Button>
        </Link>

        <div className=" space-y-3 pb-4">
          {plan.features.map((feature: string, idx: number) => (
            <div key={idx} className="flex gap-3">
              <Check className="h-5 w-5 bg-green-100/80 border border-green-200 p-1 rounded-full text-green-600 dark:text-green-400 shrink-0 mt-0.5 dark:bg-green-900/30 dark:border-green-700/30" />
              <span className="text-sm text-foreground/80">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
