import React from "react";

export const KPISkeleton = () => {
  return (
    <div className="flex w-full overflow-hidden rounded-2xl bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm animate-pulse">
      {/* Left Panel - Skeleton */}
      <div className="w-2/5 p-4 flex flex-col justify-between bg-gray-200 dark:bg-gray-700">
        <div className="w-9 h-9 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>

      {/* Right Panel - Skeleton */}
      <div className="w-3/5 p-4 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-1/2 mt-2"></div>
        <div className="self-end h-4 bg-gray-100 dark:bg-gray-700 rounded w-1/3 mt-4"></div>
      </div>
    </div>
  );
};
