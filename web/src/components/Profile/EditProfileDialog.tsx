"use client";

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { updateUserInfo } from "../../lib/api";

export default function EditProfileDialog() {
  const { currentUser, updateUser } = useAuth();
  const [open, setOpen] = useState(false);

  const [fullName, setFullName] = useState(currentUser?.full_name || "");
  const [phone, setPhone] = useState(currentUser?.phone_number || "");
  const [password, setPassword] = useState(currentUser?.password || "");
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = async () => {
    if (!currentUser) {
      toast.error("Không tìm thấy thông tin người dùng ❌");
      return;
    }

    if (!fullName.trim()) {
      toast.error("Tên không được để trống ❌");
      return;
    }

        try {
        const updated = await updateUserInfo(currentUser.user_id, {
          full_name: fullName,
          phone_number: phone,
          password: password,
        });

        updateUser(updated); // cập nhật localStorage
        toast.success("Cập nhật thành công!");
        setOpen(false);
      } catch (err: any) {
        toast.error(err.message);
      }
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          Chỉnh sửa
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Cập nhật thông tin
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Họ tên */}
          <div className="space-y-1">
            <Label htmlFor="fullName">Họ & tên</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nguyễn Văn A"
            />
          </div>

          {/* Số điện thoại */}
          <div className="space-y-1">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0987 123 456"
            />
          </div>

          {/* Mật khẩu */}
          <div className="space-y-1">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
