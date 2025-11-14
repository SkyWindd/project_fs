import React, { createContext, useContext, useState, useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { toast } from "sonner"

interface LocationContextType {
  fullAddress: string
  shortAddress: string
  setAddress: (addr: string) => void
  clearAddress: () => void
  triggerOpenDialog: boolean
  setTriggerOpenDialog: (val: boolean) => void
  isAddressLoaded: boolean // ✅ thêm cờ này
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: ReactNode }) {
  const [fullAddress, setFullAddress] = useState<string>("")
  const [shortAddress, setShortAddress] = useState<string>("")
  const [triggerOpenDialog, setTriggerOpenDialog] = useState(false)
  const [isAddressLoaded, setIsAddressLoaded] = useState(false) // ✅ cờ kiểm tra load
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const shorten = (addr: string) =>
    addr.length > 35 ? addr.slice(0, 35) + "..." : addr

  const setAddress = (addr: string) => {
    const now = Date.now()
    localStorage.setItem("userFullAddress", addr)
    localStorage.setItem("userAddressTimestamp", now.toString())
    setFullAddress(addr)
    setShortAddress(shorten(addr))
    resetExpirationTimer()
  }

  const clearAddress = () => {
    setFullAddress("")
    setShortAddress("")
    localStorage.removeItem("userFullAddress")
    localStorage.removeItem("userAddressTimestamp")
    toast.warning("Địa chỉ của bạn đã hết hạn, vui lòng chọn lại ⚠️")
  }

  const resetExpirationTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      clearAddress()
    }, 15 * 60 * 1000) // 15 phút
  }

  // ✅ Khôi phục địa chỉ khi load trang
  useEffect(() => {
    const savedAddr = localStorage.getItem("userFullAddress")
    if (savedAddr) {
      setFullAddress(savedAddr)
      setShortAddress(shorten(savedAddr))
      resetExpirationTimer()
    }
    setIsAddressLoaded(true) // ✅ báo hiệu đã load xong
  }, [])

  // ✅ Chỉ xoá khi thật sự thoát (không phải reload)
  useEffect(() => {
    const handleUnload = (e: BeforeUnloadEvent) => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      if (nav?.type !== "reload") {
        localStorage.removeItem("userFullAddress")
        localStorage.removeItem("userAddressTimestamp")
      }
    }
    window.addEventListener("beforeunload", handleUnload)
    return () => window.removeEventListener("beforeunload", handleUnload)
  }, [])

  return (
    <LocationContext.Provider
      value={{
        fullAddress,
        shortAddress,
        setAddress,
        clearAddress,
        triggerOpenDialog,
        setTriggerOpenDialog,
        isAddressLoaded, // ✅ truyền xuống
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocationContext() {
  const context = useContext(LocationContext)
  if (!context)
    throw new Error("useLocationContext must be used within a LocationProvider")
  return context
}
