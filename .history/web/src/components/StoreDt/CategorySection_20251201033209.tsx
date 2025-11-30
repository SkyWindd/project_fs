import React from "react";
import MenuGrid from "./MenuGrid";

export default function CategorySection({ category, items }) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3">{category.name}</h3>
      <MenuGrid items={items} />
    </div>
  );
}
