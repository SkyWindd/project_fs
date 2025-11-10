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
import LocationSelector from "../Location/LocationSelector" // ✅ import lại đúng

interface DeliverySectionProps {
  onChange?: (data: { address: string; note: string; time: string }) => void
}

export default function DeliverySection({ onChange }: DeliverySectionProps) {
  const [address, setAddress] = useState("") // lấy từ LocationSelector
  const [note, setNote] = useState("")
  const [time, setTime] = useState("now")

  // Gửi dữ liệu ra ngoài mỗi khi có thay đổi
  useEffect(() => {
    onChange?.({ address, note, time })
  }, [address, note, time])

  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Giao đến
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* 🏠 Địa chỉ giao hàng */}
        <div className="space-y-2">
          <Label className="text-sm text-gray-700">Địa chỉ giao hàng</Label>

          <LocationSelector
            onConfirm={(addr) => setAddress(addr)} // ✅ nhận địa chỉ thực từ GPS hoặc nhập tay
          />

          {address && (
            <p className="text-sm font-medium text-gray-800 bg-gray-50 px-3 py-2 rounded-md border border-gray-100 mt-2">
              {address}
            </p>
          )}
        </div>

        {/* ✏️ Ghi chú */}
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

        {/* 🕒 Thời gian nhận hàng */}
        <div className="space-y-2">
          <Label>Thời gian nhận hàng</Label>
          <Select value={time} onValueChange={(value) => setTime(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="now">Ngay lập tức</SelectItem>
              <SelectItem value="30min">Trong 30 phút</SelectItem>
              <SelectItem value="1h">Trong 1 giờ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
