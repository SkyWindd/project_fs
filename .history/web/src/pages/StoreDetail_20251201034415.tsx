import React from "react";
import { useParams } from "react-router-dom";
import {
  stores,
  mockCategories,
  mockMenuItems,
  type Store,
  type Category,
  type MenuItem,
} from "../../mock/mockData";

import CategorySection from "../components/StoreDt/CategorySection";
import AddCategoryDialog from "../components/StoreDt/AddCategoryDialog";
import AddMenuItemDialog from "../components/StoreDt/AddMenuItemDialog";

export default function StoreDetail() {
  const { id } = useParams();
  const storeId = Number(id);

  const store: Store | undefined = stores.find((s) => s.store_id === storeId);

  if (!store) {
    return <p className="text-red-600 p-4 text-lg">Store không tồn tại.</p>;
  }

  const [categories, setCategories] =
    React.useState<Category[]>(mockCategories);
  const [items, setItems] = React.useState<MenuItem[]>(mockMenuItems);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">{store.store_name}</h1>

      {categories.map((cat) => {
        const catItems = items.filter(
          (item) => item.category_id === cat.category_id
        );

        return (
          <CategorySection
            key={cat.category_id}
            category={cat}
            items={catItems}
          />
        );
      })}
    </div>
  );
}
