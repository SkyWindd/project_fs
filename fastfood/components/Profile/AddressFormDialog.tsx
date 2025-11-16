import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { MapPin, X } from "lucide-react-native";
import * as Location from "expo-location";
import { useToast } from "../Toast/Toast";

interface Props {
  open: boolean;
  onClose: () => void;
  address?: any;
  onSave: (data: any) => void;

  // callback để mở MapPicker
  openMapPicker: (cb: (addr: string, lat: number, lon: number) => void) => void;
}

export default function AddressFormModal({
  open,
  onClose,
  address,
  onSave,
  openMapPicker,
}: Props) {
  const isEdit = !!address;
  const { show } = useToast();

  // STATES
  const [label, setLabel] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [isDefault, setIsDefault] = useState(false);

  const [loadingGPS, setLoadingGPS] = useState(false);

  // Load khi sửa
  useEffect(() => {
    if (isEdit && address) {
      setLabel(address.address_label);
      setStreet(address.street);
      setCity(address.city);
      setLat(address.latitude);
      setLon(address.longitude);
      setIsDefault(address.is_default);
    } else {
      setLabel("");
      setStreet("");
      setCity("");
      setLat(null);
      setLon(null);
      setIsDefault(false);
    }
  }, [open]);

  /** ===============================
   *  GPS
   * =============================== */
  const handleGetLocation = async () => {
    setLoadingGPS(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        show("Vui lòng cấp quyền GPS.");
        setLoadingGPS(false);
        return;
      }

      const pos = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = pos.coords;

      setLat(latitude);
      setLon(longitude);

      const geo = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (geo.length > 0) {
        const g = geo[0];
        const addr = `${g.name || ""} ${g.street || ""}, ${g.city || ""}`;

        setStreet(addr);
        setCity(g.city || "");
      }
    } catch {
      show("Không thể lấy GPS ❌");
    }

    setLoadingGPS(false);
  };

  /** ===============================
   *  LƯU
   * =============================== */
  const handleSave = () => {
    if (!street.trim()) {
      show("Vui lòng nhập địa chỉ.");
      return;
    }

    onSave({
      address_label: label || "Địa chỉ mới",
      street,
      city,
      latitude: lat,
      longitude: lon,
      is_default: isDefault,
    });

    show(isEdit ? "Cập nhật thành công 🎉" : "Thêm địa chỉ 🎉");
    onClose();
  };

  return (
    <Modal visible={open} transparent animationType="fade">
      <View className="flex-1 bg-black/40 justify-center items-center px-6">

        {/* bấm ra ngoài để tắt */}
        <Pressable className="absolute inset-0" onPress={onClose} />

        <View className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl max-h-[85%]">
          {/* HEADER */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">
              {isEdit ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={26} color="#444" />
            </TouchableOpacity>
          </View>

          {/* FORM */}
          <ScrollView showsVerticalScrollIndicator={false} className="space-y-4">

            {/* LABEL */}
            <View>
              <Text className="text-gray-700 mb-1">Loại địa chỉ</Text>
              <TextInput
                placeholder="Nhà riêng, Công ty..."
                value={label}
                onChangeText={setLabel}
                className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3"
              />
            </View>

            {/* STREET */}
            <View>
              <Text className="text-gray-700 mb-1">Địa chỉ chi tiết</Text>

              <View className="relative">
                <TextInput
                  placeholder="Nhập địa chỉ..."
                  value={street}
                  onChangeText={setStreet}
                  className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 pr-12"
                />

                {/* GPS BUTTON */}
                <TouchableOpacity
                  className="absolute right-3 top-3"
                  onPress={handleGetLocation}
                  disabled={loadingGPS}
                >
                  {loadingGPS ? (
                    <ActivityIndicator size="small" color="#e11d48" />
                  ) : (
                    <MapPin size={22} color="#e11d48" />
                  )}
                </TouchableOpacity>
              </View>

              {/* MAP PICKER */}
              <TouchableOpacity
                onPress={() =>
                  openMapPicker((addr: string, latVal: number, lonVal: number) => {
                    setStreet(addr);
                    setLat(latVal);
                    setLon(lonVal);

                    const parts = addr.split(",");
                    setCity(parts.at(-1)?.trim() || "");
                  })
                }
                className="mt-1"
              >
                <Text className="text-red-600 font-medium">
                  📍 Chọn vị trí trên bản đồ
                </Text>
              </TouchableOpacity>
            </View>

            {/* CHECKBOX */}
            <TouchableOpacity
              onPress={() => setIsDefault(!isDefault)}
              className="flex-row items-center gap-2 mt-2"
            >
              <View
                className={`w-5 h-5 rounded border flex items-center justify-center ${
                  isDefault ? "bg-red-600 border-red-600" : "border-gray-400"
                }`}
              >
                {isDefault && <View className="w-2.5 h-2.5 bg-white rounded" />}
              </View>
              <Text className="text-gray-700">Đặt làm mặc định</Text>
            </TouchableOpacity>

            {/* SAVE BUTTON */}
            <TouchableOpacity
              onPress={handleSave}
              className="bg-red-600 rounded-xl py-3 mt-4 active:opacity-85"
            >
              <Text className="text-center text-white font-semibold text-base">
                {isEdit ? "Lưu thay đổi" : "Thêm địa chỉ"}
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
