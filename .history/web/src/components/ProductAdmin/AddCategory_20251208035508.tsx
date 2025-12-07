"use client";
import { useState, useEffect } from "react";
import type { Category } from "../../../mock/mockData";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Category) => void;
}

export default function AddCategoryDialog({
  open,
  onOpenChange,
  onSave,
}: AddCategoryDialogProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) setName("");
  }, [open]);

  const handleSave = () => {
    if (!name.trim()) {
      alert("Tên loại sản phẩm không được để trống!");
      return;
    }

    const newCat: Category = {
      category_id: Date.now(),
      category_name: name.trim(),
    };

    onSave(newCat);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-xl shadow-lg w-[360px]">
        <h2 className="text-lg font-semibold mb-3">Thêm loại sản phẩm</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên loại..."
          className="w-full border p-2 rounded mb-4 focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </button>
          <button
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleSave}
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
