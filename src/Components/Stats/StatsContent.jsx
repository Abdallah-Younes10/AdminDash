const StatsContent = ({ items }) => {
  return (
    <ul className="divide-y divide-gray-200 space-y-3 dark:divide-gray-700">
      {items.map((item) => {
        const value = item.revenue ?? item.total;
        // const isPositive = item.change >= 0;

        return (
          <li key={item.id} className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Left */}
              <div className="flex items-center gap-3">
                {(item.image || item.avatar) && (
                  <img
                    src={item.image || item.avatar}
                    alt={item.name}
                    className="w-20 h-10 rounded object-cover"
                  />
                )}

                <div>
                  <p className="font-medium text-gray-900 truncate dark:text-white">
                    {item.name}
                  </p>
                  {item.email && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  ${value.toFixed(2)}
                </p>
                {/* 
                {item.change !== undefined && (
                  <p
                    className={`text-xs font-medium ${
                      isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isPositive ? "↑" : "↓"} {Math.abs(item.change)}%
                  </p>
                )} */}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default StatsContent;
