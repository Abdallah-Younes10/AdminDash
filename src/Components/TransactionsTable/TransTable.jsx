import React from "react";
import dayjs from "dayjs";
import { CreditCard } from "lucide-react";

const StatusBadge = ({ status }) => {
  const styles = {
    Completed:
      "bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border-green-100 dark:border-green-500",
    Cancelled:
      "bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border-red-100 dark:border-red-400",
    "In progress":
      "bg-purple-100 text-purple-800 dark:bg-gray-700 dark:border-purple-500 dark:text-purple-400",
    "In review":
      "bg-orange-100 text-orange-800 dark:bg-gray-700 dark:border-orange-300 dark:text-orange-300",
  };

  return (
    <span
      className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border ${
        styles[status] || styles["In review"]
      }`}
    >
      {status}
    </span>
  );
};

const PaymentIcon = ({ method }) => {
  if (method === "Visa") {
    return (
      <svg
        className="w-8 h-5"
        viewBox="0 0 256 83"
        preserveAspectRatio="xMidYMid"
      >
        <path
          d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763 8.056-3.92 10.762-6.434 10.73-9.94-.06-5.365-6.426-7.733-12.383-7.825-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243 21.725 0 35.938 10.724 36.015 27.351.085 21.102-29.188 22.27-28.988 31.702.069 2.86 2.798 5.912 8.778 6.688 2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963h-17.665m3.037-21.601l6.265-30.027h-17.158l10.893 30.027m-118.599 21.6L88.964 1.246h20.687l17.104 79.963h-20.679m-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963H75.473"
          fill="#254AA5"
        />
      </svg>
    );
  }
  if (method === "Mastercard") {
    return (
      <svg
        className="w-8 h-5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="7" cy="12" r="7" fill="#EB001B" />
        <circle cx="17" cy="12" r="7" fill="#F79E1B" />
        <path
          d="M12 17.5C13.5 16 14.5 14.1 14.5 12C14.5 9.9 13.5 8 12 6.5C10.5 8 9.5 9.9 9.5 12C9.5 14.1 10.5 16 12 17.5Z"
          fill="#FF5F00"
        />
      </svg>
    );
  }
  return <CreditCard className="w-4 h-4 text-gray-400" />;
};

export const TransTable = ({
  transactions = [],
  header = "Latest Transactions",
  title = "Real-time sales activity for the selected period",
  fields = ["Customer", "Date", "Amount", "Ref Number", "Method", "Status"],
  isLoading = false,
}) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 mt-5">
      <div className="items-center justify-between lg:flex mb-6">
        <div className="mb-4 lg:mb-0">
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            {header}
          </h3>
          <span className="text-base font-normal text-gray-500 dark:text-gray-400">
            {title}
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg border dark:border-gray-700 border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {fields.map((field) => (
                      <th
                        key={field}
                        className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                      >
                        {field}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y dark:divide-gray-700 divide-gray-200">
                  {isLoading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-32"></div>
                        </td>
                        <td className="p-4">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                        </td>
                        <td className="p-4">
                          <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-28"></div>
                        </td>
                        <td className="p-4">
                          <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-16"></div>
                        </td>
                        <td className="p-4">
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-24"></div>
                        </td>
                      </tr>
                    ))
                  ) : transactions.length > 0 ? (
                    transactions.map((t) => (
                      <tr
                        key={t.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center space-x-3">
                            {t.userAvatar || t.image ? (
                              <img
                                className="w-8 h-8 rounded-full"
                                src={t.userAvatar || t.image}
                                alt={t.userName || t.name}
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                                {(t.userName || t.name || "?").charAt(0)}
                              </div>
                            )}
                            <span className="font-semibold">
                              {t.userName || t.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {t.date
                            ? dayjs(t.date).format("MMM DD, YYYY HH:mm")
                            : "N/A"}
                        </td>
                        <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                          $
                          {(t.amount || t.spent || 0).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                            },
                          )}
                        </td>
                        <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {t.ref || (t.orders ? `${t.orders} orders` : "N/A")}
                        </td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                          <div className="flex items-center space-x-2">
                            <PaymentIcon method={t.method} />
                            <span className="text-xs">{t.method || "N/A"}</span>
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <StatusBadge status={t.status || "Completed"} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-10 text-center text-gray-500 dark:text-gray-400"
                      >
                        No transactions found for this period.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
