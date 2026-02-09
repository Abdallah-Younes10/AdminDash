import { useState } from "react";
import StatsHeader from "./StatsHeader";
import StatsTabs from "./StatsTabs";
import StatsContent from "./StatsContent";
import StatsFooter from "./StatsFooter";

const StatsCard = ({ data, ranges, selectedRange, onRangeChange }) => {
  const [activeTab, setActiveTab] = useState("products");
  const [showInfo, setShowInfo] = useState(false);

  // حساب الـ percentage لو موجود في data
  const items = data.tabs[activeTab].items;
  const percentage =
    items && items.length > 1
      ? (((items[0].revenue || items[0].total) -
          (items[items.length - 1].revenue || items[items.length - 1].total)) /
          (items[items.length - 1].revenue || items[items.length - 1].total)) *
        100
      : 0;
  const isPositive = percentage >= 0;

  return (
    <div className="p-4 bg-white border-gray-200  dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700">
      <StatsHeader
        title={data.title}
        description={data.description}
        percentage={percentage.toFixed(2)}
        isPositive={isPositive}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
      />

      <StatsTabs
        tabs={data.tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <StatsContent items={data.tabs[activeTab].items} />

      <StatsFooter
        ranges={ranges}
        selectedRange={selectedRange}
        onChange={onRangeChange}
      />
    </div>
  );
};

export default StatsCard;
