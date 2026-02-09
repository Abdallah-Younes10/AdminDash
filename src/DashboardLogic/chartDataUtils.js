import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

/**
 * Groups data by time period and returns arrays suitable for charting
 * @param {Array} items - Array of items with createdAt and total/value fields
 * @param {number} days - Number of days to look back (7, 30, 90, 365)
 * @param {string} valueKey - The key to sum (e.g., 'total' for revenue)
 * @returns {Object} { categories: string[], data: number[] }
 */
export const groupByDay = (items, days, valueKey = "total") => {
  const now = dayjs();
  const startDate = now.subtract(days, "day");

  // Create a map with all dates initialized to 0
  const dateMap = {};
  for (let i = 0; i < days; i++) {
    const date = startDate.add(i + 1, "day").format("YYYY-MM-DD");
    dateMap[date] = 0;
  }

  // Sum values by date
  items.forEach((item) => {
    const itemDate = dayjs(item.createdAt).format("YYYY-MM-DD");
    if (Object.hasOwn(dateMap, itemDate)) {
      dateMap[itemDate] += item[valueKey] || 0;
    }
  });

  // Convert to arrays
  const sortedDates = Object.keys(dateMap).sort();
  const categories = sortedDates.map((date) => dayjs(date).format("DD MMM"));
  const data = sortedDates.map((date) => Number(dateMap[date].toFixed(2)));

  return { categories, data };
};

/**
 * Groups data by week and returns arrays suitable for charting
 * @param {Array} items - Array of items with createdAt and total/value fields
 * @param {number} weeks - Number of weeks to look back
 * @param {string} valueKey - The key to sum (e.g., 'total' for revenue)
 * @returns {Object} { categories: string[], data: number[] }
 */
export const groupByWeek = (items, weeks = 12, valueKey = "total") => {
  const now = dayjs();
  const startDate = now.subtract(weeks, "week");

  // Create a map with all weeks initialized to 0
  const weekMap = {};
  for (let i = 0; i < weeks; i++) {
    const weekStart = startDate.add(i + 1, "week").startOf("week");
    const weekKey = weekStart.format("YYYY-[W]WW");
    weekMap[weekKey] = { label: weekStart.format("DD MMM"), value: 0 };
  }

  // Sum values by week
  items.forEach((item) => {
    const itemWeek = dayjs(item.createdAt).startOf("week").format("YYYY-[W]WW");
    if (Object.hasOwn(weekMap, itemWeek)) {
      weekMap[itemWeek].value += item[valueKey] || 0;
    }
  });

  // Convert to arrays
  const sortedWeeks = Object.keys(weekMap).sort();
  const categories = sortedWeeks.map((week) => weekMap[week].label);
  const data = sortedWeeks.map((week) =>
    Number(weekMap[week].value.toFixed(2)),
  );

  return { categories, data };
};

/**
 * Groups data by month and returns arrays suitable for charting
 * @param {Array} items - Array of items with createdAt and total/value fields
 * @param {number} months - Number of months to look back
 * @param {string} valueKey - The key to sum (e.g., 'total' for revenue)
 * @returns {Object} { categories: string[], data: number[] }
 */
export const groupByMonth = (items, months = 12, valueKey = "total") => {
  const now = dayjs();
  const startDate = now.subtract(months, "month");

  // Create a map with all months initialized to 0
  const monthMap = {};
  for (let i = 0; i < months; i++) {
    const monthStart = startDate.add(i + 1, "month").startOf("month");
    const monthKey = monthStart.format("YYYY-MM");
    monthMap[monthKey] = { label: monthStart.format("MMM YYYY"), value: 0 };
  }

  // Sum values by month
  items.forEach((item) => {
    const itemMonth = dayjs(item.createdAt).format("YYYY-MM");
    if (Object.hasOwn(monthMap, itemMonth)) {
      monthMap[itemMonth].value += item[valueKey] || 0;
    }
  });

  // Convert to arrays
  const sortedMonths = Object.keys(monthMap).sort();
  const categories = sortedMonths.map((month) => monthMap[month].label);
  const data = sortedMonths.map((month) =>
    Number(monthMap[month].value.toFixed(2)),
  );

  return { categories, data };
};

/**
 * Generates chart-ready data based on the range
 * @param {Array} carts - Cart data with createdAt and total
 * @param {number} rangeDays - 7, 30, 90, or 365 days
 * @returns {Object} { categories: string[], series: Array }
 */
export const generateRevenueChartData = (carts, rangeDays = 30) => {
  let chartData;

  if (rangeDays <= 30) {
    // Daily breakdown for week/month view
    chartData = groupByDay(carts, rangeDays, "total");
  } else if (rangeDays <= 90) {
    // Weekly breakdown for 3-month view
    chartData = groupByWeek(carts, Math.ceil(rangeDays / 7), "total");
  } else {
    // Monthly breakdown for year view
    chartData = groupByMonth(carts, 12, "total");
  }

  return {
    categories: chartData.categories,
    series: [
      {
        name: "Revenue",
        data: chartData.data,
      },
    ],
  };
};

/**
 * Generates order count chart data based on the range
 * @param {Array} carts - Cart data with createdAt
 * @param {number} rangeDays - 7, 30, 90, or 365 days
 * @returns {Object} { categories: string[], series: Array }
 */
export const generateOrdersChartData = (carts, rangeDays = 30) => {
  // Add a 'count' property to each cart for counting
  const cartsWithCount = carts.map((cart) => ({ ...cart, count: 1 }));

  let countData;
  let revenueData;

  if (rangeDays <= 30) {
    countData = groupByDay(cartsWithCount, rangeDays, "count");
    revenueData = groupByDay(cartsWithCount, rangeDays, "total");
  } else if (rangeDays <= 90) {
    const weeks = Math.ceil(rangeDays / 7);
    countData = groupByWeek(cartsWithCount, weeks, "count");
    revenueData = groupByWeek(cartsWithCount, weeks, "total");
  } else {
    countData = groupByMonth(cartsWithCount, 12, "count");
    revenueData = groupByMonth(cartsWithCount, 12, "total");
  }

  return {
    categories: countData.categories,
    series: [
      {
        name: "Orders",
        data: countData.data,
      },
      {
        name: "Revenue",
        data: revenueData.data,
      },
    ],
    totalOrders: countData.data.reduce((sum, val) => sum + val, 0),
    totalRevenue: revenueData.data.reduce((sum, val) => sum + val, 0),
  };
};
