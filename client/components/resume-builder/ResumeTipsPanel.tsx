"use client";

import { Upload } from "lucide-react";

interface Tip {
  title: string;
  text: string;
}

interface ResumeTipsPanelProps {
  title: string;
  tips: Tip[];
  didYouKnow?: string;
}

export function ResumeTipsPanel({
  title,
  tips,
  didYouKnow,
}: ResumeTipsPanelProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-card rounded-xl border border-border p-6 ">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-blue-50 dark:bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Upload className="w-3 h-3" />
            {title}
          </div>
        </div>

        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex gap-3 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <p className="text-sm text-slate-600 dark:text-muted-foreground leading-relaxed">
                <span className="font-medium text-slate-900 dark:text-foreground">
                  {tip.title}:
                </span>{" "}
                {tip.text}
              </p>
            </div>
          ))}
        </div>

        {didYouKnow && (
          <div className="mt-8 p-4 bg-blue-50 dark:bg-primary/5 rounded-lg border border-blue-100 dark:border-primary/10">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
              Did you know?
            </h4>
            <p className="text-xs text-slate-600 dark:text-muted-foreground">
              {didYouKnow}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
