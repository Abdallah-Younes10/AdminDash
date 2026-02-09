import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { isInRange, getPreviousRange } from "./dateUtils";

dayjs.extend(isBetween);

const calculateChange = (current, previous) => {
  if (previous === 0) return 0;
  return (((current - previous) / previous) * 100).toFixed(1);
};

export const calculateRevenueKPI = (carts, range) => {
  const now = dayjs();
  const { amount, unit } = getPreviousRange(range);

  const current = carts
    .filter((c) => isInRange(c.createdAt, range))
    .reduce((sum, c) => sum + c.total, 0);

  const previous = carts
    .filter((c) =>
      dayjs(c.createdAt).isBetween(
        now.subtract(amount * 2, unit),
        now.subtract(amount, unit),
      ),
    )
    .reduce((sum, c) => sum + c.total, 0);

  const change = calculateChange(current, previous);

  return {
    value: current.toFixed(2),
    previous: previous.toFixed(2),
    change,
    trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
  };
};

export const calculateOrdersKPI = (carts, range) => {
  const current = carts.filter((c) => isInRange(c.createdAt, range)).length;
  const previous = carts.length - current;

  const change = calculateChange(current, previous);

  return {
    value: current,
    previous,
    change,
    trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
  };
};
export const calculateUsersKPI = (users, range) => {
  const current = users.filter((c) => isInRange(c.createdAt, range)).length;
  const previous = users.length - current;

  const change = calculateChange(current, previous);

  return {
    value: current,
    previous,
    change,
    trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
  };
};

export const calculateAOV = (revenue, orders) => {
  if (!orders) return 0;
  return (revenue / orders).toFixed(2);
};

export const getTopProductsByRange = (carts, range, limit = 5) => {
  const rangedCarts = carts.filter((c) => isInRange(c.createdAt, range));

  const map = {};

  rangedCarts.forEach((cart) => {
    cart.products.forEach((p) => {
      if (!map[p.id]) {
        map[p.id] = {
          id: p.id,
          title: p.title,
          image: p.thumbnail,
          quantity: 0,
          revenue: 0,
        };
      }

      map[p.id].quantity += p.quantity;
      map[p.id].revenue += p.total;
    });
  });

  return Object.values(map)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
};

export const getTopUsersByRange = (carts, users, range, limit = 5) => {
  const rangedCarts = carts.filter((c) => isInRange(c.createdAt, range));

  const map = {};

  rangedCarts.forEach((cart) => {
    if (!map[cart.userId]) {
      const user = users.find((u) => u.id === cart.userId);

      map[cart.userId] = {
        id: cart.userId,
        name: user ? `${user.firstName} ${user.lastName}` : "Unknown",
        image: user ? user.image : "",
        orders: 0,
        spent: 0,
      };
    }

    map[cart.userId].orders += 1;
    map[cart.userId].spent += cart.total;
  });

  return Object.values(map)
    .sort((a, b) => b.spent - a.spent)
    .slice(0, limit);
};

export const getCategories = (carts, products, range, limit = 6) => {
  const rangedCarts = carts.filter((c) => isInRange(c.createdAt, range));

  const map = {};

  rangedCarts.forEach((cart) => {
    cart.products.forEach((cartProduct) => {
      const productInfo = products.find((p) => p.id === cartProduct.id);
      const categoryName = productInfo ? productInfo.category : "Others";

      if (!map[categoryName]) {
        map[categoryName] = {
          name: categoryName,
          orders: 0,
          spent: 0,
        };
      }

      map[categoryName].orders += 1;
      map[categoryName].spent += cartProduct.total || 0;
    });
  });

  return Object.values(map)
    .sort((a, b) => b.spent - a.spent)
    .slice(0, limit);
};

export const getTransactionsByRange = (carts, users, range) => {
  const paymentMethods = ["Visa", "Mastercard", "Paypal", "Apple Pay"];
  const statuses = ["Completed", "Cancelled", "In progress", "In review"];

  return carts
    .filter((c) => isInRange(c.createdAt, range))
    .map((cart) => {
      const user = users.find((u) => u.id === cart.userId);
      // Use cart.id as seed for deterministic "random" values if needed
      return {
        id: cart.id,
        ref: `REF-${1000 + cart.id}`,
        userName: user ? `${user.firstName} ${user.lastName}` : "Guest User",
        userAvatar: user ? user.image : "",
        amount: cart.total,
        date: cart.createdAt,
        method: paymentMethods[cart.id % paymentMethods.length],
        status: statuses[cart.id % statuses.length],
      };
    })
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
};
