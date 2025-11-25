"use client";

interface ResumeStepHeaderProps {
  title: string;
  description: string;
}

export function ResumeStepHeader({ title, description }: ResumeStepHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-foreground mb-2 tracking-tight">
        {title}
      </h1>
      <p className="text-slate-600 dark:text-muted-foreground text-lg">
        {description}
      </p>
    </div>
  );
}
