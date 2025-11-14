"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { MapPin, Loader2 } from "lucide-react";
import MapPicker from "../Location/MapPicker";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  address?: any;
  onSave: (data: any) => void;
}

export default function AddressFormDialog({
  open,
  setOpen,
  address,
  onSave,
}: Props) {
  const isEdit = !!address;

  const [label, setLabel] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [isDefault, setIsDefault] = useState(false);

  const [loadingGPS, setLoadingGPS] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (isEdit && address) {
      setLabel(address.address_label);
      setStreet(address.street);
      setCity(address.city);
      setLat(address.latitude);
      setLon(address.longitude);
      setIsDefault(address.is_default);
    } else {
      setLabel("");
      setStreet("");
      setCity("");
      setLat(null);
      setLon(null);
      setIsDefault(false);
    }
  }, [address, isEdit, open]);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Trình duyệt không hỗ trợ định vị GPS ❌");
      return;
    }

    setLoadingGPS(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();

          const fullAddress = data.display_name || "";
          setStreet(fullAddress);

          const parts = fullAddress.split(",");
          setCity(parts.at(-1)?.trim() || "");

          setLat(latitude);
          setLon(longitude);
        } catch {
          toast.error("Không thể lấy địa chỉ từ GPS ❌");
        }

        setLoadingGPS(false);
      },
      () => {
        toast.error("Không thể truy cập vị trí của bạn ❌");
        setLoadingGPS(false);
      }
    );
  };

  const handleSave = () => {
    if (!street.trim()) {
      toast.error("Vui lòng nhập địa chỉ chi tiết.");
      return;
    }

    const data = {
      ...address,
      address_label: label || "Địa chỉ mới",
      street,
      city,
      latitude: lat,
      longitude: lon,
      is_default: isDefault,
      updated_at: new Date().toISOString(),
      created_at: address?.created_at || new Date().toISOString(),
    };

    onSave(data);
    toast.success(isEdit ? "Cập nhật địa chỉ thành công 🎉" : "Thêm địa chỉ mới 🎉");
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6 shadow-lg border border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-gray-800">
              <MapPin className="w-5 h-5 text-red-500" />
              {isEdit ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
            </DialogTitle>
          </DialogHeader>

          {/* FORM */}
          <div className="space-y-5 mt-3">
            {/* LABEL */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Loại địa chỉ
              </Label>
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Nhà riêng, Công ty..."
                className="h-10 rounded-lg border-gray-200 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* STREET */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Địa chỉ chi tiết
              </Label>

              <div className="relative">
                <Input
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Nhập địa chỉ..."
                  className="h-10 rounded-lg border-gray-200 pr-10 focus:ring-red-500 focus:border-red-500"
                />

                {/* GPS BUTTON */}
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={loadingGPS}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition"
                >
                  {loadingGPS ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <MapPin className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* MAP BUTTON */}
              <Button
                variant="link"
                className="text-red-600 font-medium pl-0"
                onClick={() => setShowMap(true)}
              >
                📍 Chọn vị trí trên bản đồ
              </Button>
            </div>
            {/* MAP PICKER */}
            {showMap && (
                <MapPicker
                onSelectLocation={(addr, latVal, lonVal) => {
                    setStreet(addr);
                    setLat(latVal);
                    setLon(lonVal);

                    const parts = addr.split(",");
                    setCity(parts.at(-1)?.trim() || "");

                    setShowMap(false);
                }}
                onClose={() => setShowMap(false)}
                />
            )}     

            {/* DEFAULT CHECKBOX */}
            <div className="flex items-center gap-2 pt-2">
              <input
                id="isDefault"
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="w-4 h-4 accent-red-600"
              />
              <Label htmlFor="isDefault" className="text-sm text-gray-700">
                Đặt làm mặc định
              </Label>
            </div>
          </div>

          {/* FOOTER */}
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-lg border-gray-300"
            >
              Hủy
            </Button>

            <Button
              onClick={handleSave}
              className="rounded-lg bg-red-600 hover:bg-red-700 text-white"
            >
              {isEdit ? "Lưu thay đổi" : "Thêm địa chỉ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      
    </>
  );
}
