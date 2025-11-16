import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { MapPin } from "lucide-react-native";
import * as Location from "expo-location";
import { useLocationContext } from "../../context/LocationContext";
import MapPicker from "./MapPicker"; // ✔ GIỮ NGUYÊN import theo yêu cầu
import { useToast } from "../Toast/Toast";     

export default function LocationSelector() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [tempAddress, setTempAddress] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const { show } = useToast();                 // ⭐ hook toast mới
  
  const { fullAddress, shortAddress, setAddress } = useLocationContext();

  useEffect(() => {
    if (fullAddress) setTempAddress(fullAddress);
  }, [fullAddress]);

  /** ===========================
   *  LẤY GPS BẰNG expo-location
   *  =========================== */
  const handleGetLocation = async () => {
    setLoadingLocation(true);

    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        show("Vui lòng cấp quyền GPS để sử dụng tính năng này.");
        setLoadingLocation(false);
        return;
      }

      const pos = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = pos.coords;

      // Reverse geocoding
      const geo = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const addr = geo[0];
      const formatted =
        `${addr.name || ""}, ${addr.street || ""}, ${addr.city || ""}`;

      setTempAddress(formatted);
    } catch (e) {
      show("Không thể lấy vị trí GPS.");
    }

    setLoadingLocation(false);
  };

  /** ===========================
   *   Xác nhận chế độ Delivery
   *  =========================== */
  const handleDeliveryConfirm = () => {
    if (!tempAddress.trim()) {
      show("Vui lòng nhập hoặc chọn địa chỉ.");
      return;
    }
    setAddress(tempAddress);
    setOpen(false);
  };

  /** ===========================
   *       Pickup Mode
   *  =========================== */
  const handlePickupConfirm = () => {
    const store =
      "273 An Dương Vương, Phường Chợ Quán, TP. Hồ Chí Minh";
    setAddress(`Mua mang về: ${store}`);
    setOpen(false);
  };

  return (
    <>
      {/* ========================
          HIỂN THỊ TRÊN HEADER
      ========================= */}
      <TouchableOpacity
          onPress={() => setOpen(true)}
          className="flex-row items-start gap-2"
        >
          <MapPin color="red" size={20} />

          <View>
            <Text className="text-xs font-medium text-gray-600">
              {shortAddress
                ? mode === "delivery"
                  ? "Giao hàng tới:"
                  : "Mua mang về:"
                : "Bạn đang ở đâu?"}
            </Text>

            {shortAddress && (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-xs font-semibold text-gray-800 max-w-[120px]"
              >
                {shortAddress}
              </Text>
            )}
          </View>
        </TouchableOpacity>


      {/* ========================
            MODAL SELECTOR
      ========================= */}
      <Modal visible={open} transparent animationType="slide">
        <View className="flex-1 bg-black/40 justify-center items-center p-6">
          <View className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-xl">

            <Text className="text-lg font-bold text-center">
              TÌM CỬA HÀNG GẦN BẠN
            </Text>

            {/* ========== RADIO MODE ========== */}
            <View className="flex-row justify-center gap-10 mt-5">
              <TouchableOpacity onPress={() => setMode("delivery")}>
                <Text
                  className={`text-base ${
                    mode === "delivery"
                      ? "text-red-600 font-bold"
                      : "text-gray-600"
                  }`}
                >
                  Giao hàng
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setMode("pickup")}>
                <Text
                  className={`text-base ${
                    mode === "pickup"
                      ? "text-red-600 font-bold"
                      : "text-gray-600"
                  }`}
                >
                  Mua mang về
                </Text>
              </TouchableOpacity>
            </View>

            {/* ========== DELIVERY UI ========== */}
            {mode === "delivery" ? (
              <View className="mt-6">
                <Text className="text-sm mb-1">Địa chỉ của bạn</Text>

                <View className="border rounded-lg p-2 flex-row items-center">
                  <TextInput
                    placeholder="Nhập địa chỉ..."
                    value={tempAddress}
                    onChangeText={setTempAddress}
                    className="flex-1 text-base"
                  />

                  <TouchableOpacity onPress={handleGetLocation}>
                    {loadingLocation ? (
                      <ActivityIndicator size="small" />
                    ) : (
                      <MapPin color="gray" size={20} />
                    )}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  className="mt-3"
                  onPress={() => setShowMap(true)}
                >
                  <Text className="text-red-500 font-medium">
                    📍 Chọn vị trí trên bản đồ
                  </Text>
                </TouchableOpacity>

                {showMap && (
                  <MapPicker
                    onSelectLocation={(addr) => setTempAddress(addr)}
                    onClose={() => setShowMap(false)}
                  />
                )}
              </View>
            ) : (
              /* ========== PICKUP UI ========== */
              <View className="mt-6 bg-gray-100 p-3 rounded-lg">
                <Text className="font-semibold">Bạn sẽ đến lấy tại:</Text>
                <Text className="mt-1">
                  273 An Dương Vương, Phường Chợ Quán, TP. Hồ Chí Minh
                </Text>
              </View>
            )}

            {/* ========== FOOTER BUTTON ========== */}
            <TouchableOpacity
              className="bg-red-600 mt-6 rounded-xl p-3"
              onPress={
                mode === "delivery"
                  ? handleDeliveryConfirm
                  : handlePickupConfirm
              }
            >
              <Text className="text-center text-white font-semibold text-base">
                {mode === "delivery"
                  ? "Bắt đầu đặt hàng"
                  : "Áp dụng"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-3"
              onPress={() => setOpen(false)}
            >
              <Text className="text-center text-gray-600">
                Hủy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
