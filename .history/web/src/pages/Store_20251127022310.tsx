// src/pages/admin/store/StorePage.tsx
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { stores as mockStores, Store } from "@/mock/mockData";
import { StoreTable } from "../components/Store/StoreTable";
import { StoreFormDialog } from "@/components/store/StoreFormDialog";

export default function StorePage() {
  const [stores, setStores] = useState<Store[]>(mockStores);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Store | null>(null);

  function handleAdd() {
    setEditing(null);
    setOpen(true);
  }

  function handleEdit(store: Store) {
    setEditing(store);
    setOpen(true);
  }

  function handleDelete(store: Store) {
    setStores(stores.filter((s) => s.store_id !== store.store_id));
  }

  function handleSubmit(store: Store) {
    if (editing) {
      setStores(stores.map((s) => (s.store_id === store.store_id ? store : s)));
    } else {
      setStores([...stores, store]);
    }
    setOpen(false);
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý chi nhánh</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Thêm chi nhánh
        </Button>
      </div>

      <StoreTable stores={stores} onEdit={handleEdit} onDelete={handleDelete} />

      <StoreFormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={editing ?? undefined}
      />
    </div>
  );
}
