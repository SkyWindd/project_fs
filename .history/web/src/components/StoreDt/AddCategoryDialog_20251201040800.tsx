import React, { useState } from "react";
import type { Category } from "../../../mock/mockData";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (category: Category) => void;
}

export default function AddCategoryDialog({ open, onClose, onAdd }: Props) {
  const [name, setName] = useState("");

  if (!open) return null;

  const handleAdd = () => {
    const newCategory: Category = {
      category_id: Date.now(),
      category_name: name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onAdd(newCategory);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl w-[380px]">
        <h2 className="text-lg font-semibold mb-3">Thêm Category</h2>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Tên category..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
            Hủy
          </button>
          <button onClick={handleAdd} className="px-3 py-1 bg-blue-600 text-white rounded">
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
