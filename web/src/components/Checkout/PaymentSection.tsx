import React, { useState, useMemo } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Wallet, CreditCard, SmartphoneNfc } from "lucide-react"
import { mockPayments } from "../../../mock/mockData"

// Map method → icon
const iconMap: Record<string, any> = {
  momo: SmartphoneNfc,
  banking: CreditCard,
  vnpay: Wallet,
}

// Map method → label
const labelMap: Record<string, string> = {
  momo: "Thanh toán MoMo",
  banking: "Chuyển khoản ngân hàng",
  vnpay: "VNPAY",
}

export default function PaymentSection({
  onChange,
}: {
  onChange: (method: string) => void
}) {
  const [selected, setSelected] = useState<string | null>(null)

  // 🔥 Danh sách payment_method từ mock
  const paymentMethods = useMemo(() => {
    const methods = mockPayments.map((p) => p.payment_method)
    return Array.from(new Set(methods)) // Loại trùng
  }, [])

  const handleSelect = (method: string) => {
    setSelected(method)
    onChange(method)
  }

  return (
    <Card className="shadow-sm border border-gray-200 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Phương thức thanh toán
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3">
        {paymentMethods.map((method) => {
          const Icon = iconMap[method] || Wallet
          const active = selected === method

          return (
            <button
              key={method}
              onClick={() => handleSelect(method)}
              className={`
                flex items-center gap-3 p-4 w-full rounded-xl border text-left transition-all
                ${active
                  ? "border-red-500 bg-red-50 shadow-sm"
                  : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"}
              `}
            >
              {/* Icon wrapper */}
              <span
                className={`
                  p-2 rounded-full flex items-center justify-center border transition-all
                  ${
                    active
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-gray-600 border-gray-200"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
              </span>

              {/* Label */}
              <span
                className={`text-sm font-medium transition-all ${
                  active ? "text-red-600" : "text-gray-700"
                }`}
              >
                {labelMap[method]}
              </span>
            </button>
          )
        })}
      </CardContent>
    </Card>
  )
}
