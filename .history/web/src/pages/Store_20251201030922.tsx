// StorePage.tsx
import { AddStoreDialog } from "../../components/stores/AddStoreDialog";
import { Store } from "../../../mock/mockData";

export default function StorePage() {
  const [stores, setStores] = useState<Store[]>(mockStores);

  const handleAddStore = (store: Store) => {
    setStores([...stores, store]);
  };

  const nextId = stores.length > 0
    ? stores[stores.length - 1].store_id + 1
    : 1;

  return (
    <div>
      <AddStoreDialog onAdd={handleAddStore} nextId={nextId} />
    </div>
  );
}
