import React, { useState, useMemo } from "react";
import { TableToolbar } from "./TableToolbar";
import { TablePagination } from "./TablePagination";
import { TableRow } from "./TableRow";
import { ArrowDownAZ, ArrowUpAZ, ChevronDown, ChevronUp } from "lucide-react";

export const DataTable = ({
  data = [],
  columns = [],
  renderExpanded,
  searchPlaceholder = "Search...",
  itemsPerPage = 10,
  params = {},
  onParamsChange,
  filterOptions = [],
  onAdd,
  onUpdate,
  addButtonLabel,
}) => {
  const [internalData, setInternalData] = useState(data);
  const [prevData, setPrevData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [openRow, setOpenRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  // Sync internal data only when source data Truly changes (e.g. refetch or search)
  // Because selectors are memoized, this only triggers on REAL data changes.
  if (data !== prevData) {
    setPrevData(data);
    setInternalData(data);
  }

  const handleDeleteItem = (id) => {
    setInternalData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateItem = async (id, updatedValues) => {
    if (onUpdate) {
      await onUpdate(id, updatedValues);
    }
    // Update local state to reflect changes immediately
    setInternalData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedValues } : item,
      ),
    );
  };

  /* 
    memoizing handlers to prevent unnecessary re-renders in TableToolbar 
    which causes the pagination to reset (debounce effect re-runs)
  */
  const handleSearch = React.useCallback(
    (q) => {
      // Guard: If query hasn't changed, do NOT reset page
      if (q === (params.q || "")) return;

      // console.log("DataTable handleSearch called, resetting page to 1", q);
      onParamsChange((prev) => ({ ...prev, q }));
      setCurrentPage(1);
    },
    [onParamsChange, params.q],
  );

  const handleFilterChange = React.useCallback(
    (newFilters) => {
      onParamsChange((prev) => {
        const updatedParams = { ...prev };
        // Clear old filter-related params
        delete updatedParams.filterKey;
        delete updatedParams.filterValue;
        delete updatedParams.category;
        return { ...updatedParams, ...newFilters };
      });
      setCurrentPage(1);
    },
    [onParamsChange],
  );

  const requestSort = (key) => {
    let order = "asc";
    if (params.sortBy === key && params.order === "asc") {
      order = "desc";
    }
    onParamsChange({ ...params, sortBy: key, order });
  };

  // Pagination logic - total count should ideally come from API, but we use data.length for now
  const totalPages = Math.ceil(internalData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return internalData.slice(start, start + itemsPerPage);
  }, [internalData, currentPage, itemsPerPage]);

  const handleToggleRow = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteSelected = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedRows.length} items?`,
      )
    ) {
      setInternalData((prev) =>
        prev.filter((item) => !selectedRows.includes(item.id)),
      );
      setSelectedRows([]);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
      <TableToolbar
        searchTerm={params.q || ""}
        onSearchChange={handleSearch}
        placeholder={searchPlaceholder}
        selectedCount={selectedRows.length}
        onDeleteSelected={handleDeleteSelected}
        filterOptions={filterOptions}
        activeFilters={{
          ...(params.filterKey && params.filterValue
            ? { filterKey: params.filterKey, filterValue: params.filterValue }
            : {}),
          ...(params.category ? { category: params.category } : {}),
        }}
        onFilterChange={handleFilterChange}
        onAdd={onAdd}
        addButtonLabel={addButtonLabel}
      />

      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-sm text-left border-separate border-spacing-y-0">
          <thead className="text-xs uppercase text-gray-500 bg-gray-50/50 dark:bg-gray-800/50 dark:text-gray-400">
            <tr>
              <th className="p-4 w-10">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    paginatedData.length > 0 &&
                    selectedRows.length === paginatedData.length
                  }
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`p-4 transition-colors group ${col.headerClassName || ""} ${col.accessor ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50" : ""}`}
                  onClick={
                    col.accessor ? () => requestSort(col.accessor) : undefined
                  }
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.accessor && (
                      <span
                        className={`transition-colors duration-200 ${
                          params.sortBy === col.accessor
                            ? "text-blue-500 opacity-100"
                            : "text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        {params.sortBy === col.accessor &&
                        params.order === "desc" ? (
                          <ArrowDownAZ size={14} />
                        ) : (
                          <ArrowUpAZ size={14} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="before:block before:h-2 before:content-['']">
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow
                  key={item.id}
                  item={item}
                  columns={columns}
                  isOpen={openRow === item.id}
                  onToggle={() => handleToggleRow(item.id)}
                  isSelected={selectedRows.includes(item.id)}
                  onSelect={handleSelectRow}
                  onDelete={handleDeleteItem}
                  onUpdate={handleUpdateItem}
                  renderExpanded={renderExpanded}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="p-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No matching results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {internalData.length > itemsPerPage && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={internalData.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};
