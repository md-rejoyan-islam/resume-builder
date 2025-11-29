"use client";

import { Button } from "@/components/ui/button";
import { useRegisterMutation } from "@/lib/features/auth/auth-slice";
import {
  SignupFormData,
  signupSchema,
} from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import InputField from "../form/input-field";
import PasswordField from "../form/password-field";

export default function SignUpForm() {
  const [isComplete, setIsComplete] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      // const { confirmPassword, ...payload } = data;
      await register(data).unwrap();
      toast.success(
        "Account created successfully! Check your email to verify."
      );
      reset();
      setIsComplete(true);
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Failed to create account");
    }
  };

  if (isComplete) {
    return (
      <div className="bg-background rounded-md border shadow-md p-6 sm:p-10">
        <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
          <div className="w-full   max-w-md text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-6">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Account Created!</h1>
            <p className="text-foreground/60 mb-8">
              Welcome to ResumeBuilder! Check your email to verify your account
              and get started.
            </p>
            <Link href="/signin">
              <Button className="bg-linear-to-r  relative  h-11 uppercase from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full">
                Go to Sign In
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5  relative "
        >
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <InputField
              error={!!errors.first_name}
              type="text"
              errorMessage={errors.first_name?.message}
              icon={
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              }
              props={{
                ...registerField("first_name"),
                placeholder: "John",
              }}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <InputField
              type="text"
              error={!!errors.last_name}
              errorMessage={errors.last_name?.message}
              icon={
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              }
              props={{
                ...registerField("last_name"),
                placeholder: "Doe",
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <InputField
              type="email"
              error={!!errors.email}
              errorMessage={errors.email?.message}
              icon={
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              }
              props={{
                ...registerField("email"),
                placeholder: "hello@example.com",
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <PasswordField
              error={!!errors.password}
              errorMessage={errors.password?.message}
              props={{
                ...registerField("password"),
                placeholder: "••••••••",
              }}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              At least 6 characters recommended
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full  relative  h-11 border-blue-800 border text-lg uppercase ring-offset-1 ring-ring bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-blue-600  relative  dark:text-blue-400 hover:underline font-semibold"
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
    </>
  );
}
