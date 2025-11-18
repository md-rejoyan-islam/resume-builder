"use client";

import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/lib/features/auth/auth-slice";
import {
  SigninFormData,
  signinSchema,
} from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import InputField from "../form/input-field";
import PasswordField from "../form/password-field";

export default function SignInForm() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      const response = await login(data).unwrap();
      toast.success("Logged in successfully!");
      // Store tokens if needed
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      router.push("/dashboard");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to sign in");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">Email Address</label>

        <InputField
          error={!!errors.email}
          errorMessage={errors.email?.message}
          icon={
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
          }
          props={{ ...register("email") }}
        />
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">Password</label>
        </div>
        <PasswordField
          error={!!errors.password}
          errorMessage={errors.password?.message}
          props={{ ...register("password") }}
        />
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded "
            />
            <label
              htmlFor="remember-me"
              className="ml-3 block text-sm text-slate-900 dark:text-slate-300"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline font-medium"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
