import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react"
import type { ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native"

interface LocationContextType {
  fullAddress: string
  shortAddress: string
  setAddress: (addr: string) => void
  setFullAddress: (addr: string) => void;
  clearAddress: () => void
  triggerOpenDialog: boolean
  setTriggerOpenDialog: (val: boolean) => void
  isAddressLoaded: boolean
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
)

export function LocationProvider({ children }: { children: ReactNode }) {
  const [fullAddress, setFullAddress] = useState("")
  const [shortAddress, setShortAddress] = useState("")
  const [triggerOpenDialog, setTriggerOpenDialog] = useState(false)
  const [isAddressLoaded, setIsAddressLoaded] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const shorten = (addr: string) =>
    addr.length > 35 ? addr.slice(0, 35) + "..." : addr

  // ==========================
  // 🔴 Lưu địa chỉ
  // ==========================
  const setAddress = async (addr: string) => {
    try {
      const now = Date.now()
      await AsyncStorage.setItem("userFullAddress", addr)
      await AsyncStorage.setItem("userAddressTimestamp", now.toString())
      setFullAddress(addr)
      setShortAddress(shorten(addr))
      resetExpirationTimer()
    } catch (e) {
      Alert.alert("Lỗi", "Không thể lưu địa chỉ.")
    }
  }

  // ==========================
  // 🔴 Xoá địa chỉ
  // ==========================
  const clearAddress = async () => {
    setFullAddress("")
    setShortAddress("")
    await AsyncStorage.removeItem("userFullAddress")
    await AsyncStorage.removeItem("userAddressTimestamp")

    Alert.alert(
      "Địa chỉ hết hạn",
      "Địa chỉ của bạn đã hết hạn, vui lòng chọn lại."
    )
  }

  // ==========================
  // ⏱ Timer xoá 15 phút
  // ==========================
  const resetExpirationTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      clearAddress()
    }, 15 * 60 * 1000)
  }

  // ==========================
  // 🔄 Khôi phục khi mở app
  // ==========================
  useEffect(() => {
    const loadAddress = async () => {
      const savedAddr = await AsyncStorage.getItem("userFullAddress")
      const savedTime = await AsyncStorage.getItem("userAddressTimestamp")

      if (savedAddr && savedTime) {
        const diff = Date.now() - parseInt(savedTime, 10)
        const EXPIRATION = 15 * 60 * 1000

        if (diff < EXPIRATION) {
          setFullAddress(savedAddr)
          setShortAddress(shorten(savedAddr))
          resetExpirationTimer()
        } else {
          clearAddress()
        }
      }

      setIsAddressLoaded(true)
    }

    loadAddress()
  }, [])

  return (
    <LocationContext.Provider
      value={{
        fullAddress,
        shortAddress,
        setAddress,
        setFullAddress,
        clearAddress,
        triggerOpenDialog,
        setTriggerOpenDialog,
        isAddressLoaded,
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
