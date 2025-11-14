import { useState, useEffect } from "react"
import { MapPin, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import MapPicker from "./MapPicker"
import { useResponsive } from "../../hooks/useResponsive"
import { useLocationContext } from "../../context/LocationContext"

export default function LocationSelector() {
  const [openDialog, setOpenDialog] = useState(false)
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery")
  const [tempAddress, setTempAddress] = useState("")
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const { isMobile } = useResponsive()
  
  // ✅ Lấy và set từ context (đã tách full + short)
  const { fullAddress, shortAddress, setAddress } = useLocationContext()

  // 🧭 Lấy vị trí GPS hiện tại
  const handleGetLocation = () => {
  if (!navigator.geolocation) {
    alert("Trình duyệt không hỗ trợ định vị GPS.")
    return
  }

  setLoadingLocation(true)

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords
      const callbackName = "nominatimCallback_" + Date.now()

      ;(window as any)[callbackName] = (data: any) => {
        setTempAddress(data.display_name || `(${latitude}, ${longitude})`)
        setLoadingLocation(false)
        delete (window as any)[callbackName]
        document.body.removeChild(script)
      }

      const script = document.createElement("script")
      script.src = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&json_callback=${callbackName}`
      script.onerror = () => {
        alert("Không thể lấy địa chỉ từ vị trí hiện tại.")
        setLoadingLocation(false)
      }
      document.body.appendChild(script)
    },
    () => {
      alert("Không thể truy cập vị trí của bạn.")
      setLoadingLocation(false)
    }
  )
}



  // ✅ Xác nhận "Giao hàng tới"
  const handleDeliveryConfirm = () => {
    if (!tempAddress.trim()) {
      alert("Vui lòng nhập hoặc chọn địa chỉ trước.")
      return
    }
    setAddress(tempAddress) // <== chỉ cần gọi 1 lần, context tự xử lý short/full
    setOpenDialog(false)
  }

  // ✅ Xác nhận "Mua mang về"
  const handlePickupConfirm = () => {
    const store = "273 An Dương Vương, Phường Chợ Quán, TP. Hồ Chí Minh"
    setAddress(`Mua mang về: ${store}`)
    setOpenDialog(false)
  }

  // Nếu đã có địa chỉ lưu thì điền lại vào input
  useEffect(() => {
    if (fullAddress) setTempAddress(fullAddress)
  }, [fullAddress])

  // 🧩 Cho phép mở modal từ component khác (vd: trang Checkout)
useEffect(() => {
  const handleOpen = () => setOpenDialog(true)
  window.addEventListener("open-location-modal", handleOpen)
  return () => window.removeEventListener("open-location-modal", handleOpen)
}, [])


  return (
    <>
      {/* --- Hiển thị ở Header --- */}
      <div
        className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-[2px]" />
        <div className="flex flex-col leading-tight">
          <span className="text-xs md:text-sm font-medium text-gray-700">
            {shortAddress
              ? mode === "delivery"
                ? "Giao hàng tới:"
                : "Mua mang về:"
              : "Bạn đang ở đâu?"}
          </span>

          {shortAddress && (
            <span className="text-xs md:text-sm text-gray-600 font-semibold break-words max-w-[160px] md:max-w-[280px]">
              {shortAddress}
            </span>
          )}
        </div>
      </div>

      {/* --- Dialog chọn vị trí --- */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              TÌM CỬA HÀNG GẦN BẠN NHẤT
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500">
              Nhập địa chỉ của bạn để xem ưu đãi và khuyến mãi tại khu vực.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {/* Chọn chế độ giao hàng / mang về */}
            <RadioGroup
              value={mode}
              onValueChange={(v) => {
                const newMode = v as "delivery" | "pickup"
                setMode(newMode)
                if (newMode === "delivery") setShowMap(false)
              }}
              className="flex justify-center gap-6"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="delivery" id="delivery" />
                <span>Giao hàng tới</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="pickup" id="pickup" />
                <span>Mua mang về</span>
              </label>
            </RadioGroup>

            {mode === "delivery" ? (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vị trí của tôi
                </label>
                <div className="relative">
                  <Input
                    placeholder="Nhập địa chỉ cụ thể..."
                    value={tempAddress}
                    onChange={(e) => setTempAddress(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    onClick={handleGetLocation}
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
                    disabled={loadingLocation}
                  >
                    {loadingLocation ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="mt-3 text-center">
                  <Button
                    variant="link"
                    className="text-red-500 font-medium"
                    onClick={() => setShowMap(true)}
                  >
                    📍 Chọn vị trí trên bản đồ
                  </Button>

                  {showMap && (
                    <MapPicker
                      onSelectLocation={(addr) => setTempAddress(addr)}
                      onClose={() => setShowMap(false)}
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="mt-3 text-left space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Bạn sẽ đến lấy tại:
                </p>
                <div className="p-3 border rounded-lg bg-gray-50 text-gray-800 font-semibold">
                  273 An Dương Vương, Phường Chợ Quán, TP. Hồ Chí Minh
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <DialogFooter className="mt-6">
            {mode === "delivery" ? (
              <Button
                onClick={handleDeliveryConfirm}
                disabled={!tempAddress.trim()}
                className={`w-full text-white ${
                  tempAddress.trim()
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Bắt đầu đặt hàng
              </Button>
            ) : (
              <Button
                onClick={handlePickupConfirm}
                className="w-full bg-red-500 hover:bg-red-600 text-white"
              >
                Áp dụng
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
