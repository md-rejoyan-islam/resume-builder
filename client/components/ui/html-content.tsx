"use client";

import { cn } from "@/lib/utils";
import "./html-content.css";

interface HtmlContentProps {
  html: string;
  className?: string;
}

/**
 * Safely renders HTML content from rich text editors.
 * Includes styles for lists, paragraphs, and other common HTML elements.
 */
export function HtmlContent({ html, className }: HtmlContentProps) {
  if (!html) return null;

  return (
    <div
      className={cn("html-content", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
