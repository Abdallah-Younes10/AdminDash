import { useMemo } from "react";
import {
  calculateRevenueKPI,
  calculateOrdersKPI,
  calculateAOV,
  calculateUsersKPI,
  getTopProductsByRange,
  getTopUsersByRange,
  getCategories,
  getTransactionsByRange,
} from "../../DashboardLogic/DataCalculations";
import {
  generateRevenueChartData,
  generateOrdersChartData,
} from "../../DashboardLogic/chartDataUtils";

// Map range names to days for chart data generation
const rangeToDays = {
  week: 7,
  month: 30,
  year: 365,
};

export const useDashboardMetrics = ({
  carts = [],
  users = [],
  products = [],
  range,
}) => {
  return useMemo(() => {
    const topProducts = getTopProductsByRange(carts, range);
    const topUsers = getTopUsersByRange(carts, users, range);

    const revenue = calculateRevenueKPI(carts, range);
    const orders = calculateOrdersKPI(carts, range);
    const user = calculateUsersKPI(users, range);
    const categories = getCategories(carts, products, range);
    const transactions = getTransactionsByRange(carts, users, range);

    const aov = {
      value: calculateAOV(revenue.value, orders.value),
      trend: revenue.trend,
    };

    const conversionRate = {
      value: users.length
        ? ((orders.value / users.length) * 100).toFixed(2)
        : 0,
    };

    // Generate detailed chart data for StatChartCard
    const days = typeof range === "number" ? range : rangeToDays[range] || 30;
    const revenueChartData = generateRevenueChartData(carts, days);
    const ordersChartData = generateOrdersChartData(carts, days);

    return {
      user,
      revenue,
      orders,
      aov,
      conversionRate,
      revenueChartData,
      ordersChartData,
      topProducts,
      topUsers,
      categories,
      transactions,
    };
  }, [carts, users, products, range]);
};
