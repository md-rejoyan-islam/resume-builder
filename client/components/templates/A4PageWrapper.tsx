import React from "react";

interface A4PageWrapperProps {
  children: React.ReactNode;
}

export const A4PageWrapper: React.FC<A4PageWrapperProps> = ({ children }) => {
  return (
    <div
      className="a4-page"
      style={{
        width: "210mm",
        height: "297mm",
        margin: "0 auto 20px auto",
        padding: "0",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "visible",
        pageBreakAfter: "always",
        pageBreakInside: "avoid",
        breakAfter: "page",
      }}
    >
      {children}
    </div>
  );
};
