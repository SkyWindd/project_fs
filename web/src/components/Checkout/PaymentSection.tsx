import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { CreditCard, Wallet, Banknote } from "lucide-react"

const options = [
  { id: "momo", label: "Thanh toán qua Momo", icon: Wallet },
  { id: "bank", label: "Chuyển khoản ngân hàng", icon: CreditCard },
  { id: "cash", label: "Thanh toán khi nhận hàng", icon: Banknote },
]

export default function PaymentSection({ onChange }: { onChange: (method: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (method: string) => {
    setSelected(method)
    onChange(method)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Phương thức thanh toán
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {options.map((opt) => {
          const Icon = opt.icon
          return (
            <Button
              key={opt.id}
              variant={selected === opt.id ? "default" : "outline"}
              className="justify-start text-sm font-medium"
              onClick={() => handleSelect(opt.id)}
            >
              <Icon className="w-4 h-4 mr-2" /> {opt.label}
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}
