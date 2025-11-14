"use client"

import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Copy, CheckCircle2, Banknote } from "lucide-react"
import { toast } from "sonner"

export default function PaymentTransferModal({
  open,
  onClose,
  totalAmount,
  customer,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  totalAmount: number
  customer: any
  onConfirm: () => void
}) {
  const [orderId, setOrderId] = useState("")

  useEffect(() => {
    if (!open) return

    // 🔢 Tạo mã đơn hàng tạm (giống MomoModal)
    const randomId = Math.floor(1000 + Math.random() * 9000)
    setOrderId(`#DH${randomId}`)
  }, [open])

  // 📋 Copy content
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`Đã sao chép ${label}!`)
    } catch {
      toast.error("Không thể sao chép!")
    }
  }

  // Nội dung chuyển khoản
  const transferContent = `Thanh toan don hang ${orderId}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl bg-white p-0 overflow-hidden shadow-xl border border-gray-100">
        
        {/* HEADER */}
        <DialogHeader className="bg-blue-600 px-6 py-4 text-white">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <Banknote size={20} />
            Thanh toán chuyển khoản ngân hàng
          </DialogTitle>
        </DialogHeader>

        {/* BODY */}
        <div className="p-6 space-y-5 text-sm text-gray-700">

          {/* QR */}
          <div className="text-center">
            <img
              src="/qr.jpg"
              alt="QR Banking"
              className="w-48 h-48 mx-auto rounded-lg border shadow-sm object-cover"
            />
            <p className="text-xs text-gray-500 mt-2">
              Quét mã QR bằng ứng dụng ngân hàng để thanh toán
            </p>
          </div>

          {/* BANK INFO */}
          <div className="bg-gray-50 border rounded-xl p-4 space-y-3">

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Ngân hàng:</span>
              <span className="font-semibold">Techcombank</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Số tài khoản:</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold tracking-wide">
                  2107 6666 8888
                </span>
                <Copy
                  size={16}
                  onClick={() => copyToClipboard("210766668888", "Số tài khoản")}
                  className="cursor-pointer text-blue-600 hover:text-blue-800"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Chủ tài khoản:</span>
              <span className="font-semibold">NGUYEN MINH QUAN</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Số tiền:</span>
              <span className="font-semibold text-blue-700">
                {totalAmount.toLocaleString()}₫
              </span>
            </div>

            <div className="flex justify-between items-start">
              <span className="text-gray-600 font-medium whitespace-nowrap">
                Nội dung:
              </span>
              <div className="flex items-center gap-2 max-w-[65%]">
                <span className="font-semibold break-words">{transferContent}</span>
                <Copy
                  size={16}
                  onClick={() => copyToClipboard(transferContent, "Nội dung chuyển khoản")}
                  className="cursor-pointer text-blue-600 hover:text-blue-800"
                />
              </div>
            </div>

          </div>

          {/* NOTE */}
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs p-3 rounded-lg leading-snug">
            ⚠️ Vui lòng chuyển khoản chính xác số tiền và nội dung để hệ thống xác nhận.
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              onClick={() => {
                onConfirm()
                onClose()  // đóng modal sau khi confirm
              }}
            >
              <CheckCircle2 size={16} />
              Tôi đã chuyển tiền
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
