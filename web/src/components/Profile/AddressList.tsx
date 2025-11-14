"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { MapPin, Edit3, Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { mockAddresses } from "../../../mock/mockData";
import AddressFormDialog from "./AddressFormDialog"; // Gộp Add + Edit

export default function AddressList() {
  const { currentUser } = useAuth();

  // ❗ TẤT CẢ HOOK PHẢI ĐƯỢC ĐẶT TRƯỚC MỌI RETURN
  const [selectedAddress, setSelectedAddress] = useState<any | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [addresses, setAddresses] = useState(() => {
    if (!currentUser) return [];
    return mockAddresses.filter((addr) => addr.user_id === currentUser.user_id);
  });

  // ❗ RETURN KIỂM TRA ĐĂNG NHẬP ĐƯA XUỐNG DƯỚI HOOK
  if (!currentUser)
    return (
      <p className="text-center text-gray-500 py-6">
        Bạn chưa đăng nhập.
      </p>
    );

  const handleAdd = () => {
    setSelectedAddress(null);
    setOpenDialog(true);
  };

  const handleEdit = (addr: any) => {
    setSelectedAddress(addr);
    setOpenDialog(true);
  };

  const handleSave = (updated: any) => {
    if (selectedAddress === null) {
      // ➕ thêm mới
      setAddresses((prev) => [
        ...prev,
        {
          ...updated,
          address_id: prev.length + 1,
          user_id: currentUser.user_id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    } else {
      // ✏ chỉnh sửa
      setAddresses((prev) =>
        prev.map((a) =>
          a.address_id === selectedAddress.address_id
            ? { ...a, ...updated, updated_at: new Date().toISOString() }
            : a
        )
      );
    }

    setOpenDialog(false);
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
              key={addr.address_id}
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

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(addr)}
                className="text-gray-500 hover:text-red-600"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
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
  );
}
