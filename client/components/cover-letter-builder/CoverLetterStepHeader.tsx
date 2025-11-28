"use client";

interface CoverLetterStepHeaderProps {
  title: string;
  description: string;
}

export function CoverLetterStepHeader({
  title,
  description,
}: CoverLetterStepHeaderProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        {title}
      </h2>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}
