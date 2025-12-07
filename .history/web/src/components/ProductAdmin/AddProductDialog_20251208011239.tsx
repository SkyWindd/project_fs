import React, { useState } from "react";
import { Product, Category } from "../../../mock/mockData";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  onSave: (newProduct: Product) => void;
}

export default function AddProductDialog({
  open,
  onOpenChange,
  categories,
  onSave,
}: AddProductDialogProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  const handleAdd = () => {
    if (!name.trim() || !price.trim() || !categoryId) return;

    const newProduct: Product = {
      product_id: Date.now(),
      product_name: name.trim(),
      price: Number(price),
      category_id: Number(categoryId),
    };

    onSave(newProduct);
    setName("");
    setPrice("");
    setCategoryId("");
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl shadow-lg w-[380px]">
        <h2 className="text-lg font-semibold mb-3">Thêm Sản Phẩm</h2>

        {/* Tên sản phẩm */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên sản phẩm..."
          className="w-full border p-2 rounded mb-3"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />

        {/* Giá */}
        <input
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Giá..."
          className="w-full border p-2 rounded mb-3"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />

        {/* Category */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="w-full border p-2 rounded mb-3"
        >
          <option value="">Chọn category...</option>
          {categories.map((c) => (
            <option key={c.category_id} value={c.category_id}>
              {c.category_name}
            </option>
          ))}
        </select>

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
