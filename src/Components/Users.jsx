import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDashboardData } from "./Hooks/useDashboardData";
import { useQueryClient } from "@tanstack/react-query";
import AccordionTable from "./AccrodingTable/AccrodingTable";
import { AddItemModal } from "./AccrodingTable/AddItemModal";
import { addUser, updateUser } from "../DashboardLogic/dashboardApi";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Globe,
  Hash,
  Building2,
  Map,
  Briefcase,
  User,
  Calendar,
  Clock,
} from "lucide-react";

// Mock details generator for API data
const getMockDetails = (user) => ({
  address: `${user.address?.address || "123 Main St"}, ${user.address?.city || "London"}, ${user.address?.state || "UK"}`,
  country: `${user.address?.country || "UK"}`,
  postalCode: `${user.address?.postalCode || "123456"}`,
  company: `${user.company?.name || ""}`,
  companyAddress: `${user.company?.address.address || ""}`,
  department: `${user.company?.department || ""}`,
  gender: `${user.gender || ""}`,
  age: `${user.age || ""}`,
});

export const Users = () => {
  const queryClient = useQueryClient();
  const { isOpen: openIcons } = useSelector((state) => state.iconsView);
  const [params, setParams] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { users, isLoading } = useDashboardData(params);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddUser = async (data) => {
    const newUser = await addUser(data);
    // console.log("New user added:", newUser);
    // In a real app, you might refetch or update state
    alert(`Success! Added user: ${newUser.firstName} ${newUser.lastName}`);
  };

  const handleUpdateUser = async (id, data) => {
    const updatedUser = await updateUser(id, data);
    // console.log("User updated:", updatedUser);

    // Update React Query cache manually
    queryClient.setQueryData(["users", params], (old) => {
      if (!old) return old;
      return {
        ...old,
        users: old.users.map((u) =>
          u.id === id ? { ...u, ...updatedUser } : u,
        ),
      };
    });
  };

  const userFields = [
    {
      name: "firstName",
      label: "First Name",
      required: true,
      placeholder: "John",
    },
    {
      name: "lastName",
      label: "Last Name",
      required: true,
      placeholder: "Doe",
    },
    {
      name: "email",
      label: "Email",
      required: true,
      type: "email",
      placeholder: "john@example.com",
    },
    { name: "phone", label: "Phone", placeholder: "+1 234 567 890" },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Moderator", value: "moderator" },
        { label: "User", value: "user" },
      ],
    },
  ];

  const columns = [
    {
      label: "Id",
      accessor: "id",
      editType: "id",
      className: "italic text-gray-600 dark:text-gray-300",
    },
    {
      label: "Name",
      accessor: "firstName", // Support server-side sorting by first name
      editType: "name",
      render: (user, isOpen, onToggle) => (
        <div className="flex items-center gap-3 -ml-5">
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <img
            src={user.image}
            className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-gray-700"
            alt={user.firstName}
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white leading-tight">
              {user.firstName} {user.lastName}
            </p>
          </div>
        </div>
      ),
    },
    {
      label: "Role",
      accessor: "role",
      editType: "text",
      className: "hidden md:table-cell italic text-gray-600 dark:text-gray-300",
      headerClassName: "hidden md:table-cell",
    },
    {
      label: "Email Address",
      accessor: "email",
      editType: "text",
      className:
        "hidden lg:table-cell text-gray-500 dark:text-gray-400 font-medium",
      headerClassName: "hidden lg:table-cell",
    },
    {
      label: "Phone Number",
      accessor: "phone",
      editType: "text",
      className: "hidden xl:table-cell text-gray-500 dark:text-gray-400",
      headerClassName: "hidden xl:table-cell",
    },
    {
      label: "Status",
      accessor: "age",
      render: (user) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            user.age > 30
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
          }`}
        >
          {user.age > 30 ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const filterOptions = [
    {
      label: "Role",
      key: "filterValue",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Moderator", value: "moderator" },
        { label: "User", value: "user" },
      ],
    },
  ];

  const handleParamsChange = React.useCallback((newParamsOrFn) => {
    setParams((prev) => {
      const newParams =
        typeof newParamsOrFn === "function"
          ? newParamsOrFn(prev)
          : newParamsOrFn;
      const updatedParams = { ...newParams };
      if (updatedParams.filterValue && !updatedParams.filterKey) {
        updatedParams.filterKey = "role";
      }
      return updatedParams;
    });
  }, []);

  const renderExpanded = (user, context = {}) => {
    const { isEditing, editedValues, onChange } = context;
    const details = getMockDetails(user);

    const renderField = (label, icon, key, isEditable = false) => {
      let value =
        isEditable && isEditing ? editedValues[key] : details[key] || user[key];

      if (typeof value === "object" && value !== null) {
        value = "";
      }

      return (
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 tracking-wider">
            {label}
          </p>
          <div className="flex gap-2 text-sm text-gray-600 dark:text-gray-300 items-start">
            {React.createElement(icon, {
              size: 16,
              className: "text-gray-400 shrink-0 mt-0.5",
            })}
            {isEditing && isEditable ? (
              <input
                type="text"
                value={value || ""}
                onChange={(e) => onChange(key, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full p-1 text-xs border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-1 focus:ring-blue-500 outline-none"
              />
            ) : (
              <span className="truncate">{value}</span>
            )}
          </div>
        </div>
      );
    };

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-6 border-b border-gray-100 dark:border-gray-800 xl:hidden">
          <div className="md:hidden">
            {renderField("Role", Briefcase, "role", true)}
          </div>
          <div className="lg:hidden">
            {renderField("Email", User, "email", true)}
          </div>
          <div className="xl:hidden">
            {renderField("Phone", Clock, "phone", true)}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {renderField("Address", MapPin, "address")}
          {renderField("Country", Globe, "country")}
          {renderField("Postal Code", Hash, "postalCode")}
          {renderField("Company", Building2, "company")}
          {renderField("Company Address", Map, "companyAddress")}
          {renderField("Department", Briefcase, "department")}
          {renderField("Gender", User, "gender")}
          {renderField("Age", Calendar, "age")}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`p-4 transition-all duration-300 ${openIcons ? "sm:ml-64" : "md:ml-25"} mt-30 lg:mt-20`}
    >
      <AccordionTable
        data={users}
        isLoading={isLoading}
        columns={columns}
        renderExpanded={renderExpanded}
        params={params}
        onParamsChange={handleParamsChange}
        filterOptions={filterOptions}
        onAdd={() => setIsAddModalOpen(true)}
        onUpdate={handleUpdateUser}
        addButtonLabel="Add New User"
      />

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddUser}
        title="Add New User"
        fields={userFields}
      />
    </div>
  );
};
