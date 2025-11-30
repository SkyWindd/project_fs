import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"

import { useAuth } from "../../context/AuthContext"

interface CustomerSectionProps {
  onChange?: (data: {
  user_id: number | null;
  name: string;
  phone: string;
  email: string;
    }) => void;
}

export default function CustomerSection({ onChange }: CustomerSectionProps) {
  const { currentUser } = useAuth()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  // Tự load info user nếu đã login
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.full_name || "")
      setPhone(currentUser.phone_number || "")
      setEmail(currentUser.email || "")
    }
  }, [currentUser])

  // Gửi dữ liệu ra ngoài
  useEffect(() => {
  onChange?.({
    user_id: currentUser?.user_id || null,
    name,
    phone,
    email
  })
}, [name, phone, email, currentUser])

  return (
    <Card className="shadow-sm border border-gray-200 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Người đặt hàng
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">

        {/* Họ tên + SĐT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Họ tên */}
          <div className="space-y-1.5">
            <Label className="text-gray-700 text-sm" htmlFor="name">
              Họ và tên
            </Label>

            <Input
              id="name"
              placeholder="Nhập họ tên đầy đủ"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                rounded-xl border-gray-300 
                focus:ring-orange-500 focus:border-orange-500
                transition-all
              "
            />
          </div>

          {/* Số điện thoại */}
          <div className="space-y-1.5">
            <Label className="text-gray-700 text-sm" htmlFor="phone">
              Số điện thoại
            </Label>

            <Input
              id="phone"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="
                rounded-xl border-gray-300 
                focus:ring-orange-500 focus:border-orange-500
                transition-all
              "
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label className="text-gray-700 text-sm" htmlFor="email">
            Email
          </Label>

          <Input
            id="email"
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              rounded-xl border-gray-300 
              focus:ring-orange-500 focus:border-orange-500
              transition-all
            "
          />
        </div>

      </CardContent>
    </Card>
  )
}
