import { Badge } from "../../components/ui/badge";

export default function StoreStatusBadge({ active }: { active: boolean }) {
  return (
    <Badge
  variant={active ? "default" : "destructive"}
  className={active ? "bg-green-500 text-white" : ""}
>
  {active ? "Đang hoạt động" : "Ngừng hoạt động"}
</Badge>

  );
}
