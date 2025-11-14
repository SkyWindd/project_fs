import React, { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { MapPin, Edit3 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useLocationContext } from "../../context/LocationContext"
import { toast } from "sonner"

interface DeliverySectionProps {
  onChange?: (data: { address: string; note: string; time: string }) => void
}

export default function DeliverySection({ onChange }: DeliverySectionProps) {
  const { fullAddress, isAddressLoaded } = useLocationContext()
  const [note, setNote] = useState("")
  const [time, setTime] = useState("now")

  useEffect(() => {
    onChange?.({ address: fullAddress, note, time })
  }, [fullAddress, note, time, onChange])

  // 🧭 Khi không có địa chỉ → hiển thị toast và redirect
useEffect(() => {
  if (isAddressLoaded && !fullAddress) {
    // 🧭 Hiển thị toast cảnh báo
    toast.warning("Vui lòng chọn lại địa chỉ giao hàng trước khi thanh toán ⚠️", {
      duration: 2000, // tồn tại 2s
    })

    // ⏳ Sau 2.2s mới chuyển hướng
    const timeout = setTimeout(() => {
      window.location.href = "/"
    }, 2200)

    return () => clearTimeout(timeout)
  }
}, [isAddressLoaded, fullAddress])



  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Giao đến
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* 🏠 Địa chỉ giao hàng */}
        <div className="space-y-2">
          <Label className="text-sm text-gray-700">Địa chỉ giao hàng</Label>

          {fullAddress ? (
            <div className="flex items-start justify-between bg-gray-50 p-3 rounded-md border border-gray-100">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 mt-[2px]" />
                <p className="text-sm font-medium text-gray-800 leading-snug max-w-[90%]">
                  {fullAddress}
                </p>
              </div>

              {/* Nút chỉnh sửa địa chỉ */}
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-gray-500 hover:text-red-600"
                onClick={() => window.dispatchEvent(new Event("open-location-modal"))}
                title="Chỉnh sửa địa chỉ"
              >
                <Edit3 size={16} />
              </Button>
            </div>
          ) : (
            <p className="text-xs text-gray-500 italic mt-1">
              Không tìm thấy địa chỉ
            </p>
          )}
        </div>

        {/* ✏️ Ghi chú cho tài xế */}
        <div className="space-y-2">
          <Label htmlFor="note">Ghi chú cho tài xế</Label>
          <Textarea
            id="note"
            placeholder="Ví dụ: để đồ trước cửa, không bấm chuông..."
            className="resize-none"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
