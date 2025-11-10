import React, { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"

interface LocationContextType {
  address: string
  setAddress: (addr: string) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string>("")

  // ✅ Giữ địa chỉ trong localStorage để lưu qua reload
  useEffect(() => {
    const saved = localStorage.getItem("userAddress")
    if (saved) setAddress(saved)
  }, [])

  useEffect(() => {
    if (address) localStorage.setItem("userAddress", address)
  }, [address])

  return (
    <LocationContext.Provider value={{ address, setAddress }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocationContext() {
  const context = useContext(LocationContext)
  if (!context) throw new Error("useLocationContext must be used within a LocationProvider")
  return context
}
