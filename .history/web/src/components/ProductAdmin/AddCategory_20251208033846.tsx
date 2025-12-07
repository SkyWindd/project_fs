import { useState, useEffect } from "react";
import type { Category } from "..//../../mock/mockData";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (category: Category) => void;
}

export default function AddCategoryDialog({
  open,
  onOpenChange,
  onSave,
}: AddCategoryDialogProps) {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (open) {
      setCategoryName("");
    }
  }, [open]);

  const handleSave = () => {
    if (!categoryName.trim()) {
      alert("Vui lòng nhập tên loại!");
      return;
    }

    const newCategory: Category = {
      category_id: Date.now(),
      category_name: categoryName.trim(),
    };

    onSave(newCategory);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-xl shadow-lg w-[380px] mx-4">
        <h2 className="text-lg font-semibold mb-3">Thêm Loại Sản Phẩm</h2>

        <input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Tên loại sản phẩm..."
          className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-3 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            disabled={!categoryName.trim()}
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}