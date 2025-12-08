import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { formatDateTime } from "../../lib/utils";

interface User {
  _id: string;                        // MongoDB ID
  full_name: string;
  email: string;
  phone_number: string;
  role: "admin" | "customer";
  is_active: boolean;
  updatedAt: string;                  // timestamps từ backend
  createdAt: string;
}

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;  // MongoDB _id
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <Card className="hover:shadow-md rounded-2xl transition-all">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{user.full_name}</CardTitle>

        <Badge className={user.is_active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}>
          {user.role === "admin" ? "Quản trị" : "Khách hàng"}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-1 text-sm text-gray-700">
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">SĐT:</span> {user.phone_number}</p>

        <p>
          <span className="font-medium">Trạng thái:</span>{" "}
          {user.is_active ? (
            <span className="text-green-600 font-medium">Hoạt động</span>
          ) : (
            <span className="text-gray-500 font-medium">Ngừng</span>
          )}
        </p>

        <p>
          <span className="font-medium">Cập nhật:</span>{" "}
          {formatDateTime(user.updatedAt ?? user.createdAt)}
        </p>

        <div className="flex gap-2 pt-3">
          <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
            <Pencil className="w-4 h-4 mr-1" /> Sửa
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(user._id)}
          >
            <Trash2 className="w-4 h-4 mr-1" /> Xóa
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
