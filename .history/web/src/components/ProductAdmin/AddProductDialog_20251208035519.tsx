"use client";
import { useState, useEffect } from "react";
import type { MenuItem, Category } from "../../../mock/mockData";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: MenuItem | null;
  onSave: (data: MenuItem) => void;
  categories: Category[];
  onOpenAddCategory: () => void;
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
    if (open) {
      setName(item?.name ?? "");
      setPrice(item?.price?.toString() ?? "");
      setCategoryId(item?.category_id ?? "");
    }
  }, [open, item]);

  const handleSave = () => {
    if (!name.trim() || !price.trim() || !categoryId) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const updated: MenuItem = {
      item_id: item?.item_id ?? Date.now(),
      name: name.trim(),
      price: Number(price),
      category_id: Number(categoryId),
      image_url: item?.image_url ?? "",
      description: item?.description ?? "",
      is_available: item?.is_available ?? true,
      created_at: item?.created_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onSave(updated);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-xl w-[400px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {item ? "Chỉnh sửa" : "Thêm sản phẩm"}
        </h2>

        {/* Tên */}
        <input
          className="border w-full p-2 rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên sản phẩm..."
        />

        {/* Giá */}
        <input
          className="border w-full p-2 rounded mb-3"
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Giá..."
        />

        {/* Category + Nút thêm */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <label className="font-medium">Loại sản phẩm</label>
            <button
              className="text-blue-600 text-sm hover:underline"
              onClick={onOpenAddCategory}
            >
              + Thêm loại
            </button>
          </div>

          <select
            className="border w-full p-2 rounded"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            <option value="">Chọn loại...</option>
            {categories.map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
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
            {item ? "Lưu" : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
}
