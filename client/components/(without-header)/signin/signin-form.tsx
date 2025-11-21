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

      const domain = window?.location?.hostname?.split(".").slice(-2).join(".");
      const protocol = window?.location?.protocol;
      const port = window?.location?.port ? `:${window.location.port}` : "";
      const tenant = response.data?.tenant?.name;

      router.push(`${protocol}//${tenant}.${domain}${port}`);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to sign in");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <InputField
          error={!!errors.email}
          type="text"
          errorMessage={errors.email?.message}
          icon={
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
          }
          props={{
            ...register("email"),
            placeholder: "hello@allgnul.com",
          }}
        />
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password <span className="text-red-500">*</span>
        </label>
        <PasswordField
          error={!!errors.password}
          errorMessage={errors.password?.message}
          props={{
            ...register("password"),
            placeholder: "••••••••",
          }}
        />
      </div>

      {/* Keep logged in & Forgot password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-slate-600 rounded cursor-pointer"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            Keep me logged in
          </label>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-11 border-blue-800 border text-lg uppercase ring-offset-1 ring-ring bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Login"}
      </Button>
    </form>
  );
}
