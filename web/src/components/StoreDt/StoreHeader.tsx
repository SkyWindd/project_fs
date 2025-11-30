import React from "react";
import type { Store } from "../../../mock/mockData";

export default function StoreHeader({ store }: { store: Store }) {
  return (
    <div className="p-4 mb-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold">{store.store_name}</h2>
      <p className="text-gray-600">
        {store.address}, {store.city}
      </p>
      <p className="text-gray-600">📞 {store.phone_number}</p>
    </div>
  );
}
