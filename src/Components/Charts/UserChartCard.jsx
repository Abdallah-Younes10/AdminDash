import Chart from "react-apexcharts";
import { useMemo } from "react";

const UserChartCard = ({ title, value, percentage, series, categories }) => {
  const isPositive = percentage >= 0;

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        sparkline: { enabled: true },
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
          borderRadius: 4,
        },
      },
      colors: ["#2563EB"],
      xaxis: {
        categories,
      },
      tooltip: {
        theme: "dark",
      },
    }),
    [categories],
  );

  return (
    <div className="flex items-center justify-between p-4 bg-white border-gray-200  border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {/* LEFT */}
      <div className="w-full">
        <h3 className="flex gap-2 text-base font-normal text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 640 640"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z"
            />
          </svg>
          {title}
        </h3>

        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {value.toLocaleString()}
        </span>

        <p className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
          <span
            className={`flex items-center mr-1.5 ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPositive ? "▲" : "▼"} {Math.abs(percentage)}%
          </span>
          Since last month
        </p>
      </div>

      {/* RIGHT */}
      <div className="w-full">
        <Chart
          options={chartOptions}
          series={[{ name: title, data: series }]}
          type="bar"
          height={140}
        />
      </div>
    </div>
  );
};

export default UserChartCard;
