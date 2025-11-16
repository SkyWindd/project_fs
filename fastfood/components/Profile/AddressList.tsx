import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { MapPin, Edit3, Plus, Trash2 } from "lucide-react-native";
import { useAuth } from "../../context/AuthContext";
import { mockAddresses } from "../../constants/mockData";

import AddressFormModal from "./AddressFormDialog";
import MapPicker from "../Location/MapPicker";   // ⭐ MUST BE HERE (ROOT LEVEL)

export default function AddressList() {
  const { currentUser } = useAuth();

  const [selected, setSelected] = useState<any | null>(null);
  const [openModal, setOpenModal] = useState(false);

  // ⭐ MapPicker controller
  const [openMap, setOpenMap] = useState(false);
  const [mapCallback, setMapCallback] = useState<any | null>(null);

  // ⭐ Address list
  const [addresses, setAddresses] = useState(() => {
    if (!currentUser) return [];
    return mockAddresses.filter((a) => a.user_id === currentUser.user_id);
  });

  if (!currentUser)
    return <Text className="text-center text-gray-500 py-6">Bạn chưa đăng nhập.</Text>;
  const openMapPickerHandler = (
  callback: (addr: string, lat: number, lon: number) => void
) => {
  setOpenModal(false);  // đóng modal trước
  setTimeout(() => {
    setMapCallback(() => callback);
    setOpenMap(true);
  }, 200);
};
  // ➕ Add
  const handleAdd = () => {
    setSelected(null);
    setOpenModal(true);
  };

  // ✏ Edit
  const handleEdit = (addr: any) => {
    setSelected(addr);
    setOpenModal(true);
  };

  // 💾 Save
  const handleSave = (data: any) => {
    if (selected === null) {
      setAddresses((prev) => [
        ...prev,
        {
          ...data,
          address_id: prev.length + 1,
          user_id: currentUser.user_id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    } else {
      setAddresses((prev) =>
        prev.map((a) =>
          a.address_id === selected.address_id
            ? { ...a, ...data, updated_at: new Date().toISOString() }
            : a
        )
      );
    }

    setOpenModal(false);
  };

  // ❌ Delete
  const handleDelete = (addr: any) => {
    Alert.alert(
      "Xóa địa chỉ?",
      `Bạn có chắc muốn xóa địa chỉ "${addr.address_label}" không?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () =>
            setAddresses((prev) =>
              prev.filter((a) => a.address_id !== addr.address_id)
            ),
        },
      ]
    );
  };

  return (
    <>
      {/* ⭐⭐ MAP PICKER MUST BE AT ROOT ⭐⭐ */}
   {openMap && (
  <MapPicker
    onSelectLocation={(addr, lat, lon) => {
      if (mapCallback) mapCallback(addr, lat, lon);

      setOpenMap(false);

      // ⭐ mở lại modal sau khi user chọn xong bản đồ
      setTimeout(() => setOpenModal(true), 250);
    }}
    onClose={() => {
      setOpenMap(false);
      setTimeout(() => setOpenModal(true), 250);
    }}
  />
)}


      <View className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 mt-6">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-5">
          <Text className="text-lg font-semibold text-gray-900">Địa chỉ của bạn</Text>

          <TouchableOpacity
            onPress={handleAdd}
            className="flex-row items-center px-3 py-1.5 bg-red-50 border border-red-200 rounded-full active:opacity-80"
          >
            <Plus size={16} color="#e11d48" />
            <Text className="text-red-600 font-medium ml-1 text-sm">Thêm địa chỉ</Text>
          </TouchableOpacity>
        </View>

        {/* LIST */}
        <View className="space-y-4">
          {addresses.length === 0 ? (
            <Text className="text-gray-500 italic">Bạn chưa có địa chỉ nào.</Text>
          ) : (
            addresses.map((addr) => (
              <View
                key={addr.address_id}
                className="flex-row justify-between items-start bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-sm"
              >
                {/* Left */}
                <View className="flex-row flex-1 gap-3">
                  <MapPin size={20} color="#6b7280" className="mt-1" />

                  <View className="flex-1">
                    <View className="flex-row items-center flex-wrap">
                      <Text className="font-semibold text-gray-900 text-base">{addr.address_label}</Text>

                      {addr.is_default && (
                        <Text className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                          Mặc định
                        </Text>
                      )}
                    </View>

                    <Text className="text-gray-600 text-sm leading-snug mt-1">
                      {addr.street}, {addr.city}
                    </Text>
                  </View>
                </View>

                {/* Buttons */}
                <View className="flex-row items-center ml-2">
                  <TouchableOpacity
                    onPress={() => handleEdit(addr)}
                    className="p-2 rounded-full bg-white border border-gray-200 active:opacity-70 mr-2"
                  >
                    <Edit3 size={18} color="#444" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDelete(addr)}
                    className="p-2 rounded-full bg-red-50 border border-red-200 active:opacity-70"
                  >
                    <Trash2 size={18} color="#dc2626" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Address Modal */}
           <AddressFormModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                address={selected}
                onSave={handleSave}
                openMapPicker={openMapPickerHandler}
                />
      </View>
    </>
  );
}
