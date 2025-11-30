import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { MenuItem, Category } from "../../../mock/mockData";

interface Props {
  items: MenuItem[];
  categories: Category[];
}

export default function MenuGrid({ items, categories }: Props) {
  const getCategoryName = (id: number) =>
    categories.find((c) => c.category_id === id)?.category_name || "Khác";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {items.map((item) => (
        <Card key={item.item_id} className="overflow-hidden shadow">
          <img src={item.image_url} className="w-full h-40 object-cover" />

          <CardContent className="p-3">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">
              {getCategoryName(item.category_id)}
            </p>

            <p className="text-[15px] mt-1 line-clamp-2">
              {item.description}
            </p>

            <p className="text-red-500 font-bold mt-2">
              {item.price.toLocaleString()}đ
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
