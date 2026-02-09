import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Trash2,
  Filter,
  X,
  ChevronDown,
  Check,
  Plus,
} from "lucide-react";

export const TableToolbar = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
  selectedCount = 0,
  onDeleteSelected,
  filterOptions = [],
  activeFilters = {},
  onFilterChange,
  onAdd,
  addButtonLabel = "Add New",
}) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 400);

    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleFilter = (key, value) => {
    const newFilters = { ...activeFilters };
    if (newFilters[key] === value) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    onFilterChange(newFilters);
  };

  const clearFilter = (key) => {
    const newFilters = { ...activeFilters };
    delete newFilters[key];
    onFilterChange(newFilters);
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <div className="flex flex-col border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1 min-w-[200px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
            placeholder={placeholder}
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Dropdown */}
          {filterOptions.length > 0 && (
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 shadow-sm ${
                  hasActiveFilters
                    ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                }`}
              >
                <Filter size={16} />
                Filter
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 py-2 animate-in fade-in zoom-in duration-200">
                  {filterOptions.map((filter) => (
                    <div key={filter.key} className="px-4 py-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                        {filter.label}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {filter.options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() =>
                              handleToggleFilter(filter.key, opt.value)
                            }
                            className={`px-3 py-1 text-xs rounded-full border transition-all ${
                              activeFilters[filter.key] === opt.value
                                ? "bg-blue-500 text-white border-blue-500 shadow-md scale-105"
                                : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="mt-2 border-t border-gray-100 dark:border-gray-700 pt-2 px-4">
                    <button
                      onClick={() => onFilterChange({})}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Add Button */}
          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow-md shadow-blue-100 dark:shadow-none hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus size={18} />
              <span className="text-sm font-bold hidden sm:inline">
                {addButtonLabel}
              </span>
            </button>
          )}

          {/* Delete Button */}
          {selectedCount > 0 && (
            <button
              onClick={onDeleteSelected}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-all duration-200 shadow-sm border border-red-100 dark:border-red-900/30 group"
            >
              <Trash2
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-sm font-medium hidden sm:inline">
                Delete ({selectedCount})
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Chips */}
      {hasActiveFilters && (
        <div className="px-4 pb-3 flex flex-wrap gap-2 items-center">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter mr-1">
            Active Filters:
          </span>
          {Object.entries(activeFilters).map(([key, value]) => {
            const filterLabel = filterOptions.find((f) => f.key === key)?.label;
            const optionLabel = filterOptions
              .find((f) => f.key === key)
              ?.options.find((o) => o.value === value)?.label;

            return (
              <div
                key={key}
                className="flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md text-xs border border-blue-100 dark:border-blue-800/50"
              >
                <span className="opacity-60">{filterLabel}:</span>
                <span className="font-semibold">{optionLabel || value}</span>
                <button
                  onClick={() => clearFilter(key)}
                  className="ml-1 hover:text-blue-800 dark:hover:text-blue-200 p-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            );
          })}
          <button
            onClick={() => onFilterChange({})}
            className="text-[10px] font-bold text-gray-500 hover:text-red-500 uppercase tracking-tighter ml-2"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};
