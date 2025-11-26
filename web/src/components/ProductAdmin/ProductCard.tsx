import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import type { MenuItem } from "../../../mock/mockData";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface Props {
  item: MenuItem;
  onEdit: () => void;
  onDelete: () => void;
  onToggleVisible: () => void;
}

export default function ProductCard({
  item,
  onEdit,
  onDelete,
  onToggleVisible,
}: Props) {
  return (
    <Card
      className={`relative group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-2xl border border-gray-200 ${
        item.is_available ? "opacity-100" : "opacity-60"
      }`}
    >
      <CardContent className="p-0">
        {/* Ảnh sản phẩm */}
        <div className="relative">
          <img
            src={item.image_url}
            alt={item.name}
            className="rounded-t-2xl w-full h-48 object-cover"
          />

          {/* Badge trạng thái */}
          <Badge
            className={`absolute top-2 left-2 ${
              item.is_available ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            {item.is_available ? "Available" : "Hidden"}
          </Badge>

          {/* Nút thao tác */}
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8"
              onClick={onToggleVisible}
            >
              {item.is_available ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8"
              onClick={onEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              className="h-8 w-8"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Nội dung */}
        <div className="p-3">
          <h3 className="font-semibold text-base truncate">{item.name}</h3>
          <p className="text-sm text-gray-500 mb-1 line-clamp-2">
            {item.description}
          </p>

          <p className="font-bold text-red-600 mt-2 text-[15px] leading-tight">
            {item.price.toLocaleString("vi-VN")}₫
          </p>

          {/* Thông tin ngày tạo / cập nhật */}
          <div className="border-t mt-2 pt-2 text-xs text-gray-500 leading-relaxed">
            <p>
              🕒 <span className="font-medium">Tạo:</span>{" "}
              {format(new Date(item.created_at), "dd/MM/yyyy", { locale: vi })}
            </p>
            <p>
              ✏️ <span className="font-medium">Cập nhật:</span>{" "}
              {format(new Date(item.updated_at), "HH:mm dd/MM/yyyy", { locale: vi })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
