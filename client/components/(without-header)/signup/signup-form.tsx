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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* First Name */}
      <div>
        <label className="block text-sm font-medium mb-2">First Name</label>
        <InputField
          error={!!errors.first_name}
          errorMessage={errors.first_name?.message}
          icon={
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
          }
          props={{ ...registerField("first_name") }}
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium mb-2">Last Name</label>
        <InputField
          error={!!errors.last_name}
          errorMessage={errors.last_name?.message}
          icon={
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
          }
          props={{ ...registerField("last_name") }}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">Email Address</label>
        <InputField
          error={!!errors.email}
          errorMessage={errors.email?.message}
          icon={
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
          }
          props={{ ...registerField("email") }}
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Phone (Optional)
        </label>
        <InputField
          error={!!errors.phone}
          errorMessage={errors.phone?.message}
          icon={
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
          }
          props={{ ...registerField("phone") }}
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <PasswordField
          error={!!errors.password}
          errorMessage={errors.password?.message}
          props={{ ...registerField("password") }}
        />

        <p className="text-xs text-foreground/60 mt-1">
          At least 6 characters recommended
        </p>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Confirm Password
        </label>
        <PasswordField
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          props={{ ...registerField("confirmPassword") }}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
}
