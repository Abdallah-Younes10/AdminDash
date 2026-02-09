import React from "react";

export const ChartSkeleton = ({ height = 400 }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2 w-1/3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </div>

      {/* Chart Area Skeleton */}
      <div
        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-end justify-between p-6 overflow-hidden"
        style={{ height: `${height}px` }}
      >
        {[40, 70, 45, 90, 65, 30, 80, 50, 75, 40, 60, 85].map((h, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-700 rounded-t w-full mx-1"
            style={{ height: `${h}%` }}
          ></div>
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
        <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded w-24"></div>
        <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded w-32"></div>
      </div>
    </div>
  );
};
