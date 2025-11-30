import { stores } from "../../mock/mockData";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import StoreTable from "../components/Store/StoreTable";
import StoreFormDialog from "./StoreFormDialog";

export default function Store(){
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý chi nhánh</h1>
        <StoreFormDialog mode="create">
          <Button className="flex gap-2 items-center">
            <Plus className="w-4 h-4" />
            Thêm chi nhánh
          </Button>
        </StoreFormDialog>
      </div>

      <StoreTable data={stores} />
    </div>
  );
}
