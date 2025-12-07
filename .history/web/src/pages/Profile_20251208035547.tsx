"use client";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import ProductCard from "../components/ProductAdmin/ProductCard";
import ProductDialog from "../components/ProductAdmin/ProductDialog";
import AddCategoryDialog from "../components/ProductAdmin/AddCategory";

import { mockMenuItems, mockCategories } from "../../mock/mockData";
import type { MenuItem, Category } from "../../mock/mockData";

import { Plus, Search } from "lucide-react";

export default function Products() {
  const [items, setItems] = useState<MenuItem[]>(mockMenuItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<number | "all">("all");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ⭐ Categories có LocalStorage
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : mockCategories;
  });

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // Filter + search
  const filtered = items.filter((i) => {
    const matchName = i.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filter === "all" || i.category_id === filter;
    return matchName && matchCategory;
  });

  const countByCategory = Object.fromEntries(
    categories.map((c) => [
      c.category_id,
      items.filter((i) => i.category_id === c.category_id).length,
    ])
  );

  // CRUD
  const handleAdd = (data: MenuItem) => setItems([...items, data]);
  const handleEdit = (u: MenuItem) =>
    setItems(items.map((i) => (i.item_id === u.item_id ? u : i)));
  const handleDelete = (id: number) =>
    setItems(items.filter((i) => i.item_id !== id));
  const toggleVisible = (id: number) =>
    setItems(
      items.map((i) =>
        i.item_id === id ? { ...i, is_available: !i.is_available } : i
      )
    );

  const handleAddCategory = (c: Category) => setCategories([...categories, c]);

  return (
    <div className="p-6">
      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-3">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
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

      {/* Categories filter */}
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
          >
            {cat.category_name}
            <Badge className="ml-2">{countByCategory[cat.category_id]}</Badge>
          </Button>
        ))}
      </div>

      {/* Product grid */}
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

      {/* Dialogs */}
      <ProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        item={editingItem}
        onSave={editingItem ? handleEdit : handleAdd}
        categories={categories}
        onOpenAddCategory={() => setIsCategoryDialogOpen(true)}
      />

      <AddCategoryDialog
        open={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
        onSave={handleAddCategory}
      />
    </div>
  );
}
