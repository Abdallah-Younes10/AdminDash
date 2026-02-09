// Generate deterministic date based on item id
// Distributes dates so ~30% are in last week, ~50% in last month, rest in last year
const generateDateFromId = (id, now) => {
  const seed = (id * 9301 + 49297) % 100; // 0-99

  let daysAgo;
  if (seed < 30) {
    // 30% in last week (0-7 days ago)
    daysAgo = seed % 7;
  } else if (seed < 70) {
    // 40% in last month (7-30 days ago)
    daysAgo = 7 + (seed % 23);
  } else {
    // 30% in last year (30-365 days ago)
    daysAgo = 30 + ((seed * 3) % 335);
  }

  const date = new Date(now);
  date.setDate(date.getDate() - daysAgo);
  return date;
};

export const enhanceWithDate = (items) => {
  const now = new Date();

  return items.map((item) => ({
    ...item,
    createdAt: item.createdAt
      ? new Date(item.createdAt)
      : generateDateFromId(item.id, now),
  }));
};
