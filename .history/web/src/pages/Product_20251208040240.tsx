"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import ProductCard from "../components/ProductAdmin/ProductCard";
import ProductDialog from "../components/ProductAdmin/ProductDialog";
import { mockMenuItems } from "../../mock/mockData";
import type { MenuItem } from "../../mock/mockData";
import { Plus, Search } from "lucide-react";

export default function Products() {
  const [items, setItems] = useState<MenuItem[]>(mockMenuItems);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<number | "all">("all");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // 🔍 Tìm kiếm + lọc theo loại
  const filtered = items.filter((i) => {
    const matchName = i.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filter === "all" || i.category_id === filter;
    return matchName && matchCategory;
  });

  // Đếm số lượng từng loại
  const countByCategory = {
    1: items.filter((i) => i.category_id === 1).length,
    2: items.filter((i) => i.category_id === 2).length,
    3: items.filter((i) => i.category_id === 3).length,
  };

  // ➕ Thêm sản phẩm
  const handleAdd = (data: MenuItem) => {
    setItems([
      ...items,
      {
        ...data,
        item_id: Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  };

  // ✏️ Sửa sản phẩm
  const handleEdit = (updated: MenuItem) => {
    setItems(items.map((i) => (i.item_id === updated.item_id ? updated : i)));
  };

  // 🗑️ Xóa sản phẩm
  const handleDelete = (id: number) => {
    setItems(items.filter((i) => i.item_id !== id));
  };

  // 👁️ Ẩn / Hiện sản phẩm
  const toggleVisible = (id: number) => {
    setItems(
      items.map((i) =>
        i.item_id === id ? { ...i, is_available: !i.is_available } : i
      )
    );
  };

  return (
    <div className="p-6">
      {/* Thanh tìm kiếm + nút thêm */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>

        <Button
          onClick={() => {
            setEditingItem(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" /> Thêm sản phẩm
        </Button>
      </div>

      {/* Bộ lọc loại sản phẩm */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: "all", label: "Tất cả", count: items.length },
          { id: 1, label: "🍕 Pizza", count: countByCategory[1] },
          { id: 2, label: "🍟 Món ăn kèm", count: countByCategory[2] },
          { id: 3, label: "🧃 Đồ uống", count: countByCategory[3] },
        ].map((cat) => (
          <Button
            key={cat.id}
            variant={filter === cat.id ? "default" : "outline"}
            onClick={() => setFilter(cat.id as number | "all")}
            className="flex items-center gap-2"
          >
            {cat.label}
            <Badge
              variant="secondary"
              className="text-xs px-2 py-0.5 bg-gray-100"
            >
              {cat.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Lưới sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <ProductCard
            key={item.item_id}
            item={item}
            onEdit={() => {
              setEditingItem(item);
              setIsDialogOpen(true);
            }}
            onDelete={() => handleDelete(item.item_id)}
            onToggleVisible={() => toggleVisible(item.item_id)}
          />
        ))}
      </div>

<ProductDialog
  open={open}
  onOpenChange={setOpen}
  item={selectedItem}
  onSave={handleSave}

  // 2 props bị thiếu
  categories={categories}
  onOpenAddCategory={() => setOpenAddCategory(true)}
/>
      <ProductDialog
    </div>
  );
}
