"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

import type { MenuItem, Category } from "../../../mock/mockData";

// 🔥 THÊM PROP categories + onOpenAddCategory
export interface ProductDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
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
  const [form, setForm] = useState<MenuItem>({
    item_id: 0,
    name: "",
    description: "",
    price: 0,
    category_id: 1,
    image_url: "",
    is_available: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  useEffect(() => {
    if (item) setForm(item);
  }, [item]);

  const handleSave = () => {
    onSave({
      ...form,
      updated_at: new Date().toISOString(),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {item ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </DialogTitle>
        </DialogHeader>

        {/* Form nội dung */}
        <div className="space-y-4 py-2 text-[15px] leading-relaxed">
          <div>
            <Label className="font-medium mb-1 block">Tên sản phẩm</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nhập tên sản phẩm..."
            />
          </div>

          <div>
            <Label className="font-medium mb-1 block">Mô tả</Label>
            <Input
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Nhập mô tả sản phẩm..."
            />
          </div>

          <div>
            <Label className="font-medium mb-1 block">Giá (₫)</Label>
            <Input
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              placeholder="Nhập giá sản phẩm..."
            />
          </div>

          {/* Category Select */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <Label className="font-medium">Loại sản phẩm</Label>

              {/* 🔥 Nút mở dialog thêm category */}
              <button
                className="text-blue-600 text-sm hover:underline"
                onClick={onOpenAddCategory}
              >
                + Thêm loại
              </button>
            </div>

            <Select
              value={String(form.category_id)}
              onValueChange={(val) =>
                setForm({ ...form, category_id: Number(val) })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại sản phẩm" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.category_id} value={String(c.category_id)}>
                    {c.category_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="font-medium mb-1 block">Ảnh sản phẩm</Label>
            <Input
              value={form.image_url}
              onChange={(e) =>
                setForm({ ...form, image_url: e.target.value })
              }
              placeholder="Dán liên kết ảnh sản phẩm..."
            />
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSave}>
            {item ? "Lưu thay đổi" : "Thêm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
