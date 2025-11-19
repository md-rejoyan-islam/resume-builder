"use client";

import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

const PasswordField = ({
  props,
  error,
  errorMessage,
}: {
  props: React.ComponentProps<typeof Input>;
  error: boolean;
  errorMessage?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          {...props}
          className={`pl-10 pr-10 h-11 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
            error ? "border-red-500 dark:border-red-500" : ""
          }`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
};

export default PasswordField;
