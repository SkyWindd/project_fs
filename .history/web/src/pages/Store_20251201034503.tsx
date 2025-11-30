
import { StoreTable } from "../components/Store/StoreTable";
import { AddStoreDialog } from "../components/Store/AddStoreDialog";
import { stores as mockStores } from "../../mock/mockData";
import type { Store } from "../../mock/mockData";

export default function StorePage() {
  const [list, setList] = useState<Store[]>(mockStores);

  const handleAddStore = (store: Store) => {
    setList((prev) => [...prev, store]);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Danh sách cửa hàng</h2>
        <AddStoreDialog onAdd={handleAddStore} stores={list} />
        
      </div>

      {/* Truyền toàn bộ list, không lọc is_active */}
      <StoreTable stores={list} />
    </div>
  );
}
