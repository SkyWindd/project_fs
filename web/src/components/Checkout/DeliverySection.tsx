import React, { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { MapPin, Edit3, Store } from "lucide-react"
import { Button } from "../../components/ui/button"

import { useLocationContext } from "../../context/LocationContext"
import { useStore } from "../../context/StoreContext"
import { toast } from "sonner"

interface DeliverySectionProps {
  onChange?: (data: {
    address: string;
    latitude: number | null;
    longitude: number | null;
    note: string;
    time: string;
  }) => void;
}

export default function DeliverySection({ onChange }: DeliverySectionProps) {
  const {
    address,
    latitude,
    longitude,
    isAddressLoaded
  } = useLocationContext()

  const { selectedStore } = useStore()

  const [note, setNote] = useState("")
  const [time, setTime] = useState("now")

  // 🔥 Cập nhật dữ liệu lên Checkout
  useEffect(() => {
    onChange?.({
      address: address || "",
      latitude: latitude ?? null,
      longitude: longitude ?? null,
      note,
      time,
    })
  }, [address, latitude, longitude, note, time])

  // ❗ Cảnh báo nếu mất địa chỉ
  useEffect(() => {
    if (isAddressLoaded && !address) {
      toast.warning("Vui lòng chọn lại địa chỉ giao hàng ⚠️", {
        duration: 2000,
      })

      const timeout = setTimeout(() => {
        window.location.href = "/"
      }, 2200)

      return () => clearTimeout(timeout)
    }
  }, [isAddressLoaded, address])

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Giao đến
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 📌 STORE ĐANG GIAO */}
        <div className="space-y-2">
          <Label className="text-sm text-gray-700">Cửa hàng đang giao</Label>

          {selectedStore ? (
            <div className="flex items-start justify-between bg-gray-50 p-3 rounded-md border border-gray-100">
              <div className="flex items-start gap-2">
                <Store className="w-4 h-4 text-blue-600 mt-[2px]" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedStore.store_name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {selectedStore.address}, {selectedStore.city}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-500 italic">
              Chưa chọn cửa hàng — vui lòng chọn trước khi đặt món.
            </p>
          )}
        </div>

        {/* 📌 ĐỊA CHỈ GIAO HÀNG */}
        <div className="space-y-2">
          <Label className="text-sm text-gray-700">Địa chỉ giao hàng</Label>

          {address ? (
            <div className="flex items-start justify-between bg-gray-50 p-3 rounded-md border border-gray-100">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 mt-[2px]" />
                <p className="text-sm font-medium text-gray-800 leading-snug max-w-[90%]">
                  {address}
                </p>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-gray-500 hover:text-red-600"
                onClick={() =>
                  window.dispatchEvent(new Event("open-location-modal"))
                }
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

        {/* 📌 GHI CHÚ */}
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
