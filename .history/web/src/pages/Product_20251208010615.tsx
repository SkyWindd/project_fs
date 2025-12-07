// src/components/ProductAdmin/ProductDialog.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Select } from "../../components/ui/select"; // giả sử bạn có Select
import type { MenuItem, Category } from "../../../mock/mockData"; // chỉnh path nếu khác

// Thêm categories vào interface props:
export interface ProductDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item: MenuItem | null;
  onSave: (data: MenuItem) => void;
  categories?: Category[]; // <-- thêm dòng này
}

export default function ProductDialog({
  open,
  onOpenChange,
  item,
  onSave,
  categories = [], // cung cấp default [] để an toàn
}: ProductDialogProps) {
  const [name, setName] = useState(item?.name ?? "");
  const [price, setPrice] = useState(item?.price ?? 0);
  const [categoryId, setCategoryId] = useState<number | null>(item?.category_id ?? null);

  useEffect(() => {
    setName(item?.name ?? "");
    setPrice(item?.price ?? 0);
    setCategoryId(item?.category_id ?? null);
  }, [item]);

  const handleSave = () => {
    if (!name.trim()) return;
    const payload: MenuItem = {
      item_id: item?.item_id ?? Date.now(),
      name: name.trim(),
      price,
      category_id: categoryId ?? (categories[0]?.category_id ?? 0), // fallback
      is_available: item?.is_available ?? true,
      created_at: item?.created_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
      // thêm các field khác nếu MenuItem có
    };
    onSave(payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{item ? "Sửa sản phẩm" : "Thêm sản phẩm"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <label className="font-medium">Tên</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <label className="font-medium">Giá</label>
          <Input type="number" value={String(price)} onChange={(e) => setPrice(Number(e.target.value))} />

          <label className="font-medium">Loại</label>
          {/* Ví dụ simple select */}
          <select
            value={categoryId ?? ""}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full border rounded p-2"
          >
            <option value="">-- Chọn loại --</option>
            {categories.map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.category_name}
              </option>
            ))}
          </select>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
