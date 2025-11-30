import { Badge } from "../../components/ui/badge";

export default function StoreStatusBadge({ active }: { active: boolean }) {
  return (
    <Badge variant={active ? "success" : "destructive"}>
      {active ? "Đang hoạt động" : "Ngưng hoạt động"}
    </Badge>
  );
}
