import React, { useState } from "react";
import type { MenuItem, Category } from "../../../mock/mockData";

interface AddMenuItemDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (item: MenuItem) => void;
  categories: Category[];
}

export default function AddMenuItemDialog({
  open,
  onClose,
  onAdd,
  categories,
}: AddMenuItemDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [isAvailable, setIsAvailable] = useState(true);

  if (!open) return null;

  const handleAdd = () => {
    if (!name.trim() || !price || !categoryId) return;

    const now = new Date().toLocaleString("vi-VN");

    const newItem: MenuItem = {
      item_id: Date.now(),
      name,
      description,
      image_url: imageUrl || "",
      price: Number(price),
      category_id: categoryId,
      is_available: isAvailable,
      created_at: now,
      updated_at: now,
    };

    onAdd(newItem);
    onClose();

    // Reset
    setName("");
    setDescription("");
    setPrice("");
    setImageUrl("");
    setCategoryId(null);
    setIsAvailable(true);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Thêm món mới</h2>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Tên món..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded mb-3"
          placeholder="Mô tả..."
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Giá..."
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="URL hình ảnh..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded mb-3"
          value={categoryId ?? ""}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((c) => (
            <option key={c.category_id} value={c.category_id}>
              {c.category_name}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
          <span>Còn bán</span>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-gray-300">
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
