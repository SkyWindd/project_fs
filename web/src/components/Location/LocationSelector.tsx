import { useState } from "react"
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

// 🧩 Hàm rút gọn địa chỉ để hiển thị trong header
function shortenAddress(addr: string) {
  return addr.length > 35 ? addr.slice(0, 35) + "..." : addr
}

interface LocationSelectorProps {
  onConfirm?: (address: string) => void // ✅ callback gửi địa chỉ về Header
}

export default function LocationSelector({ onConfirm }: LocationSelectorProps) {
  const [openDialog, setOpenDialog] = useState(false)
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery")
  const [address, setAddress] = useState("")
  const [displayAddress, setDisplayAddress] = useState("") // địa chỉ hiển thị trong header
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const { isMobile } = useResponsive()
  
  // 📍 Lấy vị trí hiện tại bằng GPS
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt của bạn không hỗ trợ định vị GPS.")
      return
    }

    setLoadingLocation(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
          const data = await response.json()
          const locationName =
            data.display_name ||
            `Vĩ độ: ${latitude.toFixed(4)}, Kinh độ: ${longitude.toFixed(4)}`
          setAddress(locationName)
        } catch (err) {
          alert("Không thể lấy địa chỉ từ vị trí hiện tại.")
        } finally {
          setLoadingLocation(false)
        }
      },
      (err) => {
        alert("Không thể truy cập vị trí của bạn.")
        console.error(err)
        setLoadingLocation(false)
      }
    )
  }

  // ✅ Khi bấm nút “Bắt đầu đặt hàng” (delivery)
  const handleDeliveryConfirm = () => {
    if (!address.trim()) {
      alert("Vui lòng nhập hoặc chọn địa chỉ trước.")
      return
    }
    const shortAddr = shortenAddress(address)
    setDisplayAddress(shortAddr)
    setOpenDialog(false)
    if (onConfirm) onConfirm(shortAddr)
  }

  // ✅ Khi bấm “Áp dụng” (pickup)
  const handlePickupConfirm = () => {
    const storeAddress = "273 An Dương Vương, Phường Chợ Quán, Thành phố Hồ Chí Minh"
    const text = `Mua mang về: ${storeAddress}`
    setDisplayAddress(text)
    setAddress(storeAddress)
    setOpenDialog(false)
    if (onConfirm) onConfirm(text)
  }

  return (
    <>
            <div
        className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        {/* Icon */}
        <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-[2px]" />

        {/* Chế độ và địa chỉ */}
        <div className="flex flex-col leading-tight">
          {/* Dòng 1: Giao hàng / Mua mang về */}
          <span className="text-xs md:text-sm font-medium text-gray-700">
            {displayAddress
              ? mode === "delivery"
                ? "Giao hàng tới:"
                : "Mua mang về:"
              : "Bạn đang ở đâu?"}
          </span>

          {/* Dòng 2: Địa chỉ */}
          {displayAddress && (
            <span className="text-xs md:text-sm text-gray-600 font-semibold break-words max-w-[160px] md:max-w-[280px]">
            {(() => {
              // Xóa chuỗi "Mua mang về:" nếu có
              const cleanAddress = displayAddress.replace(/^Mua mang về:\s*/i, "")

              // Rút gọn địa chỉ theo kích thước màn hình
              if (isMobile) return cleanAddress.slice(0, 10) + "..."
              if (cleanAddress.length > 35) return cleanAddress.slice(0, 35) + "..."
              return cleanAddress
            })()}
          </span>
          )}
        </div>
      </div>

      {/* Dialog chọn vị trí */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              TÌM CỬA HÀNG GẦN BẠN NHẤT
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500">
              Nhập địa chỉ của bạn để xem ưu đãi, khuyến mãi và phiếu giảm giá tại địa phương.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {/* Radio chọn chế độ */}
              <RadioGroup
                value={mode}
                onValueChange={(v) => {
                  const newMode = v as "delivery" | "pickup"
                  setMode(newMode)

                  // ✅ Reset lại giao diện khi chuyển chế độ
                  if (newMode === "delivery") {
                    setAddress("")
                    setShowMap(false)
                  }
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

            {/* Nội dung thay đổi theo chế độ */}
            {mode === "delivery" ? (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vị trí của tôi
                </label>
                <div className="relative">
                  <Input
                    placeholder="Vui lòng nhập ít nhất 5 ký tự"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                      onSelectLocation={(addr) => setAddress(addr)}
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
                  273 An Dương Vương, Phường Chợ Quán, Thành phố Hồ Chí Minh
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <DialogFooter className="mt-6">
            {mode === "delivery" ? (
              <Button
                onClick={handleDeliveryConfirm}
                disabled={!address.trim()}
                className={`w-full text-white ${
                  address.trim()
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
