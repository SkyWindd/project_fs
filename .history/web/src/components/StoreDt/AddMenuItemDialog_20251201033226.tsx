import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

export default function AddMenuItemDialog({ onAdd, categories, items }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const nextId = items.length ? items[items.length - 1].item_id + 1 : 1;

  const handleSubmit = () => {
    const today = new Date().toISOString();

    onAdd({
      item_id: nextId,
      name,
      description: desc,
      price: Number(price),
      category_id: Number(categoryId),
      is_available: true,
      created_at: today,
      updated_at: today,
      image_url: "/default.jpeg",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 text-white">+ Thêm món</Button>
      </DialogTrigger>

      <DialogContent className="space-y-3">
        <input
          className="border p-2 w-full rounded"
          placeholder="Tên món"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="border p-2 w-full rounded"
          placeholder="Mô tả"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="number"
          className="border p-2 w-full rounded"
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Chọn category</option>
          {categories.map((c) => (
            <option key={c.category_id} value={c.category_id}>
              {c.name}
            </option>
          ))}
        </select>

        <DialogFooter>
          <Button onClick={handleSubmit}>Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
