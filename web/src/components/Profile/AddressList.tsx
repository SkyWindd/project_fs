import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { MapPin, Edit3, Plus, Trash } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import {
  fetchUserAddresses,
  addAddress,
  editAddress,
  deleteAddress,
} from "../../lib/api"
import { toast } from "sonner"
import AddressFormDialog from "./AddressFormDialog"

export default function AddressList() {
  const { currentUser } = useAuth()
  const [addresses, setAddresses] = useState<any[]>([])
  const [selectedAddress, setSelectedAddress] = useState<any | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  // 🔥 Load địa chỉ từ backend
  useEffect(() => {
    if (!currentUser) return
    fetchUserAddresses(currentUser.user_id).then(setAddresses)
  }, [currentUser])

  if (!currentUser)
    return <p className="text-center text-gray-500 py-6">Bạn chưa đăng nhập.</p>

  const handleAdd = () => {
    setSelectedAddress(null)
    setOpenDialog(true)
  }

  const handleEdit = (addr: any) => {
    setSelectedAddress(addr)
    setOpenDialog(true)
  }

  const handleSave = async (data: any) => {
  try {
    if (!currentUser) return;

    if (selectedAddress === null) {
      // ➕ Thêm mới
      const newAddr = await addAddress(currentUser.user_id, data);
      setAddresses((prev) => [...prev, newAddr]);
    } else {
      // ✏ Chỉnh sửa
      const updated = await editAddress(
        currentUser.user_id,                  // ❗ PHẢI có userId
        selectedAddress.address_id,           // ❗ addressId tách riêng
        data                                  // body
      );

      setAddresses((prev) =>
        prev.map((a) =>
          a.address_id === updated.address_id ? updated : a
        )
      );
    }

    setOpenDialog(false);
  } catch (err) {
    console.error(err);
    toast.error("Lỗi khi lưu địa chỉ ❌");
  }
};

const handleDelete = async (addr: any) => {
  try {
    if (!currentUser) return;

    await deleteAddress(currentUser.user_id, addr.address_id); // ❗ đúng API

    setAddresses((prev) =>
      prev.filter((x) => x.address_id !== addr.address_id)
    );

    toast.success("Đã xoá địa chỉ 🗑️");
  } catch (err) {
    toast.error("Không thể xoá địa chỉ ❌");
  }
};


  return (
    <Card className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm mt-6">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Địa chỉ của bạn
        </CardTitle>

        <Button
          size="sm"
          variant="outline"
          onClick={handleAdd}
          className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
        >
          <Plus className="w-4 h-4" /> Thêm địa chỉ
        </Button>
      </CardHeader>

      <CardContent className="space-y-4 mt-3">
        {addresses.length === 0 ? (
          <p className="text-gray-500 text-sm italic">
            Bạn chưa có địa chỉ nào.
          </p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr.address_id || addr._id}
              className="border rounded-xl p-4 flex justify-between items-start hover:shadow-sm transition"
            >
              <div className="flex gap-2 items-start">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="font-medium text-gray-800">
                    {addr.address_label}
                    {addr.is_default && (
                      <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                        Mặc định
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600 leading-snug">
                    {addr.street}, {addr.city}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(addr)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(addr)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>

      <AddressFormDialog
        open={openDialog}
        setOpen={setOpenDialog}
        address={selectedAddress}
        onSave={handleSave}
      />
    </Card>
  )
}
