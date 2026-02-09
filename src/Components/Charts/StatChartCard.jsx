import Chart from "react-apexcharts";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const getCSSVar = (name, fallback) => {
  const style = getComputedStyle(document.documentElement);
  return style.getPropertyValue(name).trim() || fallback;
};

const StatChartCard = ({
  title,
  value,
  percentage,
  categories,
  series,
  ranges,
  selectedRange,
  onRangeChange,
  isLoading = false,
}) => {
  const isPositive = percentage > 0;
  const isNegative = percentage < 0;

  const isDark = useSelector((state) => state.themes.isDark);

  const chartColors = useMemo(
    () => ({
      brand: getCSSVar("--chart-brand", "#14c271"),
      secondary: getCSSVar("--chart-secondary", "#001fcf"),
      label: getCSSVar("--chart-label", "#93A9FF"),
      grid: getCSSVar("--chart-grid", "#93A9FF"),
    }),
    [],
  );

  const yRange = useMemo(() => {
    const values = series?.flatMap((s) => s.data) || [];

    if (!values.length) return { min: 0, max: 0 };

    const min = Math.min(...values);
    const max = Math.max(...values);

    return {
      min: Math.floor(min * 0.8), // تقليل المساحة تحت
      max: Math.ceil(max * 1.1), // مسافة بسيطة فوق
    };
  }, [series]);

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        toolbar: { show: false },
        fontFamily: "Inter, sans-serif",
        foreColor: chartColors.label,
      },

      xaxis: {
        categories,
        labels: {
          style: {
            colors:isDark ? "black" : "white",
            fontSize: "12px",
          },
        },
        crosshairs: {
          show: true,
          stroke: {
            dashArray: 4,
            color: chartColors.label,
          },
        },
      },
      dataLabels: { enabled: false },
      yaxis: {
        min: yRange.min,
        max: yRange.max,
        labels: {
          formatter: (v) =>
            v >= 1000 ? `$${(v / 1000).toFixed(1)}K` : `$${v}`,
          style: {
            colors:isDark ? "black" : "white",
            fontSize: "12px",
          },
        },
      },

      tooltip: {
        theme: isDark ? "light" : "dark",
        style: {
          fontSize: "12px",
          color: chartColors.text,
        },
      },
      stroke: {
        width: 3,
        curve: "smooth",
      },

      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.75,
          opacityTo: 0,
        },
      },

      grid: {
        borderColor: chartColors.grid,
        strokeDashArray: 4,
      },

      markers: {
        size: 6,
        hover: { size: 8 },
      },

      legend: { show: true },
    }),
    [categories, chartColors, yRange.min, yRange.max, isDark],
  );

  const chartSeries = useMemo(
    () =>
      (series || []).map((s, i) => ({
        ...s,
        color: i === 0 ? chartColors.brand : chartColors.secondary,
      })),
    [series, chartColors],
  );

  return (
    <div className=" p-4 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h5 className="text-2xl font-bold text-heading">
            {isLoading ? (
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
            ) : value >= 1000 ? (
              `$${(value / 1000).toFixed(1)}K`
            ) : (
              `$${value}`
            )}
          </h5>
          <p className="text-body">{title}</p>
        </div>
        <div
          className={`flex items-center gap-1 px-2.5 py-0.5 font-medium ${
            isPositive
              ? "text-green-600"
              : isNegative
                ? "text-red-600"
                : "text-gray-400"
          }`}
        >
          <span className="text-2xl">
            {isPositive ? "↑" : isNegative ? "↓" : "–"}
          </span>
          {Math.abs(percentage)}%
        </div>
      </div>

      <div className="py-4 md:py-6 w-[98%] mx-auto">
        {isLoading ? (
          <div className="h-[400px] bg-gray-50 dark:bg-gray-700/20 animate-pulse rounded-lg flex items-end justify-between p-4 px-10">
            {[40, 70, 45, 90, 65, 30, 80, 50].map((h, i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-700 rounded-t w-full mx-2"
                style={{ height: `${h}%` }}
              ></div>
            ))}
          </div>
        ) : (
          <Chart
            key={`${isDark ? "dark" : "light"}-${selectedRange}`}
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={400}
          />
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-light dark:border-gray-700">
        <select
          value={selectedRange}
          onChange={(e) => onRangeChange(e.target.value)}
          className="px-2 py-1 text-sm rounded-md bg-transparent dark:bg-gray-700
               text-body focus:outline-none"
        >
          {ranges?.title?.map((r, i) => (
            <option key={r} value={ranges.value[i]}>
              Last {r}
            </option>
          ))}
        </select>

        <button
          className="flex items-center gap-1 text-sm font-medium text-fg-brand
                     hover:gap-2 transition-all"
        >
          Progress report
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default StatChartCard;
