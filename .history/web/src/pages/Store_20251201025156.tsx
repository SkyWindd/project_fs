// src/pages/admin/stores/StorePage.tsx

import React, { useState } from "react";
import { StoreTable } from "../components/Store/StoreTable";
import { AddStoreDialog } from "../../../components/Store/AddStoreDialog";
import { stores as mockStores } from "../../../../mock/mockData";
import type { Store } from "../../../../mock/mockData";

export default function StorePage() {
  const [list, setList] = useState<Store[]>(mockStores);

  const activeStores = list.filter((s) => s.is_active);

  const handleAddStore = (store: Store) => {
    setList((prev) => [...prev, store]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Danh sách cửa hàng</h2>
        <AddStoreDialog onAdd={handleAddStore} />
      </div>

      <StoreTable stores={activeStores} />
    </div>
  );
}
