import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import type { Store } from "@/mock/mockData";

interface Props {
  mode: "create" | "edit";
  store?: Store;
  children: React.ReactNode;
}

export default function StoreFormDialog({ mode, store, children }: Props) {
  const isEdit = mode === "edit";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Sửa chi nhánh" : "Thêm chi nhánh"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input placeholder="Tên chi nhánh" defaultValue={store?.store_name} />
          <Input placeholder="Địa chỉ" defaultValue={store?.address} />
          <Input placeholder="Thành phố" defaultValue={store?.city} />
          <Input placeholder="Số điện thoại" defaultValue={store?.phone_number} />

          <Button className="w-full">
            {isEdit ? "Cập nhật" : "Thêm mới"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
