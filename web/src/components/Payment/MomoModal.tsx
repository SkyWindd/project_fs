"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export default function MomoModal({
  open,
  onClose,
  totalAmount,
}: {
  open: boolean
  onClose: () => void
  totalAmount: number
}) {
  const [step, setStep] = useState<"loading" | "pay" | "success" | "failed">(
    "loading"
  )

  // Fake loading như Shopee (2.5s)
  React.useEffect(() => {
    if (open) {
      setStep("loading")
      setTimeout(() => setStep("pay"), 1800)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-sm rounded-2xl p-6">

        {/* HEADER */}
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Thanh toán MoMo
          </DialogTitle>
        </DialogHeader>

        {/* ===== STEP 1: LOADING ===== */}
        {step === "loading" && (
          <div className="flex flex-col items-center py-6">
            <Loader2 className="w-8 h-8 animate-spin text-pink-600" />
            <p className="text-sm text-gray-600 mt-3 text-center">
              Đang tạo yêu cầu thanh toán...
            </p>
          </div>
        )}

        {/* ===== STEP 2: PAY SCREEN ===== */}
        {step === "pay" && (
          <div className="flex flex-col items-center py-4 space-y-4">

            {/* LOGO MOMO */}
            <div className="w-16 h-16 rounded-full bg-pink-600 flex items-center justify-center text-white text-3xl font-bold">
              M
            </div>

            <p className="text-center text-gray-700 leading-snug">
              Vui lòng xác nhận thanh toán trên ứng dụng MoMo
            </p>

            <p className="text-lg font-bold text-pink-600">
              {totalAmount.toLocaleString()}₫
            </p>

            <div className="flex flex-col gap-2 w-full mt-2">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setStep("success")}
              >
                Đã thanh toán
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setStep("failed")}
              >
                Thanh toán thất bại
              </Button>

              <Button
                variant="ghost"
                className="w-full text-gray-500"
                onClick={onClose}
              >
                Hủy
              </Button>
            </div>
          </div>
        )}

        {/* ===== STEP 3: SUCCESS ===== */}
        {step === "success" && (
            <div className="flex flex-col items-center py-6 space-y-4 text-center">
                <CheckCircle className="w-12 h-12 text-green-500" />

                <p className="text-lg font-bold text-green-600">
                Thanh toán thành công!
                </p>

                {/* 🔥 Ghi chú theo dõi đơn hàng */}
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                📦 Bạn có thể theo dõi trạng thái đơn hàng trong mục{" "}
                <span className="text-red-600 font-semibold">
                    Theo dõi đơn hàng
                </span>{" "}
                ở phần tài khoản.
                </p>

                <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={onClose}
                >
                Quay lại trang chủ
                </Button>
            </div>
            )}

        {/* ===== STEP 4: FAILED ===== */}
        {step === "failed" && (
          <div className="flex flex-col items-center py-6 space-y-4">
            <XCircle className="w-12 h-12 text-red-500" />
            <p className="text-lg font-bold text-red-600">
              Thanh toán thất bại!
            </p>
            <Button
              className="w-full bg-gray-800 hover:bg-black text-white"
              onClick={onClose}
            >
              Thử lại sau
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
