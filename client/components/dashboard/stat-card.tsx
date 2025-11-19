"use client";

import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  className?: string;
}

export function StatCard({
  icon,
  title,
  value,
  change,
  className,
}: StatCardProps) {
  return (
    <div
      className={`bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all ${
        className || ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {change && (
            <p
              className={`text-xs mt-2 font-medium ${
                change.type === "increase"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {change.type === "increase" ? "↑" : "↓"} {change.value}% from last
              month
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}
