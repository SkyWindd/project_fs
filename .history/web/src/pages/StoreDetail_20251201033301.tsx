import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { stores, categor, menuItems } from "../../mock/mockData";

import StoreHeader from "../../components/StoreD/StoreHeader";
import CategorySection from "../../components/store/CategorySection";
import AddCategoryDialog from "../../components/store/AddCategoryDialog";
import AddMenuItemDialog from "../../components/store/AddMenuItemDialog";

export default function StorePage() {
  const { id } = useParams();
  const storeId = Number(id);

  const store = stores.find((s) => s.store_id === storeId);
  const [localCategories, setLocalCategories] = useState(categories);
  const [localMenuItems, setLocalMenuItems] = useState(menuItems);

  if (!store) return <p>Không tìm thấy nhà hàng</p>;

  const handleAddCategory = (cat) => {
    setLocalCategories([...localCategories, cat]);
  };

  const handleAddMenuItem = (item) => {
    setLocalMenuItems([...localMenuItems, item]);
  };

  return (
    <div className="p-6 space-y-6">
      <StoreHeader store={store} />

      {/* Nút thêm */}
      <div className="flex gap-3">
        <AddCategoryDialog onAdd={handleAddCategory} categories={localCategories} />
        <AddMenuItemDialog
          onAdd={handleAddMenuItem}
          categories={localCategories}
          items={localMenuItems}
        />
      </div>

      {/* Category + Menu */}
      {localCategories.map((cat) => (
        <CategorySection
          key={cat.category_id}
          category={cat}
          items={localMenuItems.filter((i) => i.category_id === cat.category_id)}
        />
      ))}
    </div>
  );
}
