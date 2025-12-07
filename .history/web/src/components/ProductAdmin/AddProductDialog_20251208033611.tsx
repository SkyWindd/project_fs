import { useState } from "react";
import type { MenuItem, Category } from "../../../mock/mockData";

// Định nghĩa type Product nếu chưa có
export interface Product {
  product_id: number;
  product_name: string;
  price: number;
  category_id: number;
}

export interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: MenuItem | null;
  onSave: (data: Product) => void; // Thay MenuItem bằng Product nếu cần
  categories: Category[];
  onAddCategory: (category: Category) => void; // Thêm prop này
}

export default function AddProductDialog({
  open,
  onOpenChange,
  categories,
  onSave,
  onAddCategory,
  item, // Có thể sử dụng nếu cần chỉnh sửa sản phẩm
}: AddProductDialogProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  // 🔥 mini popup thêm category
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Reset form khi mở dialog (có thể dùng useEffect nếu cần)
  // useEffect(() => {
  //   if (open) {
  //     if (item) {
  //       // Chế độ chỉnh sửa
  //       setName(item.product_name || "");
  //       setPrice(item.price?.toString() || "");
  //       setCategoryId(item.category_id || "");
  //     } else {
  //       // Chế độ thêm mới
  //       setName("");
  //       setPrice("");
  //       setCategoryId("");
  //     }
  //   }
  // }, [open, item]);

  const handleAdd = () => {
    if (!name.trim() || !price.trim() || !categoryId) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const priceNumber = Number(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert("Giá sản phẩm phải là số lớn hơn 0!");
      return;
    }

    const newProduct: Product = {
      product_id: Date.now(), // Nếu là edit, nên dùng item?.product_id
      product_name: name.trim(),
      price: priceNumber,
      category_id: Number(categoryId),
    };

    onSave(newProduct);
    setName("");
    setPrice("");
    setCategoryId("");
    onOpenChange(false);
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      alert("Vui lòng nhập tên category!");
      return;
    }

    // Kiểm tra trùng tên category
    const isDuplicate = categories.some(
      (c) => c.category_name.toLowerCase() === newCategoryName.trim().toLowerCase()
    );
    
    if (isDuplicate) {
      alert("Category này đã tồn tại!");
      return;
    }

    const newCate: Category = {
      category_id: Date.now(),
      category_name: newCategoryName.trim(),
    };

    onAddCategory(newCate);

    // chọn luôn category vừa tạo
    setCategoryId(newCate.category_id);

    setNewCategoryName("");
    setShowAddCategory(false);
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
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
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
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />

        {/* Category + nút thêm */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <label className="font-medium">Category</label>
            <button
              type="button"
              className="text-blue-600 text-sm hover:underline"
              onClick={() => setShowAddCategory(true)}
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
            onClick={() => {
              setName("");
              setPrice("");
              setCategoryId("");
              onOpenChange(false);
            }}
            className="px-3 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={handleAdd}
            className="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
            disabled={!name.trim() || !price.trim() || !categoryId}
          >
            {item ? "Cập Nhật" : "Thêm"}
          </button>
        </div>
      </div>

      {/* MINI POPUP ADD CATEGORY */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
          <div className="bg-white p-4 rounded-lg shadow-xl w-[320px] mx-4">
            <h3 className="text-lg font-semibold mb-3">Thêm Category</h3>

            <input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Tên category..."
              className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddCategory(false)}
                className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                disabled={!newCategoryName.trim()}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}