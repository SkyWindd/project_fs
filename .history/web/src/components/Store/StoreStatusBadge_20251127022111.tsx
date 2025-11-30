// src/components/store/StoreStatusBadge.tsx
import { Badge } from "../components/ui/badge";

export function StoreStatusBadge({ active }: { active: boolean }) {
  return active ? (
    <Badge className="bg-green-600 hover:bg-green-700">Đang hoạt động</Badge>
  ) : (
    <Badge variant="destructive">Tạm ngưng</Badge>
  );
}
