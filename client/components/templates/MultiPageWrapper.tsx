"use client";

import React, { useRef, useEffect, useState } from "react";

interface MultiPageWrapperProps {
  children: React.ReactNode;
}

export const MultiPageWrapper: React.FC<MultiPageWrapperProps> = ({
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;
    const pageHeight = 297 * 3.7795275591; // 297mm to pixels (1mm = 3.7795275591px)
    const contentHeight = content.scrollHeight;

    if (contentHeight <= pageHeight) {
      // Single page - no pagination needed
      setPages([children]);
    } else {
      // Multi-page - split content
      // For now, we'll just show the content as-is and let CSS handle it
      // A proper implementation would require more complex logic
      setPages([children]);
    }
  }, [children]);

  return (
    <div className="multi-page-container">
      {/* Hidden content for measurement */}
      <div
        ref={contentRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        {children}
      </div>

      {/* Visible pages */}
      <div className="pages-wrapper">
        {pages.map((page, index) => (
          <div
            key={index}
            className="a4-page"
            style={{
              width: "210mm",
              minHeight: "297mm",
              maxHeight: "297mm",
              margin: "0 auto 20px auto",
              padding: "0",
              boxSizing: "border-box",
              overflow: "hidden",
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            {page}
          </div>
        ))}
      </div>
    </div>
  );
};
