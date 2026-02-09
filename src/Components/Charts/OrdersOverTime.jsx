import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { setDate } from "../../Radux/DateSlice";
// import { setDate } from "../../redux/slices/dateSlice";

const getCSSVar = (name, fallback) => {
  const style = getComputedStyle(document.documentElement);
  return style.getPropertyValue(name).trim() || fallback;
};

export const OrdersOverTime = ({
  range,
  ranges,
  metrics,
  isLoading = false,
}) => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.themes.isDark);

  const chartColors = useMemo(
    () => ({
      brand: getCSSVar("--chart-brand", "#14c271"),
      secondary: getCSSVar("--chart-secondary", "#001fcf"),
      label: getCSSVar("--chart-label", isDark ? "#ffffff" : "#111827"),
      grid: getCSSVar("--chart-grid", isDark ? "#374151" : "#e5e7eb"),
    }),
    [isDark],
  );

  const chartOptions = useMemo(
    () => ({
      chart: {
        height: 400,
        toolbar: { show: false },
        fontFamily: "Inter, sans-serif",
        foreColor: chartColors.label,
      },
      stroke: {
        width: [0, 4], // 0 for bars, 4 for revenue line
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "50%",
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: metrics?.categories || [],
        labels: {
          style: {
            colors: chartColors.label,
            fontSize: "11px",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: [
        {
          title: {
            text: "Orders",
            style: { color: chartColors.brand, fontWeight: 600 },
          },
          labels: {
            style: {
              colors: chartColors.label,
            },
          },
        },
        {
          opposite: true,
          title: {
            text: "Revenue ($)",
            style: { color: chartColors.secondary, fontWeight: 600 },
          },
          labels: {
            style: {
              colors: chartColors.label,
            },
            formatter: (val) => `$${val.toLocaleString()}`,
          },
        },
      ],
      tooltip: {
        theme: "dark",
        shared: true,
        intersect: false,
      },
      grid: {
        borderColor: chartColors.grid,
        strokeDashArray: 4,
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
        fontSize: "12px",
        fontWeight: "semi-bold",
        markers: {
          width: 12,
          height: 12,
        },
      },
      colors: [chartColors.brand, chartColors.secondary],
    }),
    [metrics.categories, chartColors],
  );

  const chartSeries = useMemo(() => {
    if (!metrics?.series) return [];
    return metrics.series.map((s, i) => ({
      ...s,
      type: i === 0 ? "column" : "line",
    }));
  }, [metrics.series]);

  // if (!metrics) return null;

  return (
    <div className="max-w-md md:max-w-full w-full md:p-6 p-4 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Orders & Revenue
          </h2>
          <p className="text-sm text-gray-500">
            Performance in the last {range} days
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {isLoading ? (
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse ml-auto"></div>
            ) : (
              `$${metrics.totalRevenue?.toLocaleString()}`
            )}
          </p>
          <p className="text-sm font-medium text-gray-500">
            {isLoading ? (
              <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-20 animate-pulse mt-1 ml-auto"></div>
            ) : (
              `${metrics.totalOrders} total orders`
            )}
          </p>
        </div>
      </div>

      <div className="h-[500px]">
        {isLoading ? (
          <div className="h-full bg-gray-50 dark:bg-gray-700/20 animate-pulse rounded-lg flex items-end justify-between p-6 px-10">
            {[40, 70, 45, 90, 65, 30, 80, 50, 75, 40, 60, 85].map((h, i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-700 rounded-t w-full mx-1"
                style={{ height: `${h}%` }}
              ></div>
            ))}
          </div>
        ) : (
          <Chart
            key={`${isDark ? "dark" : "light"}-${range}`}
            options={{
              ...chartOptions,
              tooltip: {
                ...chartOptions.tooltip,
                y: {
                  formatter: (val, { seriesIndex }) => {
                    if (seriesIndex === 0) return `${val} orders`;
                    return `$${val.toLocaleString()}`;
                  },
                },
              },
            }}
            series={chartSeries}
            height={500}
          />
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 font-medium">
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
    </div>
  );
};
