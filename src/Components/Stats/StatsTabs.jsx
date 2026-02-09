const StatsTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className=" text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg flex dark:divide-gray-600 dark:text-gray-400 mb-4">
      {["products", "customers"].map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`inline-block w-full p-4 rounded-t-lg  bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600  ${
            activeTab === tab
              ? "text-blue-500"
              : "text-gray-500" 
          }`}
        >
          {tab === "products" ? "Top products" : "Top customers"}
        </button>
      ))}
    </div>
  );
};

export default StatsTabs;
