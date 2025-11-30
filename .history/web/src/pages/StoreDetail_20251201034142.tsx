import React from "react";
import { useParams } from "react-router-dom";
import {
  mockStores,
  mockCategories,
  mockMenuItems,
  type Store,
  type Category,
  type MenuItem,
} from "../mock/mockData";

import CategorySection from "../components/StoreDt/CategorySection";
import AddCategoryDialog from "../components/StoreDt/AddCategoryDialog";
import AddMenuItemDialog from "../components/StoreDt/AddMenuItemDialog";

export default function StoreDetail() {
  const { id } = useParams();
  const storeId = Number(id);

  // Lấy store theo ID
  const store: Store | undefined = mockStores.find(
    (s) => s.store_id === storeId
  );

  // Không tìm thấy store
  if (!store) {
    return <p className="p-5 text-red-600 text-lg">Store không tồn tại.</p>;
  }

  // State mở dialog
  const [openAddCat, setOpenAddCat] = React.useState(false);
  const [openAddItem, setOpenAddItem] = React.useState(false);

  // State data
  const [categories, setCategories] =
    React.useState<Category[]>(mockCategories);

  const [items, setItems] = React.useState<MenuItem[]>(mockMenuItems);

  // Thêm danh mục
  const handleAddCategory = (cat: Category) => {
    setCategories([...categories, cat]);
  };

  // Thêm món
  const handleAddItem = (item: MenuItem) => {
    setItems([...items, item]);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">{store.store_name}</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setOpenAddCat(true)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            + Category
          </button>

          <button
            onClick={() => setOpenAddItem(true)}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            + Menu Item
          </button>
        </div>
      </div>

      {/* List categories + items */}
      {categories.map((cat) => {
        const catItems = items.filter(
          (i) => i.category_id === cat.category_id
        );

        return (
          <CategorySection
            key={cat.category_id}
            category={cat}
            items={catItems}
          />
        );
      })}

      {/* Dialog thêm category */}
      <AddCategoryDialog
        open={openAddCat}
        onClose={() => setOpenAddCat(false)}
        onAdd={handleAddCategory}
      />

      {/* Dialog thêm item */}
      <AddMenuItemDialog
        open={openAddItem}
        onClose={() => setOpenAddItem(false)}
        onAdd={handleAddItem}
        categories={categories}
      />
    </div>
  );
}
