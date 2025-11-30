// src/components/store/StoreFormDialog.tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Store } from "@/mock/mockData";

export function StoreFormDialog({
  open,
  onClose,
  onSubmit,
  defaultValues,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Store) => void;
  defaultValues?: Store;
}) {
  const [form, setForm] = useState<Store>(
    defaultValues ?? {
      store_id: Date.now(),
      store_name: "",
      address: "",
      city: "",
      latitude: 0,
      longitude: 0,
      phone_number: "",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  );

  function handleChange(key: keyof Store, value: any) {
    setForm({ ...form, [key]: value });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Chỉnh sửa chi nhánh" : "Thêm chi nhánh mới"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Tên cửa hàng"
            value={form.store_name}
            onChange={(e) => handleChange("store_name", e.target.value)}
          />
          <Input
            placeholder="Địa chỉ"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <Input
            placeholder="Thành phố"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          <Input
            placeholder="Số điện thoại"
            value={form.phone_number}
            onChange={(e) => handleChange("phone_number", e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Hủy</Button>
            <Button onClick={() => onSubmit(form)}>Lưu</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
