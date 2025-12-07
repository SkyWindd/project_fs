import React, { useState } from "react";
import type { Category } from "../../../mock/mockData";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (newCategory: Category) => void;
}

export default function AddCategoryDialog({
  open,
  onOpenChange,
  onSave,
}: AddCategoryDialogProps) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;

    const newCategory: Category = {
      category_id: Date.now(),
      category_name: name.trim(),
    };

    onSave(newCategory);
    setName("");
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl shadow-lg w-[350px]">
        <h2 className="text-lg font-semibold mb-3">Thêm Category</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên category..."
          className="w-full border p-2 rounded mb-3"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => onOpenChange(false)}
            className="px-3 py-1 rounded bg-gray-300"
          >
            Hủy
          </button>

          <button
            onClick={handleAdd}
            className="px-3 py-1 rounded bg-green-600 text-white"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
