// src/components/stores/StoreTable.tsx

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Store } from "@/types/store";
import { Building2, Phone } from "lucide-react";

export function StoreTable({ stores }: { stores: Store[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Tên nhà hàng</TableCell>
          <TableCell>Địa chỉ</TableCell>
          <TableCell>Thành phố</TableCell>
          <TableCell>Điện thoại</TableCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {stores.map((store) => (
          <TableRow key={store.store_id}>
            <TableCell>{store.store_id}</TableCell>

            <TableCell className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              {store.store_name}
            </TableCell>

            <TableCell>{store.address}</TableCell>

            <TableCell>{store.city}</TableCell>

            <TableCell className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {store.phone_number}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
