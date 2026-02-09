import React from "react";
import MiniStatChartCard from "../Charts/MiniStatChartCard";
import UserChartCard from "../Charts/UserChartCard";

export const KpiCards = () => {
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3">
        <MiniStatChartCard
          title="New products"
          value="2,340"
          percentage={12.5}
          categories={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          series={[170, 180, 164, 145, 194, 170, 155]}
        />

        <UserChartCard
          title="Users"
          value={2340}
          percentage={3.4}
          series={[1334, 2435, 1753, 1328, 1155, 1632, 1336]}
          categories={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        />

        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <div className="w-full">
            <h3 className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
              Audience by age
            </h3>
            <div className="flex items-center mb-2">
              <div className="w-16 text-sm font-medium dark:text-white">
                50+
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
                  style={{ width: "18%" }}
                />
              </div>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-16 text-sm font-medium dark:text-white">
                40+
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
                  style={{ width: "15%" }}
                />
              </div>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-16 text-sm font-medium dark:text-white">
                30+
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
                  style={{ width: "60%" }}
                />
              </div>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-16 text-sm font-medium dark:text-white">
                20+
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
                  style={{ width: "30%" }}
                />
              </div>
            </div>
          </div>
          <div id="traffic-channels-chart" className="w-full" />
        </div>
      </div>
    </>
  );
};
