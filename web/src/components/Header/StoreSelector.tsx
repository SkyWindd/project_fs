// src/components/Store/StoreSelector.tsx
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useStore } from "../../context/StoreContext";

export default function StoreSelector() {
  const { stores, setSelectedStore } = useStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // define handler so we can remove it later
    const handler = () => setOpen(true);
    window.addEventListener("open-store-modal", handler);
    return () => window.removeEventListener("open-store-modal", handler);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Chọn cửa hàng gần bạn</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-3">
          {stores.length === 0 ? (
            <div className="text-sm text-gray-600">Đang tải cửa hàng...</div>
          ) : (
            stores.map((store) => (
              <button
                key={store.store_id}
                onClick={() => {
                  setSelectedStore(store);
                  setOpen(false);
                }}
                className="w-full p-3 text-left border rounded-lg hover:bg-red-50 hover:border-red-300 transition"
              >
                <p className="font-semibold">{store.store_name}</p>
                <p className="text-sm text-gray-600">{store.address}</p>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
