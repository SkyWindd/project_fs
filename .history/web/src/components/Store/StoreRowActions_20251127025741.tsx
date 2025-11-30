import { Button } from "../../components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import StoreFormDialog from "./StoreFormDialog";
import { Store } from "../../../mock/mockData";

export default function StoreRowActions({ store }: { store: Store }) {
  return (
    <div className="flex gap-2">
      <StoreFormDialog mode="edit" store={store}>
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Pencil className="w-4 h-4" /> Sửa
        </Button>
      </StoreFormDialog>

      <Button size="sm" variant="destructive" className="flex items-center gap-1">
        <Trash2 className="w-4 h-4" /> Xóa
      </Button>
    </div>
  );
}
