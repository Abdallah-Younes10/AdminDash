import * as React from "react";

export const KPICard = ({
  icon,
  icon2,
  title,
  value,
  percentage,
  subtitle,
  badge,
  trend = "up",
  className = "",
}) => {
  const isPositive = trend != "down";

  return (
    <div
      className={`flex w-full overflow-hidden rounded-2xl bg-white border border-gray-200 dark:border-gray-700  dark:bg-gray-800 shadow-sm transition-transform duration-200 hover:scale-[1.02] ${className}`}
    >
      {/* Left Panel - Gradient */}
      <div
        className={`w-2/5 p-4 flex flex-col justify-between text-white bg-gradient-to-br ${
          trend === "up"
            ? "from-green-600 to-green-800"
            : trend === "down"
              ? "from-red-600 to-red-800"
              : "from-yellow-400 to-yellow-600"
        }`}
      >
        {icon && (
          <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            {icon}
          </div>
        )}

        {percentage !== undefined && (
          <div>
            <p className="text-3xl font-bold">
              {isPositive ? "+" : "-"}
              {Math.abs(percentage)}
            </p>
            {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
          </div>
        )}
      </div>

      {/* Right Panel - Data */}
      <div className="w-3/5 p-4 flex flex-col justify-between text-card-foreground">
        <div>
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold tracking-tight">{value >= 1000 ? `$${(value / 1000).toFixed(1)}K` : `${value}`}</p>

            {badge && (
              <span
                className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                  isPositive
                    ? "bg-green-500/20 text-green-500"
                    : "bg-red-500/20 text-red-500"
                }`}
              >
                {badge}
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground">{title}</p>
        </div>

        <button className="self-end flex gap-2 items-center text-xs text-muted-foreground hover:text-primary transition hover:text-blue-700">
          View details →{icon2}
        </button>
      </div>
    </div>
  );
};
