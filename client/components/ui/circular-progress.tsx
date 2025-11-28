"use client";

import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  labelClassName?: string;
  trackClassName?: string;
  progressClassName?: string;
}

export function CircularProgress({
  value,
  size = 40,
  strokeWidth = 4,
  showLabel = true,
  labelClassName,
  trackClassName,
  progressClassName,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="transform -rotate-90 w-full h-full">
        {/* Track circle */}
        <circle
          className={cn("text-slate-200 dark:text-slate-700", trackClassName)}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={cn(
            "text-orange-500 transition-all duration-300 ease-in-out",
            progressClassName
          )}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {showLabel && (
        <span
          className={cn(
            "absolute text-[10px] font-bold text-primary",
            labelClassName
          )}
        >
          {value}%
        </span>
      )}
    </div>
  );
}
