"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResendActivationLinkMutation } from "@/lib/features/auth/auth-slice";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ResendActivationLinkPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [resendActivationLink, { isLoading }] =
    useResendActivationLinkMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await resendActivationLink({ email }).unwrap();
      setIsSubmitted(true);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      setError(
        err?.data?.message ||
          "Failed to resend activation link. Please try again."
      );
    }
  };

  return (
    <div>
      {!isSubmitted ? (
        <>
          {/* Mail Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-2 bg-gray-50 shadow-md dark:bg-slate-800/80 rounded-full">
              <div className="rounded-full bg-gray-100 shadow-md dark:bg-slate-800 relative z-50 p-3">
                <Mail className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Resend Activation Link
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enter your email to receive the account activation link again.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <Input
                  type="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full  h-11 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Resend Activation Link"}
            </Button>

            <Link
              href="/signin"
              className="flex items-center  relative  justify-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </form>
        </>
      ) : (
        <>
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Activation Link Sent
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                We&apos;ve sent the activation link to{" "}
                <strong className="text-gray-900 dark:text-white">
                  {email}
                </strong>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                Check your email and click the activation link. The link expires
                in 24 hours. If you don&apos;t see it, check your spam folder.
              </p>
            </div>

            <Button
              onClick={() => {
                setIsSubmitted(false);
                setEmail("");
              }}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Try another email
            </Button>

            <Link href="/signin">
              <Button
                variant="outline"
                className="w-full h-11  border-gray-300 dark:border-slate-600 text-gray-900 hover:text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Back to sign in
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
