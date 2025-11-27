"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Circular Progress Component (Local to Sidebar for now, or could be shared)
const CircularProgress = ({
  value,
  size = 40,
  strokeWidth = 4,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-slate-200 dark:text-slate-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-orange-500 transition-all duration-300 ease-in-out"
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
      <span className="absolute text-[10px] font-bold text-primary">
        {value}%
      </span>
    </div>
  );
};

interface Step {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
}

interface ResumeSidebarProps {
  steps: Step[];
  currentStep: string;
  onStepChange: (stepId: string) => void;
  completedSteps: Set<string>;
  isStepAccessible: (stepId: string) => boolean;
}

export function ResumeSidebar({
  steps,
  currentStep,
  onStepChange,
  completedSteps,
  isStepAccessible,
}: ResumeSidebarProps) {
  return (
    <aside className="hidden lg:flex w-64 bg-white dark:bg-card border-r border-border flex-col h-full z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
      <div className="p-6 border-b border-border">
        <Link
          href="/resumes"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          CVHERO
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = completedSteps.has(step.id);
            const isAccessible = isStepAccessible(step.id);
            const isDisabled = !isAccessible;

            return (
              <li key={step.id}>
                <button
                  onClick={() => isAccessible && onStepChange(step.id)}
                  disabled={isDisabled}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-blue-50 text-primary dark:bg-primary/10 cursor-pointer"
                      : isDisabled
                      ? "text-slate-400 dark:text-muted-foreground/50 cursor-not-allowed opacity-60"
                      : "text-slate-600 dark:text-muted-foreground hover:bg-slate-50 dark:hover:bg-accent/10 hover:text-slate-900 dark:hover:text-foreground cursor-pointer"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border transition-colors",
                      isActive
                        ? "bg-primary text-white border-primary"
                        : isCompleted
                        ? "bg-green-500 text-white border-green-500"
                        : isDisabled
                        ? "bg-slate-100 border-slate-200 text-slate-400 dark:bg-card dark:border-border"
                        : "bg-white border-slate-200 text-slate-400 dark:bg-card dark:border-border group-hover:border-slate-300"
                    )}
                  >
                    {isDisabled ? (
                      <Lock className="w-3 h-3" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  {step.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border space-y-4">
        {/* New Preview Button */}
        <Button
          variant="outline"
          className="w-full justify-center gap-2 text-primary border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all"
        >
          <Eye className="w-4 h-4" />
          Preview
        </Button>

        <div className="bg-slate-50 dark:bg-accent/10 rounded-xl p-4 flex items-center gap-4 border border-slate-100 dark:border-border">
          <CircularProgress value={55} size={48} />
          <div>
            <span className="text-xs font-semibold text-muted-foreground block">
              Profile Completion
            </span>
            <span className="text-sm font-bold text-primary">Good</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
