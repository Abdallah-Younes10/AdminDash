import React from "react";
import { DataTable } from "./DataTable";

export default function AccordionTable({
  data,
  isLoading,
  columns,
  renderExpanded,
  searchPlaceholder = "Search...",
  params,
  onParamsChange,
  filterOptions = [],
  onAdd,
  onUpdate,
  addButtonLabel,
}) {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
      </div>
    );
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      renderExpanded={renderExpanded}
      searchPlaceholder={searchPlaceholder}
      params={params}
      onParamsChange={onParamsChange}
      filterOptions={filterOptions}
      onAdd={onAdd}
      onUpdate={onUpdate}
      addButtonLabel={addButtonLabel}
    />
  );
}
