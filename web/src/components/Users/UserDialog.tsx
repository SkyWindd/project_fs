import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import type { User } from "../../../mock/mockData" // 👈 import từ mock của bạn

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: {
    full_name: string
    email: string
    phone_number: string
    role: "admin" | "customer"
    is_active: boolean
  }
  setFormData: (data: any) => void
  onSave: () => void
  editingUser: User | null
}

export function UserDialog({ open, onOpenChange, formData, setFormData, onSave, editingUser }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Họ và tên"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            placeholder="Số điện thoại"
            value={formData.phone_number}
            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
          />

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

          <div className="flex gap-3 items-center">
            <label className="text-sm font-medium text-gray-700">Trạng thái:</label>
            <Button
              variant="outline"
              onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
            >
              {formData.is_active ? "🟢 Hoạt động" : "⚪ Ngừng"}
            </Button>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
            <Button onClick={onSave}>{editingUser ? "Lưu thay đổi" : "Thêm mới"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
