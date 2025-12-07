import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import ProductCard from "../components/ProductAdmin/ProductCard";
import ProductDialog from "../components/ProductAdmin/ProductDialog";

import { mockMenuItems, mockCategories } from "../../mock/mockData";
import type { MenuItem, Category } from "../../mock/mockData";

import { Plus, Search } from "lucide-react";

export default function Products() {
  // ===========================
  // STATE
  // ===========================
  const [items, setItems] = useState<MenuItem[]>(mockMenuItems);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 👉 categories có LocalStorage
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : mockCategories;
  });

  const [filter, setFilter] = useState<number | "all">("all");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Dialog thêm loại
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState<boolean>(false);

  // Lưu category vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);


  // ===========================
  // FILTER + SEARCH
  // ===========================
  const filtered = items.filter((i) => {
    const matchName = i.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filter === "all" || i.category_id === filter;
    return matchName && matchCategory;
  });

  // Đếm từng loại
  const countByCategory = Object.fromEntries(
    categories.map((cat) => [
      cat.category_id,
      items.filter((i) => i.category_id === cat.category_id).length,
    ])
  );


  // ===========================
  // CRUD SẢN PHẨM
  // ===========================
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

  const handleEdit = (updated: MenuItem) => {
    setItems(items.map((i) => (i.item_id === updated.item_id ? updated : i)));
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((i) => i.item_id !== id));
  };

  const toggleVisible = (id: number) => {
    setItems(
      items.map((i) =>
        i.item_id === id ? { ...i, is_available: !i.is_available } : i
      )
    );
  };


  // ===========================
  // CRUD LOẠI SẢN PHẨM
  // ===========================
  const handleAddCategory = (cat: Category) => {
    setCategories([...categories, cat]);
  };


  // ===========================
  // RENDER
  // ===========================
  return (
    <div className="p-6">

      {/* =================== Thanh tìm kiếm + thêm =================== */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">

        {/* Ô tìm kiếm */}
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>

        {/* Nút thêm */}
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setEditingItem(null);
              setIsDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Thêm sản phẩm
          </Button>

          {/* Nút thêm loại */}
          <Button
            variant="outline"
            onClick={() => setIsCategoryDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Thêm loại
          </Button>
        </div>
      </div>


      {/* =================== Bộ lọc loại =================== */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          Tất cả
          <Badge className="ml-2">{items.length}</Badge>
        </Button>

        {categories.map((cat) => (
          <Button
            key={cat.category_id}
            variant={filter === cat.category_id ? "default" : "outline"}
            onClick={() => setFilter(cat.category_id)}
            className="flex items-center gap-2"
          >
            {cat.category_name}
            <Badge variant="secondary">
              {countByCategory[cat.category_id] ?? 0}
            </Badge>
          </Button>
        ))}
      </div>


      {/* =================== Lưới sản phẩm =================== */}
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


// ... phần trên giữ nguyên

<ProductDialog
  open={isDialogOpen}
  onOpenChange={setIsDialogOpen}
  item={editingItem}
  onSave={editingItem ? handleEdit : handleAdd}
  categories={categories}
  onOpenAddCategory={() => setIsCategoryDialogOpen(true)} // Truyền đúng prop
/>

// ... phần dưới giữ nguyên


      {/* =================== Dialog Thêm loại =================== */}
      <AddCategoryDialog
        open={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
        onSave={handleAddCategory}
      />

    </div>
  );
}