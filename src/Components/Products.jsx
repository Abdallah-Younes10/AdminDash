import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDashboardData } from "./Hooks/useDashboardData";
import { useQueryClient } from "@tanstack/react-query";
import AccordionTable from "./AccrodingTable/AccrodingTable";
import { AddItemModal } from "./AccrodingTable/AddItemModal";
import { addProduct, updateProduct } from "../DashboardLogic/dashboardApi";
import {
  Package,
  ChevronDown,
  ChevronUp,
  Tag,
  DollarSign,
  Box,
  Star,
  Info,
  Layers,
  BarChart,
  ShoppingCart,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

export const Products = () => {
  const queryClient = useQueryClient();
  const { isOpen: openIcons } = useSelector((state) => state.iconsView);
  const [params, setParams] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { products, isLoading } = useDashboardData(params);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddProduct = async (data) => {
    const newProduct = await addProduct({
      ...data,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
    });
    console.log("New product added:", newProduct);
    alert(`Success! Added product: ${newProduct.title}`);
  };

  const handleUpdateProduct = async (id, data) => {
    const updatedProduct = await updateProduct(id, {
      ...data,
      price: data.price ? parseFloat(data.price) : undefined,
      stock: data.stock ? parseInt(data.stock) : undefined,
    });
    console.log("Product updated:", updatedProduct);

    // Update React Query cache manually
    queryClient.setQueryData(["products", params], (old) => {
      if (!old) return old;
      return {
        ...old,
        products: old.products.map((p) =>
          p.id === id ? { ...p, ...updatedProduct } : p,
        ),
      };
    });
  };

  const productFields = [
    {
      name: "title",
      label: "Product Title",
      required: true,
      placeholder: "Essential T-Shirt",
    },
    { name: "brand", label: "Brand", placeholder: "Nike / Apple" },
    {
      name: "price",
      label: "Price",
      required: true,
      type: "number",
      placeholder: "49.99",
    },
    {
      name: "stock",
      label: "Stock Level",
      required: true,
      type: "number",
      placeholder: "100",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        { label: "Beauty", value: "beauty" },
        { label: "Fragrances", value: "fragrances" },
        { label: "Furniture", value: "furniture" },
        { label: "Groceries", value: "groceries" },
        { label: "Laptops", value: "laptops" },
        { label: "Smartphones", value: "smartphones" },
      ],
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Product details...",
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
      label: "Product",
      accessor: "title", // Support server-side sorting by title
      editType: "text",
      render: (product, isOpen, onToggle) => (
        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <img
            src={product.thumbnail}
            className="w-10 h-10 rounded-lg object-cover border border-gray-100 dark:border-gray-700"
            alt={product.title}
          />
          <div className="max-w-[150px]">
            <p className="font-semibold text-gray-900 dark:text-white truncate">
              {product.title}
            </p>
            <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
              {product.brand}
            </p>
          </div>
        </div>
      ),
    },
    {
      label: "Category",
      accessor: "category",
      editType: "text",
      className: "hidden md:table-cell text-gray-500 dark:text-gray-400",
      headerClassName: "hidden md:table-cell",
    },
    {
      label: "Price",
      accessor: "price",
      editType: "text",
      render: (product) => (
        <span className="font-mono text-blue-600 dark:text-blue-400">
          ${product.price?.toFixed(2)}
        </span>
      ),
    },
    {
      label: "Stock",
      accessor: "stock",
      editType: "text",
      className: "hidden lg:table-cell",
      headerClassName: "hidden lg:table-cell",
    },
    {
      label: "Status",
      render: (product) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            product.stock > 0
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      ),
    },
  ];

  const filterOptions = [
    {
      label: "Category",
      key: "category",
      options: [
        { label: "Beauty", value: "beauty" },
        { label: "Fragrances", value: "fragrances" },
        { label: "Furniture", value: "furniture" },
        { label: "Groceries", value: "groceries" },
        { label: "Laptops", value: "laptops" },
        { label: "Smartphones", value: "smartphones" },
      ],
    },
  ];

  const renderExpanded = (product) => {
    const renderField = (label, icon, value) => (
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 tracking-wider">
          {label}
        </p>
        <div className="flex gap-2 text-sm text-gray-600 dark:text-gray-300 items-start">
          {React.createElement(icon, {
            size: 16,
            className: "text-gray-400 shrink-0 mt-0.5",
          })}
          <span className="line-clamp-3">{value}</span>
        </div>
      </div>
    );

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 tracking-wider">
              Description
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic border-l-2 border-blue-100 dark:border-blue-900/50 pl-4">
              {product.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderField("Rating", Star, `${product.rating} / 5`)}
            {renderField("Discount", Tag, `${product.discountPercentage}%`)}
            {renderField("SKU", BarChart, product.sku)}
            {renderField("Return Policy", ShoppingCart, product.returnPolicy)}
            {renderField("Shipping", Truck, product.shippingInformation)}
            {renderField("Warranty", ShieldCheck, product.warrantyInformation)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`p-4 transition-all duration-300 ${openIcons ? "sm:ml-64" : "md:ml-25"} mt-30 lg:mt-20`}
    >
      <AccordionTable
        data={products}
        isLoading={isLoading}
        columns={columns}
        renderExpanded={renderExpanded}
        params={params}
        onParamsChange={setParams}
        filterOptions={filterOptions}
        onAdd={() => setIsAddModalOpen(true)}
        onUpdate={handleUpdateProduct}
        addButtonLabel="Add New Product"
        searchPlaceholder="Search products by title, brand, category..."
      />

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
        title="Add New Product"
        fields={productFields}
      />
    </div>
  );
};
