import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ title, icon, items, open, onToggle }) => {
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center w-full p-2 text-base text-gray-900 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <svg
          className="flex-shrink-0 w-6 h-6 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 640 640"
        >
          <path d={icon} />
        </svg>

        <span className="flex-1 ml-3 text-left">{title}</span>

        <svg
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293 10 12l4.707-4.707" />
        </svg>
      </button>

      {open && (
        <ul className="py-2 space-y-2">
          {items.map((item) => (
            <li key={item.title}>
              <Link
                to={item.href}
                className="flex items-center p-2 text-sm text-gray-900 rounded-lg pl-11 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Dropdown;
