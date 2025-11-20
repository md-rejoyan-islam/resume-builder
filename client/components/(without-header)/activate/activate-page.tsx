"use client";

import { Button } from "@/components/ui/button";
import { useActivateAccountMutation } from "@/lib/features/auth/auth-slice";
import { AlertCircle, CheckCircle, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ActivatePageProps {
  token: string;
}

export default function ActivatePage({ token }: ActivatePageProps) {
  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "idle"
  >("idle");
  const [message, setMessage] = useState("");
  const [activateAccount] = useActivateAccountMutation();

  useEffect(() => {
    if (token) {
      activateAccount({ token })
        .unwrap()
        .then(() => {
          setStatus("success");
          setMessage("Your account has been activated successfully!");
        })
        .catch((error) => {
          setStatus("error");
          setMessage(
            error?.data?.message ||
              "Failed to activate account. Token may have expired."
          );
        });
    }
  }, [token, activateAccount]);

  return (
    <div>
      {status === "loading" || status === "idle" ? (
        <>
          {/* Loading Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-2 bg-gray-50 shadow-md dark:bg-slate-800/80 rounded-full">
              <div className="rounded-full bg-gray-100 shadow-md dark:bg-slate-800 relative z-50 p-3">
                <Loader2 className="h-8 w-8 text-blue-500 dark:text-blue-400 animate-spin" />
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Activating your account
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please wait while we activate your account...
            </p>
          </div>
        </>
      ) : status === "success" ? (
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
                Account Activated!
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {message}
              </p>
            </div>

            <Link href="/signin" className="block">
              <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
                Sign In Now
              </Button>
            </Link>

            <Link href="/">
              <Button
                variant="outline"
                className="w-full h-11  border-gray-300 dark:border-slate-600 text-gray-900 hover:text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-4">
              <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Error Message */}
          <div className="text-center space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Activation Failed
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {message}
              </p>
            </div>

            <Link href="/resend-activation-link" className="block">
              <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
                <Mail className="mr-2 h-4 w-4" />
                Resend Activation Link
              </Button>
            </Link>

            <Link href="/signin">
              <Button
                variant="outline"
                className="w-full h-11  border-gray-300 dark:border-slate-600 text-gray-900 hover:text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Back to Sign In
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
