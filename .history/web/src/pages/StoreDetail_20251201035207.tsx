import { useParams } from "react-router-dom";

import StoreHeader from "../components/StoreDt/StoreHeader";
import MenuGrid from "../components/StoreDt/MenuGrid";

import {
  stores,
  mockMenuItems,
  mockCategories,
} from "../../mock/mockData";

export default function StoreDetail() {
  const { id } = useParams();
  const store = stores.find((s) => s.store_id === Number(id));

  if (!store) return <p>Không tìm thấy cửa hàng</p>;

  return (
    <div className="p-4">
      <StoreHeader store={store} />

      <div className="flex gap-3 mt-2">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
          + Thêm món
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          + Thêm Category
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-6">Menu</h3>

      <MenuGrid items={mockMenuItems} categories={mockCategories} />
    </div>
  );
}
