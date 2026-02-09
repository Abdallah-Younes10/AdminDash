import dayjs from "dayjs";

export const isInRange = (date, range) => {
  const now = dayjs();

  if (range === "week" || range === 7)
    return dayjs(date).isAfter(now.subtract(7, "day"));
  if (range === "month" || range === 30)
    return dayjs(date).isAfter(now.subtract(1, "month"));
  if (range === "year" || range === 365)
    return dayjs(date).isAfter(now.subtract(1, "year"));

  return true;
};

export const getPreviousRange = (range) => {
  if (range === "week" || range === 7) return { amount: 7, unit: "day" };
  if (range === "month" || range === 30) return { amount: 1, unit: "month" };
  if (range === "year" || range === 365) return { amount: 1, unit: "year" };

  // Default fallback if a number is passed that isn't explicitly defined
  if (typeof range === "number") return { amount: range, unit: "day" };
};

export const getPreviousDate = (date, range) => {
  const rangeInfo = typeof range === "object" ? range : getPreviousRange(range);
  if (!rangeInfo) return dayjs(date).format("YYYY-MM-DD");

  const previousDate = dayjs(date).subtract(rangeInfo.amount, rangeInfo.unit);
  return previousDate.format("YYYY-MM-DD");
};
