// src/components/stores/AddStoreDialog.tsx
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

interface AddStoreDialogProps {
  stores: Store[]; // danh sách hiện có để tính ID
  onAdd: (store: Store) => void;
}

export function AddStoreDialog({ stores, onAdd }: AddStoreDialogProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!name || !address || !city) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // ID tự tăng dựa trên store hiện có
    const nextId = stores.length > 0 ? Math.max(...stores.map(s => s.store_id)) + 1 : 1;

    const newStore: Store = {
      store_id: nextId,
      store_name: name,
      address,
      city,
      latitude: 0,
      longitude: 0,
      phone_number: "0000000000",
      is_active: true,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    };

    onAdd(newStore);

    // Reset input
    setName("");
    setAddress("");
    setCity("");

    // Đóng dialog
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
