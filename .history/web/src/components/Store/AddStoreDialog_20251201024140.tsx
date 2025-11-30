// src/components/stores/AddStoreDialog.tsx

import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Store } from "@/types/store";
import { Plus } from "lucide-react";

export function AddStoreDialog({
  onAdd,
}: {
  onAdd: (store: Store) => void;
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = () => {
    const newStore: Store = {
      store_id: Date.now(),
      store_name: name,
      address,
      city,
      latitude: 0,
      longitude: 0,
      phone_number: "0000000000",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
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
