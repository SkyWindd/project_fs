import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import type { Store } from "../../../mock/mockData";
import { Building2, Phone, CheckCircle2, XCircle } from "lucide-react";

// import Card shadcn
import { Card } from "../../components/ui/card";

export function StoreTable({ stores }: { stores: Store[] }) {
  return (
    <Card className="p-4 bg-gray-50 shadow-sm rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên nhà hàng</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>Thành phố</TableCell>
            <TableCell>Điện thoại</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Ngày tạo</TableCell>
            <TableCell>Ngày cập nhật</TableCell>
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

              {/* ---- Trạng thái ---- */}
              <TableCell>
                {store.is_active ? (
                  <Badge className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Đang hoạt động
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    Ngừng hoạt động
                  </Badge>
                )}
              </TableCell>

              <TableCell>{store.created_at}</TableCell>
              <TableCell>{store.updated_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
