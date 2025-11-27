"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import "./resume-templates.css";

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

  // Page height in pixels (A4 aspect ratio at 600px width)
  // A4: 210mm x 297mm = ratio 1:1.414
  // 600 * 1.414 = 848.4px ≈ 848px
  const PAGE_HEIGHT = 848;
  const PAGE_NUMBER_HEIGHT = 24;
  const PAGE_TOP_PADDING = 24; // Top padding for page 2+

  // Content height per page when there are multiple pages (leave room for page number)
  const CONTENT_PER_PAGE = PAGE_HEIGHT - PAGE_NUMBER_HEIGHT;

  useEffect(() => {
    const checkOverflow = () => {
      if (measureRef.current) {
        const templateContainer = measureRef.current.firstElementChild as HTMLElement;
        if (templateContainer) {
          const height = templateContainer.scrollHeight;
          setContentHeight(height);

          // Simple calculation: if content fits in one page, show 1 page
          // Otherwise, calculate how many pages needed using CONTENT_PER_PAGE
          if (height <= PAGE_HEIGHT) {
            setPageCount(1);
          } else {
            // For multi-page, use consistent content height per page
            const calculatedPages = Math.ceil(height / CONTENT_PER_PAGE);
            setPageCount(calculatedPages);
          }
        }
      }
    };

    checkOverflow();
    const timer1 = setTimeout(checkOverflow, 100);
    const timer2 = setTimeout(checkOverflow, 500);
    const timer3 = setTimeout(checkOverflow, 1000);

    window.addEventListener('resize', checkOverflow);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [children, PAGE_HEIGHT, CONTENT_PER_PAGE]);

  // Calculate the offset for each page
  const getPageOffset = (pageIndex: number): number => {
    if (pageCount === 1) return 0;
    // For multi-page: each page shows CONTENT_PER_PAGE worth of content
    return pageIndex * CONTENT_PER_PAGE;
  };

  return (
    <div className="rt-page-wrapper">
      {/* Hidden measure container */}
      <div ref={measureRef} className="rt-measure-container">
        {children}
      </div>

      {/* Render visible pages */}
      {Array.from({ length: pageCount }, (_, pageIndex) => (
        <div
          key={pageIndex}
          className="rt-page"
          style={{
            fontFamily,
            minHeight: `${PAGE_HEIGHT}px`,
            maxHeight: `${PAGE_HEIGHT}px`,
          }}
        >
          {/* Sidebar background */}
          {sidebar && (
            <div
              className="rt-sidebar-bg"
              style={{
                [sidebar.position]: 0,
                width: sidebar.width,
                backgroundColor: sidebar.backgroundColor,
              }}
            />
          )}

          {/* Top padding overlay for page 2+ */}
          {pageIndex > 0 && (
            <div
              className="rt-top-padding-overlay"
              style={{
                height: `${PAGE_TOP_PADDING}px`,
                left: sidebar?.position === "left" ? sidebar.width : 0,
                right: sidebar?.position === "right" ? sidebar.width : 0,
              }}
            />
          )}

          {/* Content viewport */}
          <div
            className="rt-content-viewport"
            style={{
              top: pageIndex > 0 ? `${PAGE_TOP_PADDING}px` : 0,
              height: pageCount === 1
                ? `${PAGE_HEIGHT}px`
                : pageIndex > 0
                  ? `${CONTENT_PER_PAGE - PAGE_TOP_PADDING}px`
                  : `${CONTENT_PER_PAGE}px`,
            }}
          >
            <div
              className="rt-scrolling-container"
              style={{
                transform: `translateY(-${getPageOffset(pageIndex)}px)`,
                minHeight: `${Math.max(contentHeight, PAGE_HEIGHT)}px`,
              }}
            >
              {children}
            </div>
          </div>

          {/* Page number footer */}
          {pageCount > 1 && (
            <div
              className="rt-page-number"
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
