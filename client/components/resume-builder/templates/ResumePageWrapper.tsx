"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface SidebarConfig {
  position: "left" | "right";
  width: string; // e.g., "35%" or "210px"
  backgroundColor: string;
}

interface ResumePageWrapperProps {
  children: ReactNode;
  fontFamily: string;
  accentColor: string;
  sidebar?: SidebarConfig; // Optional sidebar background configuration
}

export function ResumePageWrapper({ children, fontFamily, accentColor, sidebar }: ResumePageWrapperProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState<number>(1);
  const [contentHeight, setContentHeight] = useState<number>(0);

  // Page height in pixels (approximate for 8.5x11 aspect ratio at max-w-[600px])
  const PAGE_HEIGHT = 776; // 600 * 11 / 8.5 ≈ 776px
  const CONTENT_HEIGHT = PAGE_HEIGHT - 32; // Leave room for page number
  const PAGE_TOP_PADDING = 24; // Top padding for page 2 and beyond

  useEffect(() => {
    const checkOverflow = () => {
      if (measureRef.current) {
        // Find the actual content inside the template (skip the template's outer container)
        const templateContainer = measureRef.current.firstElementChild as HTMLElement;
        if (templateContainer) {
          const height = templateContainer.scrollHeight;
          setContentHeight(height);
          const calculatedPages = Math.ceil(height / CONTENT_HEIGHT);
          setPageCount(Math.max(1, calculatedPages));
        }
      }
    };

    // Check on mount and after delays for fonts/images to load
    checkOverflow();
    const timer1 = setTimeout(checkOverflow, 100);
    const timer2 = setTimeout(checkOverflow, 500);
    const timer3 = setTimeout(checkOverflow, 1000);

    // Also check on window resize
    window.addEventListener('resize', checkOverflow);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [children, CONTENT_HEIGHT]);

  return (
    <div className="flex flex-col gap-8 relative">
      {/* Hidden measure container - full height to measure actual content */}
      <div
        ref={measureRef}
        className="absolute left-[-9999px] top-0 opacity-0 pointer-events-none overflow-visible"
        style={{ width: "600px" }}
      >
        {children}
      </div>

      {/* Render visible pages */}
      {Array.from({ length: pageCount }, (_, pageIndex) => (
        <div
          key={pageIndex}
          className="bg-white shadow-lg mx-auto max-w-[600px] relative overflow-hidden"
          style={{
            aspectRatio: "8.5/11",
            fontFamily,
            minHeight: `${PAGE_HEIGHT}px`,
            maxHeight: `${PAGE_HEIGHT}px`,
          }}
        >
          {/* Full-height sidebar background - renders behind content */}
          {sidebar && (
            <div
              className="absolute top-0 bottom-0"
              style={{
                [sidebar.position]: 0,
                width: sidebar.width,
                backgroundColor: sidebar.backgroundColor,
              }}
            />
          )}

          {/* Top padding overlay for page 2+ - creates visual margin at top */}
          {pageIndex > 0 && (
            <div
              className="absolute top-0 z-10"
              style={{
                height: `${PAGE_TOP_PADDING}px`,
                // Only cover the non-sidebar portion
                left: sidebar?.position === "left" ? sidebar.width : 0,
                right: sidebar?.position === "right" ? sidebar.width : 0,
                backgroundColor: "white",
              }}
            />
          )}

          {/* Content viewport - clips to page height */}
          <div
            className="absolute left-0 right-0 overflow-hidden"
            style={{
              top: pageIndex > 0 ? `${PAGE_TOP_PADDING}px` : 0,
              height: pageIndex > 0 ? `${CONTENT_HEIGHT - PAGE_TOP_PADDING}px` : `${CONTENT_HEIGHT}px`,
            }}
          >
            {/* Scrolling container that positions content for each page */}
            <div
              className="relative"
              style={{
                transform: `translateY(-${pageIndex * CONTENT_HEIGHT}px)`,
                minHeight: `${Math.max(contentHeight, CONTENT_HEIGHT)}px`,
              }}
            >
              {children}
            </div>
          </div>

          {/* Page number footer */}
          {pageCount > 1 && (
            <div
              className="absolute bottom-2 left-0 right-0 text-center text-xs z-20"
              style={{ color: `${accentColor}80` }}
            >
              Page {pageIndex + 1} of {pageCount}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
