"use client";

import { Lightbulb } from "lucide-react";

interface Tip {
  title: string;
  text: string;
}

interface DisclosureLetterTipsPanelProps {
  title: string;
  tips: Tip[];
  didYouKnow?: string;
}

export function DisclosureLetterTipsPanel({
  title,
  tips,
  didYouKnow,
}: DisclosureLetterTipsPanelProps) {
  if (tips.length === 0 && !didYouKnow) return null;

  return (
    <div className="bg-white dark:bg-card border border-border rounded-xl p-5">
      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Lightbulb className="w-4 h-4 text-amber-500" />
        {title}
      </h4>

      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="text-sm">
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {tip.title}:
            </span>{" "}
            <span className="text-slate-600 dark:text-slate-400">
              {tip.text}
            </span>
          </li>
        ))}
      </ul>

      {didYouKnow && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            <span className="font-medium text-primary">Did you know?</span>{" "}
            {didYouKnow}
          </p>
        </div>
      )}
    </div>
  );
}
