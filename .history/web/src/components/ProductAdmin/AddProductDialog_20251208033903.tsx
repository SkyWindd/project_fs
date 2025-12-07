import { useState, useEffect } from "react";
import type { MenuItem, Category } from "../../mock/mockData";

export interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: MenuItem | null;
  onSave: (data: MenuItem) => void;
  categories: Category[]; // Thêm dòng này
  onOpenAddCategory: () => void; // Thêm dòng này
}

export default function ProductDialog({
  open,
  onOpenChange,
  item,
  onSave,
  categories, // Thêm prop này
  onOpenAddCategory, // Thêm prop này
}: ProductDialogProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  // Reset form khi mở dialog
  useEffect(() => {
    if (open) {
      if (item) {
        // Chế độ chỉnh sửa
        setName(item.name || "");
        setPrice(item.price?.toString() || "");
        setCategoryId(item.category_id || "");
      } else {
        // Chế độ thêm mới
        setName("");
        setPrice("");
        setCategoryId("");
      }
    }
  }, [open, item]);

  const handleSave = () => {
    if (!name.trim() || !price.trim() || !categoryId) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const priceNumber = Number(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert("Giá sản phẩm phải là số lớn hơn 0!");
      return;
    }

    const updatedItem: MenuItem = {
      ...(item || {}),
      item_id: item?.item_id || Date.now(),
      name: name.trim(),
      price: priceNumber,
      category_id: Number(categoryId),
      created_at: item?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_available: item?.is_available ?? true,
    };

    onSave(updatedItem);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-xl shadow-lg w-[380px] mx-4">
        <h2 className="text-lg font-semibold mb-3">
          {item ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm"}
        </h2>

        {/* Tên sản phẩm */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên sản phẩm..."
          className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />

        {/* Giá */}
        <input
          value={price}
          type="number"
          min="0"
          step="1000"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Giá..."
          className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />

        {/* Category + nút thêm */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <label className="font-medium">Category</label>
            <button
              type="button"
              className="text-blue-600 text-sm hover:underline"
              onClick={onOpenAddCategory} // Gọi prop khi click
            >
              + Thêm Category
            </button>
          </div>

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn category...</option>
            {categories.map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Nút */}
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
            className="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
            disabled={!name.trim() || !price.trim() || !categoryId}
          >
            {item ? "Cập Nhật" : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
}