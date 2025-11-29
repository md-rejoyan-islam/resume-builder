import PricingCards from "@/components/(with-header)/pricing/pricing-cards";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import clsx from "clsx";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

export const metadata = {
  title: "Pricing - ResumeBuilder",
  description:
    "Explore ResumeBuilder's pricing plans. Choose the perfect plan to create professional resumes and cover letters with ease.",
};

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

const Page = () => {
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
    <>
      <div className="min-h-screen ">
        <main className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Simple, Transparent{" "}
                <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Pricing
                </span>
              </h1>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Choose the perfect plan for your career. Save 20% with annual
                billing. All plans include access to all document types.
              </p>
            </div>

            <PricingCards />

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
                      " dark:border-slate-700  relative  border-gray-200 px-4 overflow-hidden data-[state=open]:bg-gray-50 dark:data-[state=open]:bg-slate-800/50 transition-colors ",
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
    </>
  );
};

export default Page;
