"use client";

import { AlertTriangle, ArrowLeft, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-red-500/3 to-orange-500/3 dark:from-red-500/5 dark:to-orange-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center p-8 sm:p-12">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 dark:bg-red-500/30 rounded-full blur-xl animate-pulse" />
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-linear-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/25">
              <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Error Text */}
        <div className="mb-4">
          <p className="text-6xl sm:text-7xl font-extrabold leading-none bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Oops!
          </p>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-50 mt-4">
          Something went wrong
        </h1>

        <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto">
          We encountered an unexpected error while processing your request.
          Don&apos;t worry, our team has been notified.
        </p>

        {/* Error Details */}
        {error.digest && (
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Error ID:
            </span>
            <code className="text-xs font-mono text-gray-700 dark:text-gray-300">
              {error.digest}
            </code>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => reset()}
            className="group inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-xl text-white bg-linear-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <RefreshCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Dashboard
          </Link>
        </div>

        {/* Back Link */}
        <div className="mt-6">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Go back to previous page
          </button>
        </div>

        {/* Help Text */}
        <p className="mt-10 text-sm text-gray-400 dark:text-gray-500">
          If this problem persists, please{" "}
          <a
            href="mailto:support@example.com"
            className="text-red-500 dark:text-red-400 hover:underline font-medium"
          >
            contact support
          </a>
        </p>
      </div>
    </div>
  );
}
