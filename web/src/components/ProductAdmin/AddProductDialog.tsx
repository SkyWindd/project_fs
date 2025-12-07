// src/components/ProductAdmin/ProductDialog.tsx
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { MenuItem, Category } from "../../../mock/mockData";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: MenuItem | null;
  onSave: (data: MenuItem) => void;
  categories: Category[];
  onOpenAddCategory: () => void;   // ⭐ THÊM MỚI
}

export default function ProductDialog({
  open,
  onOpenChange,
  item,
  onSave,
  categories,
  onOpenAddCategory
}: ProductDialogProps) {

  const [form, setForm] = useState<MenuItem>({
    item_id: 0,
    name: "",
    category_id: 1,
    description: "",
    price: 0,
    image_url: "",
    is_available: true,
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    if (item) setForm(item);
  }, [item]);

  const handleSave = () => {
    onSave(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {item ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          </DialogTitle>
        </DialogHeader>

        {/* Tên */}
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Tên sản phẩm"
          className="mb-3"
        />

        {/* Loại sản phẩm */}
        <div className="flex items-center gap-3 mb-3">
          <select
            className="border rounded p-2 w-full"
            value={form.category_id}
            onChange={(e) =>
              setForm({ ...form, category_id: Number(e.target.value) })
            }
          >
            {categories.map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.category_name}
              </option>
            ))}
          </select>

          <Button variant="outline" onClick={onOpenAddCategory}>
            + Thêm loại
          </Button>
        </div>

        {/* Giá */}
        <Input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          placeholder="Giá"
          className="mb-3"
        />

        {/* Image */}
        <Input
          value={form.image_url}
          onChange={(e) =>
            setForm({ ...form, image_url: e.target.value })
          }
          placeholder="URL hình ảnh"
          className="mb-3"
        />

        <Button onClick={handleSave} className="w-full">
          Lưu
        </Button>
      </DialogContent>
    </Dialog>
  );
}