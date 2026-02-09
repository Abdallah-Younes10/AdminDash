import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDashboardData } from "./Hooks/useDashboardData";
// import { useQueryClient } from "@tanstack/react-query";
import AccordionTable from "./AccrodingTable/AccrodingTable";
import {
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  User,
  Hash,
  DollarSign,
  Package,
  Layers,
  ArrowRight,
} from "lucide-react";

export const Orders = () => {
  // const queryClient = useQueryClient();
  const { isOpen: openIcons } = useSelector((state) => state.iconsView);
  const [params, setParams] = useState({});
  const { carts: orders, users, isLoading } = useDashboardData(params);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : `User #${userId}`;
  };

  const handleUpdateOrder = async (id, data) => {
    console.log("Order updated (mock)");
  };

  const columns = [
    {
      label: "Order ID",
      accessor: "id",
      editType: "id",
      className: "font-mono font-medium",
    },
    {
      label: "Customer",
      accessor: "userId", // Support searching by customer ID
      render: (order, isOpen, onToggle) => (
        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <User size={16} />
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
              {getUserName(order.userId)}
            </span>
          </div>
        </div>
      ),
    },
    {
      label: "Units",
      accessor: "totalQuantity",
      className: "hidden md:table-cell",
      headerClassName: "hidden md:table-cell",
    },
    {
      label: "Total Price",
      accessor: "total",
      render: (order) => (
        <span className="font-bold text-gray-900 dark:text-white">
          ${order.total?.toFixed(2)}
        </span>
      ),
    },
    {
      label: "Status",
      render: () => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          In Transition
        </span>
      ),
    },
  ];

  const renderExpanded = (order) => {
    return (
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2">
          Items Detail
        </h4>
        <div className="grid grid-cols-1 gap-3">
          {order.products?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50 group hover:border-blue-200 dark:hover:border-blue-900/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt=""
                  className="w-12 h-12 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all"
                />
                <div>
                  <p className="text-sm font-semibold dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Price: ${item.price} • Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  ${item.total?.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`p-4 transition-all duration-300 ${openIcons ? "sm:ml-64" : "md:ml-25"} mt-30 lg:mt-20`}
    >
      <AccordionTable
        data={orders}
        isLoading={isLoading}
        columns={columns}
        renderExpanded={renderExpanded}
        params={params}
        onParamsChange={setParams}
        onUpdate={handleUpdateOrder}
        searchPlaceholder="Search orders by customer ID..."
      />
    </div>
  );
};
