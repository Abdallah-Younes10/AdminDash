import Chart from "react-apexcharts";

const MiniStatChartCard = ({
  title,
  value,
  percentage,
  series,
  categories,
}) => {
  const isPositive = percentage >= 0;

  const options = {
    chart: {
      type: "bar",
      sparkline: {
        enabled: false,
      },
      toolbar: { show: false },
    },

    plotOptions: {
      bar: {
        columnWidth: "85%",
        borderRadius: 6,
      },
    },
    xaxis: {
      categories,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      labels: {
        show: false,
      },
    },

    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#1E40AF"],
        stops: [0, 100],
      },
    },
    colors: ["#2563EB"],

    tooltip: {
      theme: "dark",
      enabled: true,
    },
  };

  return (
    <div className="items-center justify-between p-4 bg-white border border-gray-200  rounded-lg shadow-sm sm:flex dark:border-gray-700 dark:bg-gray-800">
      {/* Left */}
      <div className="w-full">
        <h3 className=" flex gap-2 text-base font-normal text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 640 640"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M64 64C46.3 64 32 78.3 32 96C32 113.7 46.3 128 64 128L136.9 128L229 404.2C206.5 421.8 192 449.2 192 480C192 533 235 576 288 576C340.4 576 383.1 534 384 481.7L586.1 414.3C602.9 408.7 611.9 390.6 606.3 373.8C600.7 357 582.6 348 565.8 353.6L363.8 421C346.6 398.9 319.9 384.5 289.8 384L197.7 107.8C188.9 81.6 164.5 64 136.9 64L64 64zM240 480C240 453.5 261.5 432 288 432C314.5 432 336 453.5 336 480C336 506.5 314.5 528 288 528C261.5 528 240 506.5 240 480zM312.5 153.3C287.3 161.5 273.5 188.6 281.7 213.8L321.3 335.5C329.5 360.7 356.6 374.5 381.8 366.3L503.5 326.7C528.7 318.5 542.5 291.4 534.3 266.2L494.8 144.5C486.6 119.3 459.5 105.5 434.3 113.7L312.5 153.3z"
            />
          </svg>
          {title}
        </h3>

        <span className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          {value}
        </span>

        <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span
            className={`flex items-center mr-1.5 ${
              isPositive
                ? "text-green-500 dark:text-green-400"
                : "text-red-500 dark:text-red-400"
            }`}
          >
            {isPositive ? "↑" : "↓"} {Math.abs(percentage)}%
          </span>
          Since last month
        </p>
      </div>

      {/* Chart */}
      <div className="w-full max-w-[240px]">
        <Chart
          options={options}
          series={[{ name: title, data: series }]}
          type="bar"
          height={140}
        />
      </div>
    </div>
  );
};

export default MiniStatChartCard;
