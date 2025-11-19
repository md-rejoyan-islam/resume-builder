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
      const { confirmPassword, ...payload } = data;
      await register(payload).unwrap();
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
      <div className="min-h-screen bg-background">
        <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-64px)]">
          <div className="w-full max-w-md text-center">
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
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* First Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          First Name <span className="text-red-500">*</span>
        </label>
        <InputField
          error={!!errors.first_name}
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
        className="w-full h-11 border-blue-800 border text-lg uppercase ring-offset-1 ring-ring bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
}
