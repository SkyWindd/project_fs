import React, { useState } from "react";
import type { Category } from "../../../mock/mockData";

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newCategory: Category) => void;
}

export default function AddCategoryDialog({
  open,
  onClose,
  onAdd,
}: AddCategoryDialogProps) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    const newCategory: Category = {
      category_id: Date.now(),
      category_name: name,
    };

    onAdd(newCategory);
    setName("");
    onClose();
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
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
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
