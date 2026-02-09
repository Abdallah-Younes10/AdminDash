import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../Radux/DateSlice";

const RevenuebyCategory = ({
  metrics,
  range,
  ranges,
  mode = "revenue",
  isLoading = false,
}) => {
  const isDark = useSelector((state) => state.themes.isDark);
  const categoriesData = useMemo(() => metrics?.categories || [], [metrics]);
  const dispatch = useDispatch();
  const isRevenue = mode === "revenue";

  const chartSeries = useMemo(
    () =>
      categoriesData.map((c) =>
        isRevenue ? Number(c.spent.toFixed(2)) : c.orders,
      ),
    [categoriesData, isRevenue],
  );

  const chartLabels = useMemo(
    () =>
      categoriesData.map((c) =>
        c?.name ? c.name.charAt(0).toUpperCase() + c.name.slice(1) : "Unknown",
      ),
    [categoriesData],
  );

  const chartOptions = useMemo(
    () => ({
      labels: chartLabels,
      colors: [
        "#1C64F2",
        "#16BDCA",
        "#9061F9",
        "#F2933C",
        "oklch(82.8% 0.189 84.429)",
        "#001fcf",
        "#c62100",
      ],
      chart: {
        height: 500,
        width: "100%",
        type: "pie",
        fontFamily: "Inter, sans-serif",
        foreColor: isDark ? "#ffffff" : "#111827",
      },
      stroke: {
        colors: [
          isDark ? "oklch(96.7% 0.001 286.375)" : "oklch(21% 0.034 264.665)",
        ],
        width: 1,
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          donut: {
            size: "65%",
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(1)}%`,
        dropShadow: { enabled: false },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
        labels: {
          colors: isDark ? "#111827" : "#ffffff",
        },
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (val) =>
            isRevenue ? `$${val.toLocaleString()}` : `${val} orders`,
        },
      },
    }),
    [chartLabels, isDark, isRevenue],
  );

  return (
    <>
      <div className="max-w-md md:max-w-full w-full md:p-6 p-4 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <div className="flex justify-between items-start w-full">
          <div className="flex-col items-center">
            <div className="flex items-center mb-1">
              <h5 className="text-xl font-semibold text-gray-900 dark:text-white me-1">
                {isRevenue ? "Revenue" : "Orders"} by Category
              </h5>
            </div>
          </div>
        </div>
        {/* Pie Chart / Loading */}
        <div className="py-6" id="pie-chart">
          {isLoading ? (
            <div className="h-[500px] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700/20 animate-pulse rounded-lg space-y-4">
              <div className="w-64 h-64 rounded-full border-8 border-gray-100 dark:border-gray-700"></div>
              <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ) : (
            chartOptions && (
              <Chart
                key={isDark ? "dark" : "light"}
                options={chartOptions}
                series={chartSeries}
                type="pie"
                height={500}
              />
            )
          )}
        </div>

        <div className="grid grid-cols-1 items-center border-gray-200 dark:border-gray-700 border-t justify-between">
          <div className="flex justify-between items-center pt-4 md:pt-6">
            {/* Button */}
            <div className="border-gray-100 dark:border-gray-700 font-medium">
              <select
                className="px-2 py-1 text-sm rounded-md bg-transparent dark:bg-gray-700
                                 text-body focus:outline-none border border-gray-300 dark:border-gray-600"
                value={range}
                onChange={(e) => dispatch(setDate(Number(e.target.value)))}
              >
                {ranges?.title?.map((r, i) => (
                  <option key={r} value={ranges.value[i]}>
                    Last {r}
                  </option>
                ))}
              </select>
            </div>
            <a
              href="#"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 bg-transparent box-border border border-transparent hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 font-medium leading-5 rounded-lg text-sm px-3 py-2 focus:outline-none"
            >
              Traffic Report
              <svg
                className="w-4 h-4 ms-1.5 -me-0.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default RevenuebyCategory;
