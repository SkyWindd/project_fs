// src/components/Store/AddStoreDialog.tsx

import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import type { Store } from "../../../mock/mockData";
import { Plus } from "lucide-react";

export function AddStoreDialog({
  onAdd,
  stores,
}: {
  onAdd: (store: Store) => void;
  stores: Store[];
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  // 🔥 Tính ID mới
  const nextId =
    stores.length > 0
      ? stores[stores.length - 1].store_id + 1
      : 1;

  const handleSubmit = () => {
    const now = new Date().toLocaleString("vi-VN");

    const newStore: Store = {
      store_id: nextId,
      store_name: name,
      address,
      city,
      latitude: 0,
      longitude: 0,
      phone_number: "0000000000",
      is_active: true,
      created_at: now,
      updated_at: now,
    };

    onAdd(newStore);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Thêm nhà hàng
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm nhà hàng mới</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            placeholder="Tên nhà hàng"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            placeholder="Thành phố"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
