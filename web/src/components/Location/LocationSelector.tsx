import { useState, useEffect } from "react"
import { MapPin, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import MapPicker from "./MapPicker"
import { useResponsive } from "../../hooks/useResponsive"
import { useLocationContext } from "../../context/LocationContext"
import { useAuth } from "../../context/AuthContext"
import { fetchUserAddresses } from "../../lib/api"

export default function LocationSelector() {
  const [openDialog, setOpenDialog] = useState(false)
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery")

  const [tempAddress, setTempAddress] = useState("")
  const [tempLat, setTempLat] = useState<number | null>(null)
  const [tempLon, setTempLon] = useState<number | null>(null)

  const [loadingLocation, setLoadingLocation] = useState(false)
  const [showMap, setShowMap] = useState(false)

  const { shortAddress, setLocation } = useLocationContext()
  const { currentUser } = useAuth()
  const { isMobile } = useResponsive()

  const [userAddresses, setUserAddresses] = useState<any[]>([])
  const [loadingAddress, setLoadingAddress] = useState(true)

  /** ⭐ Load address saved in database */
  useEffect(() => {
    if (!currentUser) {
      setUserAddresses([])
      return
    }

    fetchUserAddresses(currentUser.user_id)
      .then((res) => setUserAddresses(res.addresses || []))
      .finally(() => setLoadingAddress(false))
  }, [currentUser])

  /** ⭐ GPS Reverse Geocode */
  const handleGetLocation = () => {
    if (!navigator.geolocation) return alert("Trình duyệt không hỗ trợ GPS.")

    setLoadingLocation(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords

        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        const res = await fetch(url)
        const data = await res.json()

        setTempAddress(data.display_name || "")
        setTempLat(latitude)
        setTempLon(longitude)
        setLoadingLocation(false)
      },
      () => {
        alert("Không thể truy cập vị trí GPS.")
        setLoadingLocation(false)
      }
    )
  }

  /** ⭐ CONFIRM DELIVERY */
  const handleDeliveryConfirm = () => {
    if (!tempAddress || tempLat === null || tempLon === null) {
      alert("Vui lòng chọn vị trí.")
      return
    }

    setLocation({
      address: tempAddress,
      latitude: tempLat,
      longitude: tempLon,
    })

    setOpenDialog(false)
  }

  return (
    <>
      {/* ----- Mini Header Location ----- */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <MapPin className="w-5 h-5 text-red-500" />
        <div>
          <span className="text-sm text-gray-700">
            {shortAddress ? "Giao đến:" : "Bạn đang ở đâu?"}
          </span>
          {shortAddress && (
            <p className="text-sm font-semibold text-gray-700">
              {shortAddress}
            </p>
          )}
        </div>
      </div>

      {/* ----- Dialog ----- */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              TÌM CỬA HÀNG GẦN BẠN NHẤT
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-3">

            {/* ⭐ Delivery Type */}
            <RadioGroup
              value={mode}
              onValueChange={(v) => setMode(v as any)}
              className="flex justify-center gap-6"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="delivery" />
                <span>Giao hàng tới</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="pickup" />
                <span>Mua mang về</span>
              </label>
            </RadioGroup>

            {mode === "delivery" && (
              <>
                {/* ⭐ Saved Addresses */}
                <div className="bg-gray-50 p-3 rounded-lg border">
                  <p className="text-sm font-medium mb-2">Địa chỉ đã lưu</p>

                  {!currentUser ? (
                    <p className="text-red-500 text-sm">
                      🔒 Đăng nhập để dùng địa chỉ đã lưu
                    </p>
                  ) : loadingAddress ? (
                    <p className="text-sm text-gray-500">Đang tải...</p>
                  ) : userAddresses.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      Bạn chưa có địa chỉ đã lưu.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {userAddresses.map((addr) => (
                        <div
                          key={addr.address_id}
                          onClick={() => {
                            setTempAddress(`${addr.street}, ${addr.city}`)
                            setTempLat(addr.latitude)
                            setTempLon(addr.longitude)
                          }}
                          className="p-2 border rounded cursor-pointer hover:bg-red-100"
                        >
                          <p className="font-semibold">{addr.address_label}</p>
                          <p className="text-sm">{addr.street}</p>
                          <p className="text-xs text-gray-500">{addr.city}</p>

                          {addr.is_default && (
                            <p className="text-xs text-red-600 font-medium mt-1">
                              ★ Địa chỉ mặc định
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ⭐ Manual input */}
                <label className="block text-sm font-medium text-gray-700 mt-2">
                  Vị trí của tôi
                </label>

                <div className="relative">
                  <Input
                    placeholder="Nhập địa chỉ..."
                    value={tempAddress}
                    onChange={(e) => setTempAddress(e.target.value)}
                  />

                  <button
                    onClick={handleGetLocation}
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {loadingLocation ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* ⭐ MapPicker */}
                {showMap && (
                  <MapPicker
                    onSelectLocation={(address, lat, lon) => {
                      setTempAddress(address)
                      setTempLat(lat)
                      setTempLon(lon)
                    }}
                    onClose={() => setShowMap(false)}
                  />
                )}

                <div className="text-center mt-2">
                  <Button variant="link" onClick={() => setShowMap(true)}>
                    📍 Chọn vị trí trên bản đồ
                  </Button>
                </div>
              </>
            )}

            {mode === "pickup" && (
              <div className="p-3 border rounded-lg bg-gray-50">
                <p className="text-sm font-medium">Bạn sẽ đến lấy tại:</p>
                <p className="font-semibold">
                  273 An Dương Vương, Q.5, TP.HCM
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="mt-5">
            <Button
              onClick={
                mode === "delivery"
                  ? handleDeliveryConfirm
                  : () => {
                      setLocation({
                        address: "Mua mang về: 273 An Dương Vương, Q.5",
                        latitude: 0,
                        longitude: 0,
                      })
                      setOpenDialog(false)
                    }
              }
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Áp dụng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
