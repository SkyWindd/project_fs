import React, { useState, useEffect } from "react";
import type { MenuItem, Category } from "../../../mock/mockData";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: MenuItem | null;
  onSave: (item: MenuItem) => void;

  categories: Category[];
  onOpenAddCategory: (open: boolean) => void; // ⬅ thêm hàm này
}

export default function ProductDialog({
  open,
  onOpenChange,
  item,
  onSave,
  categories,
  onOpenAddCategory,
}: ProductDialogProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setPrice(String(item.price));
      setCategoryId(item.category_id);
    } else {
      setName("");
      setPrice("");
      setCategoryId("");
    }
  }, [item]);

  const handleSave = () => {
    if (!name.trim() || !price || !categoryId) return;

    const newItem: MenuItem = {
      ...item,
      item_id: item?.item_id ?? Date.now(),
      name: name.trim(),
      price: Number(price),
      category_id: Number(categoryId),
      is_available: item?.is_available ?? true,
      created_at: item?.created_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onSave(newItem);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[420px]">
        <h2 className="text-xl font-semibold mb-4">
          {item ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên sản phẩm..."
          className="w-full border p-2 rounded mb-3"
        />

        <input
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Giá..."
          className="w-full border p-2 rounded mb-3"
        />

        {/* Category + nút thêm */}
        <div className="flex gap-2 mb-3">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full border p-2 rounded"
          >
            <option value="">Chọn loại...</option>
            {categories.map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.category_name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => onOpenAddCategory(true)}
            className="px-3 py-2 rounded bg-blue-600 text-white"
          >
            +
          </button>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => onOpenChange(false)}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Hủy
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-1 bg-green-600 text-white rounded"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
