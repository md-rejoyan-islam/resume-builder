import { ArrowLeftToLine } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center transition-colors duration-300 px-4 sm:px-6 lg:px-8">
      {/* Content Area: The Focused Center (No Card) */}
      <div className="relative z-10 max-w-xl w-full text-center p-8 sm:p-12">
        {/* Large 404 Text */}
        <div className="mb-4">
          <p className="text-[100px] sm:text-[150px] font-extrabold leading-none text-[#4f46e5] dark:text-[#818cf8] transition-colors duration-300">
            404
          </p>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-50 mt-4">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto">
          We couldn&apos;t locate the file or resource you requested. It might
          have been moved or doesn&apos;t exist.
        </p>
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          Error Code: HTTP 404
        </p>
        {/* Call to Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <ArrowLeftToLine className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
