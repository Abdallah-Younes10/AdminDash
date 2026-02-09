import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
  Check,
  X,
  Loader2,
} from "lucide-react";

export const TableRow = ({
  item,
  columns,
  isOpen,
  onToggle,
  isSelected,
  onSelect,
  onDelete,
  onUpdate,
  renderExpanded,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedValues, setEditedValues] = useState({});

  const handleEditClick = (e) => {
    e.stopPropagation();
    // Initialize with a fresh copy and flatten nested fields for easier editing
    setEditedValues({
      ...item,
      department: item.company?.department || item.department || "",
    });
    setIsEditing(true);
  };

  const handleChange = (key, value) => {
    setEditedValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    if (!onUpdate) return;

    setIsSaving(true);
    try {
      await onUpdate(item.id, editedValues);
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete this item?`)) return;

    setIsDeleting(true);
    try {
      // For now, we still handle local deletion in DataTable
      if (onDelete) onDelete(item.id);
      // console.log("Item deleted locally:", item.id);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <tr
        className={`group transition-all duration-200 border-x border-t ${
          isOpen
            ? "bg-blue-50/30 dark:bg-blue-900/10 border-blue-400/50"
            : "bg-white dark:bg-gray-800 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50"
        } ${isOpen ? "rounded-t-xl" : "shadow-sm rounded-xl border-b border-gray-100 dark:border-gray-700"}`}
      >
        <td className="p-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(item.id)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </td>
        {columns.map((col, idx) => {
          const isColumnEditable = col.accessor || col.editType;
          return (
            <td
              key={idx}
              className={`p-4 ${col.className || ""}`}
              onClick={!isEditing ? onToggle : undefined}
            >
              {isEditing && isColumnEditable ? (
                col.editType === "name" ? (
                  <div
                    className="flex gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="text"
                      value={editedValues.firstName || ""}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      className="w-20 p-1 text-xs border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <input
                      type="text"
                      value={editedValues.lastName || ""}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className="w-20 p-1 text-xs border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                ) : col.editType === "id" ? (
                  <span className="text-gray-400 dark:text-gray-500 italic">
                    {item.id}
                  </span>
                ) : (
                  <input
                    type="text"
                    value={editedValues[col.accessor] || ""}
                    onChange={(e) => handleChange(col.accessor, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full p-1 text-xs border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                )
              ) : col.render ? (
                col.render(item, isOpen, onToggle)
              ) : (
                <span className="text-gray-600 dark:text-gray-300">
                  {item[col.accessor]}
                </span>
              )}
            </td>
          );
        })}
        <td className="p-4">
          <div className="flex items-center justify-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                >
                  {isSaving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Check size={18} />
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEditClick}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  {isDeleting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </button>
              </>
            )}
          </div>
        </td>
      </tr>

      {/* Expanded Content */}
      {isOpen && (
        <tr className="border-x border-b border-blue-400/50 bg-blue-50/30 dark:bg-blue-900/10 rounded-b-xl transition-all duration-300">
          <td colSpan={columns.length + 2} className="p-0">
            <div className="p-6 border-t border-blue-100/50 dark:border-blue-800/20">
              {renderExpanded &&
                renderExpanded(item, {
                  isEditing,
                  editedValues,
                  onChange: handleChange,
                })}
            </div>
          </td>
        </tr>
      )}
      {!isOpen && (
        <tr className="h-2">
          <td colSpan={columns.length + 2}></td>
        </tr>
      )}
    </>
  );
};
