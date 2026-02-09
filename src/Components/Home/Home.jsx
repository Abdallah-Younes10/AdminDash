import React from "react";
import { HeroHome } from "./HeroHome";
import { useSelector } from "react-redux";
import { TransTable } from "../TransactionsTable/TransTable";
import { useDashboardData } from "../Hooks/useDashboardData";
import { useDashboardMetrics } from "../Hooks/useDashboardMetrics";
export const Home = () => {
  const { isOpen: openIcons } = useSelector((state) => state.iconsView);

  // ✅ Time range controller
  const selectedRange = useSelector((state) => state.date.value);

  // ✅ Data from React Query (cached)
  const { users, products, carts, isLoading } = useDashboardData();

  const metrics = useDashboardMetrics({
    users,
    products,
    carts,
    range: selectedRange,
  });
  // console.log(users, products, carts);

  const fields = [
    "Customer",
    "Date",
    "Amount",
    "Ref Number",
    "Method",
    "Status",
  ];

  return (
    <div
      className={`p-4 transition-all duration-300 ${
        openIcons ? "sm:ml-64" : "md:ml-25"
      } mt-30 lg:mt-20 `}
    >
      <HeroHome metrics={metrics} isLoading={isLoading} />
      <TransTable
        transactions={metrics.transactions}
        header={"Latest Transactions"}
        title={"Real-time sales activity for the selected period"}
        fields={fields}
        isLoading={isLoading}
      />
    </div>
  );
};
