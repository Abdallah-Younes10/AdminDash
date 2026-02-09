import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  User,
  Mail,
  Shield,
  Settings as SettingsIcon,
  Bell,
  Lock,
  Globe,
  Camera,
  CheckCircle,
  Save,
} from "lucide-react";

export const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    username: user?.username || "",
  });

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving profile settings:", formData);
    alert("Success! Your profile has been updated (Mock).");
  };

  const tabs = [
    { id: "profile", label: "Profile Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="p-4 mt-20 md:ml-64 min-h-[calc(100vh-80px)]transition-all duration-300">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-[Space_Grotesk]">
            Account Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your profile information and dashboard preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden">
              <div className="p-8">
                {activeTab === "profile" && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-8 border-b border-gray-100 dark:border-gray-800">
                      <div className="relative group">
                        <img
                          src={user?.image || "https://i.pravatar.cc/200"}
                          alt="avatar"
                          className="w-32 h-32 rounded-3xl object-cover border-4 border-white dark:border-gray-800 shadow-xl"
                        />
                        <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2.5 rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all">
                          <Camera size={20} />
                        </button>
                      </div>
                      <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {formData.firstName} {formData.lastName}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                          <CheckCircle size={14} className="text-green-500" />
                          Verified Administrator
                        </div>
                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full inline-block">
                          {user?.role || "Admin"}
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                firstName: e.target.value,
                              })
                            }
                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                lastName: e.target.value,
                              })
                            }
                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="email"
                            value={formData.email}
                            readOnly
                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 pl-12 text-gray-400 cursor-not-allowed font-medium italic"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                          Username
                        </label>
                        <input
                          type="text"
                          value={formData.username}
                          readOnly
                          className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 text-gray-400 cursor-not-allowed font-medium italic"
                        />
                      </div>

                      <div className="pt-6">
                        <button
                          type="submit"
                          className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-blue-500/20"
                        >
                          <Save size={20} />
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Password Management
                      </h3>
                      <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                        <Lock size={18} />
                        Change Password
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Two-Factor Authentication
                      </h3>
                      <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-500 text-white p-2 rounded-full">
                            <Shield size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-green-800 dark:text-green-400">
                              Security Active
                            </p>
                            <p className="text-xs text-green-600 dark:text-green-500">
                              Your account is highly protected.
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-green-700 dark:text-green-400 underline cursor-pointer">
                          Manage
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="p-12 text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 mb-4">
                      <Bell size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Notification Center Coming Soon
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                      We're building a smarter way to stay connected to your
                      team.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
