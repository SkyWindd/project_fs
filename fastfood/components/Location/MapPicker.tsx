import { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { MapPin } from "lucide-react-native";

export interface MapPickerProps {
  onSelectLocation: (address: string, lat: number, lon: number) => void;
  onClose: () => void;
}

/* ================================
   MAP PICKER — React Native Version
   ================================ */
export default function MapPicker({ onSelectLocation, onClose }: MapPickerProps) {
  const [position, setPosition] = useState({
    lat: 10.7769,
    lon: 106.7009,
  });
  const [address, setAddress] = useState("");
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [loadingGPS, setLoadingGPS] = useState(false);

  // Reverse geocode bằng Expo Location
  const fetchAddress = async (lat: number, lon: number) => {
    setLoadingAddress(true);

    try {
      const res = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });

      if (res.length > 0) {
        const d = res[0];
        const addr = `${d.name || ""}, ${d.street || ""}, ${d.city || ""}, ${d.region || ""}`;
        setAddress(addr);
      } else {
        setAddress("Không tìm thấy địa chỉ");
      }
    } catch (e) {
      setAddress("Lỗi khi lấy địa chỉ");
    }

    setLoadingAddress(false);
  };

  useEffect(() => {
    fetchAddress(position.lat, position.lon);
  }, [position]);

  // Lấy GPS user
  const handleGetGPS = async () => {
    setLoadingGPS(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Vui lòng cấp quyền GPS");
        setLoadingGPS(false);
        return;
      }

      const pos = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = pos.coords;

      setPosition({ lat: latitude, lon: longitude });
    } catch {
      alert("Không thể lấy GPS.");
    }

    setLoadingGPS(false);
  };

  // Xác nhận
  const handleConfirm = () => {
    onSelectLocation(address, position.lat, position.lon);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={false}>
      <View className="flex-1 bg-white">

        {/* MAP */}
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: position.lat,
            longitude: position.lon,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={(e) => {
            const { latitude, longitude } = e.nativeEvent.coordinate;
            setPosition({ lat: latitude, lon: longitude });
          }}
        >
          <Marker
            coordinate={{
              latitude: position.lat,
              longitude: position.lon,
            }}
            draggable
            onDragEnd={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setPosition({ lat: latitude, lon: longitude });
            }}
          />
        </MapView>

        {/* OVERLAY PANEL */}
        <View className="absolute left-0 right-0 bottom-0 bg-white p-4 rounded-t-3xl shadow-xl">
          <Text className="text-base font-semibold mb-2">
            Chọn địa chỉ của bạn để giao hàng
          </Text>

          <View className="flex-row items-center border rounded-xl p-2 mb-3">
            <TextInput
              value={address}
              onChangeText={setAddress}
              className="flex-1 text-base"
              placeholder="Đang lấy địa chỉ..."
            />
            {loadingAddress ? (
              <ActivityIndicator size="small" />
            ) : null}
          </View>

          <TouchableOpacity
            onPress={handleGetGPS}
            className="flex-row items-center mb-3"
          >
            {loadingGPS ? (
              <ActivityIndicator size="small" />
            ) : (
              <MapPin color="red" size={20} />
            )}
            <Text className="ml-2 text-red-500 font-medium">Lấy vị trí hiện tại</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleConfirm}
            className="bg-red-600 p-4 rounded-xl"
          >
            <Text className="text-center text-white font-semibold text-lg">
              Xác nhận vị trí
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} className="mt-3 p-2">
            <Text className="text-center text-gray-500 text-base">Đóng bản đồ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
