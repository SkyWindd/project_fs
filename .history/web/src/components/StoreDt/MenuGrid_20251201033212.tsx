import React from "react";
import { Card, CardContent } from "../../components/ui/card";

export default function MenuGrid({ items }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.item_id} className="shadow hover:shadow-lg transition">
          <img
            src={item.image_url}
            alt={item.name}
            className="h-32 w-full object-cover rounded-t-xl"
          />

          <CardContent className="p-3 space-y-1">
            <p className="font-semibold">{item.name}</p>
            <p className="text-gray-500 text-sm">{item.description}</p>
            <p className="font-bold text-red-600">{item.price.toLocaleString()}₫</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
