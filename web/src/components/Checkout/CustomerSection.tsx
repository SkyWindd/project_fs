import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"

interface CustomerSectionProps {
  onChange?: (data: { name: string; phone: string; email: string }) => void
}

export default function CustomerSection({ onChange }: CustomerSectionProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  // ✅ Khi người dùng nhập thông tin → gửi dữ liệu ra ngoài
  useEffect(() => {
    onChange?.({ name, phone, email })
  }, [name, phone, email])

  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Người đặt hàng
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 🧍‍♂️ Họ và tên + SĐT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="name">Họ và tên</Label>
            <Input
              id="name"
              placeholder="Nhập họ tên đầy đủ"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:ring-orange-500 focus-visible:ring-orange-500"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="focus:ring-orange-500 focus-visible:ring-orange-500"
            />
          </div>
        </div>

        {/* ✉️ Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:ring-orange-500 focus-visible:ring-orange-500"
          />
        </div>
      </CardContent>
    </Card>
  )
}
