import type { Category, MenuItem } from "../../../mock/mockData";

interface Props {
  category: Category;
  items: MenuItem[];
}

export default function CategorySection({ category, items }: Props) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-3">{category.category_name}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.item_id}
            className="border rounded-lg p-3 shadow-sm"
          >
            <p className="font-semibold">{item.name}</p>
            <p className="text-gray-500 text-sm">
              {item.price.toLocaleString()}đ
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
