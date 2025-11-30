// src/components/store/StoreTable.tsx
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "../../components/ui/table";
import type { Store } from "../../../mock/mockData";
import { StoreStatusBadge } from "./StoreStatusBadge";
import { StoreRowActions } from "./StoreRowActions";

export function StoreTable({
  stores,
  onEdit,
  onDelete,
}: {
  stores: Store[];
  onEdit: (store: Store) => void;
  onDelete: (store: Store) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tên chi nhánh</TableHead>
          <TableHead>Địa chỉ</TableHead>
          <TableHead>Thành phố</TableHead>
          <TableHead>SĐT</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="text-right">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stores.map((store) => (
          <TableRow key={store.store_id}>
            <TableCell>{store.store_name}</TableCell>
            <TableCell>{store.address}</TableCell>
            <TableCell>{store.city}</TableCell>
            <TableCell>{store.phone_number}</TableCell>
            <TableCell><StoreStatusBadge active={store.is_active} /></TableCell>
            <TableCell className="text-right">
              <StoreRowActions
                onEdit={() => onEdit(store)}
                onDelete={() => onDelete(store)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
