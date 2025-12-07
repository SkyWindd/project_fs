import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

import {
  adminCreateUser,
  adminUpdateUser,
} from "../../lib/api";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    full_name: string;
    email: string;
    phone_number: string;
    role: "admin" | "customer";
    is_active: boolean;
  };
  setFormData: (data: any) => void;
  onSuccess: () => void; // 🔥 gọi lại để reload danh sách user
  editingUser: any | null; // backend trả user theo dạng MongoDB
}

export function UserDialog({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSuccess,
  editingUser,
}: Props) {
  /* ===============================
      HANDLE SAVE
  =============================== */
  const handleSave = async () => {
    try {
      if (editingUser) {
        // UPDATE USER
        await adminUpdateUser(editingUser._id, formData);
      } else {
        // CREATE USER — cần password default vì backend yêu cầu
        await adminCreateUser({ ...formData, password: "123456" });
      }

      onSuccess(); // Refresh danh sách user
      onOpenChange(false);
    } catch (err: any) {
      alert(err.message || "Lỗi khi lưu dữ liệu");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Full Name */}
          <Input
            placeholder="Họ và tên"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
          />

          {/* Email */}
          <Input
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {/* Phone */}
          <Input
            placeholder="Số điện thoại"
            value={formData.phone_number}
            onChange={(e) =>
              setFormData({ ...formData, phone_number: e.target.value })
            }
          />

          {/* ROLE */}
          <div className="flex gap-3">
            <Button
              variant={formData.role === "admin" ? "default" : "outline"}
              onClick={() => setFormData({ ...formData, role: "admin" })}
            >
              Admin
            </Button>

            <Button
              variant={formData.role === "customer" ? "default" : "outline"}
              onClick={() => setFormData({ ...formData, role: "customer" })}
            >
              Khách hàng
            </Button>
          </div>

          {/* ACTIVE STATUS */}
          <div className="flex gap-3 items-center">
            <label className="text-sm font-medium text-gray-700">
              Trạng thái:
            </label>
            <Button
              variant="outline"
              onClick={() =>
                setFormData({ ...formData, is_active: !formData.is_active })
              }
            >
              {formData.is_active ? "🟢 Hoạt động" : "⚪ Ngừng"}
            </Button>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-2 pt-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>

            <Button onClick={handleSave}>
              {editingUser ? "Lưu thay đổi" : "Thêm mới"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
