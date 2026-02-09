import React from "react";
import StatChartCard from "../Charts/StatChartCard";
import StatsCard from "../Stats/StatsCard";
import { KPICard } from "../KPI Card/KPICard";
import {
  Users,
  DollarSign,
  ShoppingCart,
  ChartNoAxesCombined,
  Percent,
  TrendingUp,
} from "lucide-react";
import { OrdersOverTime } from "../Charts/OrdersOverTime";
import RevenuebyCategory from "../Charts/RevenuebyCategory";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../Radux/DateSlice";
import { KPISkeleton } from "../KPI Card/KPISkeleton";
import { ChartSkeleton } from "../Charts/ChartSkeleton";

export const HeroHome = ({ metrics, isLoading }) => {
  // const [range, setRange] = useState(7);
  const range = useSelector((state) => state.date.value);
  const dispatch = useDispatch();
  const statsData = {
    title: "Statistics this month",

    description: {
      title: "Statistics",
      text: "Statistics is a branch of applied mathematics that involves the collection, description, analysis, and inference of conclusions from quantitative data.",
      link: {
        label: "Read more",
        href: "#",
      },
    },

    tabs: {
      products: {
        label: "Top products",
        items: (metrics.topProducts || []).map((p) => ({
          ...p,
          name: p.title,
          revenue: p.revenue,
        })),
      },

      customers: {
        label: "Top customers",
        items: (metrics.topUsers || []).map((u) => ({
          ...u,
          total: u.spent,
        })),
      },
    },

    range: [7, 30, 90],
  };
  // console.log(metrics);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-5 mb-5 mt-2">
        {isLoading ? (
          <>
            <KPISkeleton />
            <KPISkeleton />
            <KPISkeleton />
            <KPISkeleton />
            <KPISkeleton />
          </>
        ) : (
          <>
            <KPICard
              title="Total Users"
              value={metrics.user.value}
              percentage={metrics.user.change}
              subtitle={`vs last ${range}`}
              trend={metrics.user.trend}
              badge="Weekly"
              icon={<Users size={18} />}
              icon2={<ChartNoAxesCombined size={20} />}
            />

            <KPICard
              title="Revenue"
              value={metrics.revenue.value}
              percentage={metrics.revenue.change}
              subtitle={`vs last ${range} days`}
              trend={metrics.revenue.trend}
              badge="USD"
              icon={<DollarSign size={20} />}
              icon2={<ChartNoAxesCombined size={20} />}
            />

            <KPICard
              title="Orders"
              value={metrics.orders.value}
              percentage={metrics.orders.change}
              subtitle={`vs last ${range} days`}
              trend={metrics.orders.trend}
              badge="Weekly"
              icon={<ShoppingCart size={20} />}
              icon2={<ChartNoAxesCombined size={20} />}
            />

            <KPICard
              title="Conversion Rate"
              value={metrics.conversionRate.value}
              percentage={metrics.conversionRate.change}
              subtitle={`vs last ${range} days`}
              trend={metrics.conversionRate.trend}
              badge="Weekly"
              icon={<Percent size={18} />}
              icon2={<ChartNoAxesCombined size={20} />}
            />
            <KPICard
              title="AOV"
              value={metrics.aov.value}
              percentage={metrics.aov.change}
              subtitle={`vs last ${range} days`}
              trend={metrics.aov.trend}
              badge="Weekly"
              icon={<TrendingUp size={18} />}
              icon2={<ChartNoAxesCombined size={20} />}
            />
          </>
        )}
      </div>
      <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
        <StatChartCard
          title={`Revenue ${range} days`}
          value={metrics.revenue.value}
          percentage={metrics.revenue.change}
          ranges={{ title: ["week", "month", "year"], value: [7, 30, 365] }}
          selectedRange={range}
          onRangeChange={(v) => dispatch(setDate(Number(v)))}
          categories={metrics.revenueChartData.categories}
          series={metrics.revenueChartData.series}
          isLoading={isLoading}
        />
        {/*Tabs widget */}
        <StatsCard
          data={statsData}
          ranges={{ title: ["week", "month", "year"], value: [7, 30, 365] }}
          selectedRange={range}
          onRangeChange={(v) => dispatch(setDate(Number(v)))}
        />
      </div>
      {/* <KpiCards /> */}
      <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3 mt-5">
        <OrdersOverTime
          range={range}
          metrics={metrics.ordersChartData}
          ranges={{ title: ["week", "month", "year"], value: [7, 30, 365] }}
          isLoading={isLoading}
        />

        <RevenuebyCategory
          range={range}
          ranges={{ title: ["week", "month", "year"], value: [7, 30, 365] }}
          metrics={metrics}
          mode="revenue"
          isLoading={isLoading}
        />
        <RevenuebyCategory
          range={range}
          ranges={{ title: ["week", "month", "year"], value: [7, 30, 365] }}
          metrics={metrics}
          mode="orders"
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
