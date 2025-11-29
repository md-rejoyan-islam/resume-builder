"use client";

interface DisclosureLetterStepHeaderProps {
  title: string;
  description: string;
}

export function DisclosureLetterStepHeader({
  title,
  description,
}: DisclosureLetterStepHeaderProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        {title}
      </h2>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}
