import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

export default function AddCategoryDialog({ onAdd, categories }) {
  const [name, setName] = useState("");

  const nextId =
    categories.length ? categories[categories.length - 1].category_id + 1 : 1;

  const handleSubmit = () => {
    const today = new Date().toISOString();

    onAdd({
      category_id: nextId,
      name,
      description: "",
      created_at: today,
      updated_at: today,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Thêm category</Button>
      </DialogTrigger>

      <DialogContent>
        <input
          className="border p-2 w-full rounded"
          placeholder="Tên category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <DialogFooter>
          <Button onClick={handleSubmit}>Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
