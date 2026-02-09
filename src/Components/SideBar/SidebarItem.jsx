import { NavLink } from "react-router-dom";

const SidebarItem = ({ href, icon, icon2 = "", title, openicons }) => {
  return (
    <li>
      <NavLink
        to={href}
        end={href === "/"}
        className={({ isActive }) =>
          `flex items-center p-2 text-base rounded-lg transition-all duration-200 group ${
            isActive
              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 font-semibold shadow-sm"
              : "text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 transition-colors duration-200 ${
                isActive
                  ? "text-blue-500"
                  : "text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
              }`}
              fill="currentColor"
              viewBox="0 0 640 640"
            >
              <path clipRule="evenodd" fillRule="evenodd" d={icon} />
              <path clipRule="evenodd" fillRule="evenodd" d={icon2} />
            </svg>
            {openicons && (
              <span className="ml-3 transition-opacity duration-300">
                {title}
              </span>
            )}
          </>
        )}
      </NavLink>
    </li>
  );
};

export default SidebarItem;
