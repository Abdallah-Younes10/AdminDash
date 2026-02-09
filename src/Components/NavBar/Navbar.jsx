import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Radux/AuthSlice";
import logo from "../../assets/2b77c46d371f790c50ad5f125939f8f5.jpg";
import { DropdownButton } from "../Utalitis/DropdownButton";
import { Link } from "react-router-dom";
import Switch from "../Utalitis/Switch";
import { LayoutDashboard, Users, Package, ShoppingCart } from "lucide-react";
export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [openUser, setOpenUser] = useState(false);
  const [openApps, setOpenApps] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  const userRef = useRef(null);
  const appsRef = useRef(null);
  const notifRef = useRef(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setOpenUser(false);
      }
      if (appsRef.current && !appsRef.current.contains(e.target)) {
        setOpenApps(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setOpenNotif(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white fixed w-full z-50 top-0 border-b ">
      <div className="flex flex-wrap flex-col md:flex-row items-center justify-between mx-auto p-4">
        {/* ================= Left ================= */}
        <div className="flex items-center gap-10 md:gap-4 xl:w-2/3 w-full md:w-auto">
          <Link to="/" className="flex items-center gap-3 select-none">
            <img src={logo} className="h-9 w-9 rounded-xl" alt="Logo" />

            <span className="text-3xl font-semibold tracking-tight font-[Space_Grotesk] text-gray-900 dark:text-white">
              Admin<span className="text-indigo-600">Dash</span>
            </span>
          </Link>

          {/* Search */}
          {/* <div className="hidden md:block relative ml-15 w-full">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="pl-10 p-2.5 w-full rounded-lg
              bg-gray-50 dark:bg-gray-700
              border border-gray-300 dark:border-gray-600
              text-sm text-gray-900 dark:text-white "
            />
          </div> */}
          <DropdownButton />
        </div>

        {/* ================= Right ================= */}
        <div className="flex items-center gap-4 relative ">
          {/* ===== Apps ===== */}
          <div ref={appsRef} className="relative">
            <button
              onClick={() => setOpenApps((p) => !p)}
              className="md:hidden sm:flex p-2 rounded-lg
              text-gray-500 hover:bg-gray-100
              dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>

            {openApps && (
              <div className="absolute left-0 top-12 w-72 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-3 font-semibold text-center border-b dark:border-gray-600">
                  Apps
                </div>
                <div className="grid grid-cols-2 gap-4 p-4">
                  {[
                    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
                    { name: "Users", icon: Users, path: "/users" },
                    { name: "Products", icon: Package, path: "/products" },
                    { name: "Orders", icon: ShoppingCart, path: "/orders" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      onClick={() => navigate(item.path)}
                      className="flex flex-col items-center justify-center p-3 rounded-xl
                          hover:bg-gray-100 dark:hover:bg-gray-600
                          cursor-pointer transition-colors group"
                    >
                      <div className="p-2 mb-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full group-hover:scale-110 transition-transform">
                        <item.icon size={20} />
                      </div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ===== Notifications ===== */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setOpenNotif((p) => !p)}
              className="p-2 rounded-lg
              text-gray-500 hover:bg-gray-100
              dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>

            {openNotif && (
              <div className="absolute left-0 top-12 w-80 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-3 text-center font-semibold border-b dark:border-gray-600">
                  Notifications
                </div>
                <div className="p-4 text-sm text-gray-500 dark:text-gray-300">
                  No new notifications
                </div>
              </div>
            )}
          </div>

          {/* Dark / Light */}
          <Switch />

          {/* ===== User ===== */}
          <div ref={userRef} className="relative">
            <button
              onClick={() => setOpenUser((p) => !p)}
              className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                src={user?.image || "https://i.pravatar.cc/100"}
                alt="user"
                className="w-9 h-9 rounded-full object-cover border"
              />

              <div className="text-left hidden lg:flex flex-col">
                <p className="font-medium text-gray-900 dark:text-white leading-tight">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">
                  Admin
                </p>
              </div>
            </button>

            {openUser && (
              <div className="absolute right-0 top-12 w-44 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                <div className="px-4 py-3 border-b dark:border-gray-600">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
                <ul className="p-2 text-sm">
                  {/* <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer">
                    Dashboard
                  </li> */}
                  <li
                    onClick={() => navigate("/settings")}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer"
                  >
                    Settings
                  </li>
                  <li
                    onClick={() => {
                      dispatch(logout());
                      navigate("/login");
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer text-red-500 flex items-center gap-2"
                  >
                    Sign out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
