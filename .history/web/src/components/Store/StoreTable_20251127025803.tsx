import { Card, CardContent } from "../../components/ui/card";
import { Store } from "../../../mock/mockData";
import StoreStatusBadge from "./StoreStatusBadge";
import StoreRowActions from "./StoreRowActions";

export default function StoreTable({ data }: { data: Store[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((store) => (
        <Card key={store.store_id} className="shadow-sm border">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <h2 className="font-semibold text-lg">{store.store_name}</h2>
              <StoreStatusBadge active={store.is_active} />
            </div>

            <div className="text-sm space-y-1">
              <p><strong>Địa chỉ:</strong> {store.address}, {store.city}</p>
              <p><strong>SĐT:</strong> {store.phone_number}</p>
              <p><strong>Cập nhật:</strong> {store.updated_at}</p>
            </div>

            <StoreRowActions store={store} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
