import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Store } from "../../../mock/mockData";
import { Building2, Phone, MapPin, CheckCircle2, XCircle } from "lucide-react";

export default function StoreHeader({ store }: { store: Store }) {
  return (
    <Card className="shadow-md">
      <CardContent className="p-6 space-y-3">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Building2 className="w-6 h-6" />
          {store.store_name}
        </h2>

        <div className="text-gray-700 space-y-1">
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {store.address}, {store.city}
          </p>

          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {store.phone_number}
          </p>

          <p>
            {store.is_active ? (
              <span className="text-green-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Đang hoạt động
              </span>
            ) : (
              <span className="text-red-600 flex items-center gap-1">
                <XCircle className="w-4 h-4" /> Ngừng hoạt động
              </span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
