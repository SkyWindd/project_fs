import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { MapPin, Loader2 } from "lucide-react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

/* FIX ICON LEAFLET */
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

/* ===============================
 📌 PROPS TRẢ VỀ 3 GIÁ TRỊ
=============================== */
export interface MapPickerProps {
  onSelectLocation: (address: string, lat: number, lon: number) => void
  onClose: () => void
}

function LocationMarker({ setPosition }: { setPosition: (pos: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng)
    },
  })
  return null
}

function FlyToMarker({ position }: { position: { lat: number; lng: number } }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(position, 16, { duration: 0.8 })
  }, [position])
  return null
}

export default function MapPicker({ onSelectLocation, onClose }: MapPickerProps) {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 10.7769,
    lng: 106.7009,
  })

  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingGPS, setLoadingGPS] = useState(false)

  /* ===============================
    📍 Lấy địa chỉ tương ứng toạ độ
  ================================ */
  useEffect(() => {
    const fetchAddress = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`
        )
        const data = await res.json()
        setAddress(data.display_name || "")
      } catch {
        setAddress("Không thể lấy địa chỉ.")
      } finally {
        setLoading(false)
      }
    }
    fetchAddress()
  }, [position])

  /* ===============================
    📌 Lấy vị trí GPS hiện tại
  ================================ */
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ GPS.")
      return
    }

    setLoadingGPS(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setPosition({ lat: latitude, lng: longitude })
        setLoadingGPS(false)
      },
      () => {
        alert("Không thể lấy vị trí GPS.")
        setLoadingGPS(false)
      }
    )
  }

  /* ===============================
    📌 Xác nhận chọn vị trí
  ================================ */
  const handleConfirm = () => {
    if (!address.trim()) {
      alert("Vui lòng chọn vị trí trước.")
      return
    }

    onSelectLocation(address, position.lat, position.lng) // ⭐ Trả về 3 giá trị
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
      <div className="relative w-screen h-screen bg-white overflow-hidden">

        {/* ======================= MAP ======================= */}
        <MapContainer
          center={position}
          zoom={16}
          scrollWheelZoom
          style={{ height: "100%", width: "100%", zIndex: 10 }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            position={position}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target
                const { lat, lng } = marker.getLatLng()
                setPosition({ lat, lng })
              },
            }}
          />

          <LocationMarker setPosition={setPosition} />
          <FlyToMarker position={position} />
        </MapContainer>

        {/* ====================== SIDE PANEL ====================== */}
        <div className="absolute left-4 top-4 bg-white shadow-xl rounded-xl p-4 w-[340px] z-[2000] border border-gray-100">
          <h3 className="font-semibold text-sm mb-1">Chọn địa chỉ giao hàng</h3>

          <p className="text-xs text-gray-500 mb-3">
            Kéo marker hoặc click để chọn vị trí
          </p>

          <div className="relative mb-3">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="text-sm pr-10"
              placeholder="Đang lấy địa chỉ..."
            />

            <button
              onClick={handleGetCurrentLocation}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600"
              disabled={loadingGPS}
            >
              {loadingGPS ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <MapPin className="w-4 h-4" />
              )}
            </button>
          </div>

          <Button
            onClick={handleConfirm}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            disabled={!address || loading}
          >
            Xác nhận vị trí
          </Button>

          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full text-gray-500 mt-2 text-sm"
          >
            Đóng bản đồ
          </Button>
        </div>
      </div>
    </div>
  )
}
