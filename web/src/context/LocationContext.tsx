import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";

export interface LocationContextType {
  address: string;          // full address
  shortAddress: string;     // rút gọn
  latitude: number | null;
  longitude: number | null;

  setLocation: (data: {
    address: string;
    latitude: number;
    longitude: number;
  }) => void;

  clearLocation: () => void;

  triggerOpenDialog: boolean;
  setTriggerOpenDialog: (val: boolean) => void;

  isAddressLoaded: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string>("");
  const [shortAddress, setShortAddress] = useState<string>("");

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [triggerOpenDialog, setTriggerOpenDialog] = useState(false);
  const [isAddressLoaded, setIsAddressLoaded] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shorten = (addr: string) =>
    addr.length > 35 ? addr.slice(0, 35) + "..." : addr;

  // ⭐ LƯU ĐỊA CHỈ VÀO LOCAL STORAGE
  const setLocation: LocationContextType["setLocation"] = ({
    address,
    latitude,
    longitude,
  }) => {
    const now = Date.now();

    localStorage.setItem("addr", address);
    localStorage.setItem("addr_lat", latitude.toString());
    localStorage.setItem("addr_lon", longitude.toString());
    localStorage.setItem("addr_time", now.toString());

    setAddress(address);
    setShortAddress(shorten(address));
    setLatitude(latitude);
    setLongitude(longitude);

    resetExpirationTimer();
  };

  // ⭐ XOÁ
  const clearLocation = () => {
    localStorage.removeItem("addr");
    localStorage.removeItem("addr_lat");
    localStorage.removeItem("addr_lon");
    localStorage.removeItem("addr_time");

    setAddress("");
    setShortAddress("");
    setLatitude(null);
    setLongitude(null);

    toast.warning("Địa chỉ của bạn đã hết hạn, vui lòng chọn lại.");
  };

  // ⭐ TIMER 15 phút
  const resetExpirationTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(clearLocation, 15 * 60 * 1000);
  };

  // ⭐ LOAD LẠI KHI REFRESH
  useEffect(() => {
    const savedAddr = localStorage.getItem("addr");
    const lat = localStorage.getItem("addr_lat");
    const lon = localStorage.getItem("addr_lon");

    if (savedAddr && lat && lon) {
      setAddress(savedAddr);
      setShortAddress(shorten(savedAddr));
      setLatitude(Number(lat));
      setLongitude(Number(lon));
      resetExpirationTimer();
    }

    setIsAddressLoaded(true);
  }, []);

  return (
    <LocationContext.Provider
      value={{
        address,
        shortAddress,
        latitude,
        longitude,
        setLocation,
        clearLocation,
        triggerOpenDialog,
        setTriggerOpenDialog,
        isAddressLoaded,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocationContext must be used inside LocationProvider");
  return ctx;
}
