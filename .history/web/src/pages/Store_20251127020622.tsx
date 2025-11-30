// src/pages/admin/store/StorePage.tsx

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";

import { mockStores } from "../../mock/mockData";
import { Store } from "@/lib/types";

import { StoreTable } from "@/components/store/StoreTable";
import { StoreFormDialog } from "@/components/store/StoreFormDialog";

export default function StorePage() {
  const [stores, setStores] = useState<Store[]>(mockStores);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);

  function handleAdd() {
    setEditingStore(null);
    setDialogOpen(true);
  }

  function handleEdit(store: Store) {
    setEditingStore(store);
    setDialogOpen(true);
  }

  function handleDelete(store: Store) {
    setStores(stores.filter((s) => s.store_id !== store.store_id));
  }

  function handleSubmit(data: Store) {
    if (editingStore) {
      // update
      setStores(stores.map((s) => (s.store_id === data.store_id ? data : s)));
    } else {
      // add new
      setStores([...stores, data]);
    }

    setDialogOpen(false);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Quản lý chi nhánh</h1>

        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Thêm chi nhánh
        </Button>
      </div>

      <StoreTable
        stores={stores}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <StoreFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={editingStore ?? undefined}
      />
    </div>
  );
}
