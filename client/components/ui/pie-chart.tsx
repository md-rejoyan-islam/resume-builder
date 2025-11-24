import React from "react";

interface PieChartProps {
  percentage: number;
  size?: number;
}

export const PieChart: React.FC<PieChartProps> = ({ percentage, size = 32 }) => {
  const radius = size / 2;
  const strokeWidth = 3;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg height={size} width={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress circle */}
        <circle
          stroke="#3b82f6"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
        />
      </svg>
      {/* Percentage text */}
      <div
        className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700"
        style={{ fontSize: `${size / 3.5}px` }}
      >
        {percentage}%
      </div>
    </div>
  );
};
