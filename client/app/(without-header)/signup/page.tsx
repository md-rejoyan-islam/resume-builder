import SignUpForm from "@/components/(without-header)/signup/signup-form";
import { User } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <main className="flex items-center justify-center w-full">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-slate-800">
            {/* User Icon */}
            <div className="flex justify-center mb-6">
              <div className="p-2 bg-gray-50 shadow-md dark:bg-slate-800/80 rounded-full">
                <div className="rounded-full bg-gray-100 shadow-md dark:bg-slate-800 relative z-50 p-3">
                  <User className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            </div>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Create your account
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join thousands of professionals today.
              </p>
            </div>
            {/* Form */}
            <SignUpForm />
            {/* Footer */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Sign in
              </Link>
            </p>
            {/* Terms
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-4">
              By signing up, you agree to our Terms of Service and Privacy
              Policy
            </p> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
