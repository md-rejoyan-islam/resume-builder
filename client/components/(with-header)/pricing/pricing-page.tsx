"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { AlertCircle, Check, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
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

  const faqs = [
    {
      q: "Can I create all document types with any plan?",
      a: "Yes! All plans include access to resumes, cover letters, disclosure letters, and all other document types.",
      status: "completed",
    },
    {
      q: "Can I cancel anytime?",
      a: "Absolutely. Cancel your subscription at any time with no penalties or hidden fees.",
      status: "pending",
    },
    {
      q: "Do you offer refunds?",
      a: "Yes, we offer a 30-day money-back guarantee on all plans.",
      status: "pending",
    },
    {
      q: "Can I upgrade/downgrade?",
      a: "Change your plan anytime and we'll automatically adjust your billing.",
      status: "completed",
    },
    {
      q: "Is there a free trial?",
      a: "Yes! Create up to 3 documents for free before choosing a plan.",
      status: "pending",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-orange-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Choose the perfect plan for your career. Save 20% with annual
              billing. All plans include access to all document types.
            </p>
          </div>

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

          {/* FAQ */}
          <div className="mt-20   max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className={clsx(
                    " dark:border-slate-700 border-gray-200 px-4 overflow-hidden data-[state=open]:bg-gray-50 dark:data-[state=open]:bg-slate-800/50 transition-colors ",
                    idx === 0 ? "rounded-t-lg border-t" : "",
                    idx === faqs.length - 1 ? "rounded-b-lg border-b" : "",
                    idx !== faqs.length - 1
                      ? "border-l border-r "
                      : "border-l border-r"
                  )}
                >
                  <AccordionTrigger className="hover:no-underline  py-4 flex items-center gap-3">
                    <div className="flex items-center gap-3 flex-1 text-left">
                      {getStatusIcon(faq.status)}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {faq.q}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4  text-gray-600 dark:text-gray-400">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
    </div>
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
    <div className="flex items-center gap-4">
      <span
        className={`text-sm font-medium ${
          !isYearly ? "text-foreground" : "text-foreground/60"
        }`}
      >
        Monthly
      </span>
      <button
        onClick={() => setIsYearly(!isYearly)}
        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
          isYearly ? "bg-primary" : "bg-secondary"
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
            isYearly ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
      <span
        className={`text-sm font-medium ${
          isYearly ? "text-foreground" : "text-foreground/60"
        }`}
      >
        Yearly <span className="text-primary text-xs ml-1">Save 20%</span>
      </span>
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
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 rounded-t-2xl text-sm font-semibold">
          Most Popular
        </div>
      )}

      <div className="p-8">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-foreground/60 mb-6">{plan.description}</p>

        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold">${price}</span>
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
            className={`w-full mb-8 ${
              plan.popular
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                : "border-primary"
            }`}
            variant={plan.popular ? "default" : "outline"}
          >
            {plan.cta}
          </Button>
        </Link>

        <div className=" gap-4 pb-4">
          {plan.features.map((feature: string, idx: number) => (
            <div key={idx} className="flex gap-3">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <span className="text-sm text-foreground/80">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
