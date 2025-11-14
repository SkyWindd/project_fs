"use client";

import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import EditProfileDialog from "./EditProfileDialog";
import AddressList from "./AddressList"; // 👈 THÊM VÀO ĐÂY

export default function ProfileInfo() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <p className="text-center text-gray-500 py-6">Bạn chưa đăng nhập.</p>;
  }

  return (
    <div className="space-y-6">
      {/* ===================== */}
      {/*  CARD: THÔNG TIN USER */}
      {/* ===================== */}
      <Card className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Thông tin tài khoản
          </CardTitle>
          <EditProfileDialog />
        </CardHeader>

        <CardContent className="space-y-5 mt-3">
          {/* Họ tên */}
          <div>
            <Label className="text-sm text-gray-600">Họ & tên</Label>
            <p className="text-base font-medium text-gray-800">
              {currentUser.full_name}
            </p>
          </div>

          {/* Email */}
          <div>
            <Label className="text-sm text-gray-600">Email</Label>
            <p className="text-base font-medium text-gray-800">
              {currentUser.email}
            </p>
          </div>

          {/* Phone */}
          <div>
            <Label className="text-sm text-gray-600">Số điện thoại</Label>
            <p className="text-base font-medium text-gray-800">
              {currentUser.phone_number || "Chưa cập nhật"}
            </p>
          </div>

          {/* Role */}
          <div>
            <Label className="text-sm text-gray-600">Vai trò</Label>
            <p className="text-base font-medium text-gray-800 capitalize">
              {currentUser.role === "admin" ? "Quản trị viên" : "Khách hàng"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ===================== */}
      {/*  CARD: DANH SÁCH ĐỊA CHỈ */}
      {/* ===================== */}
      <AddressList /> {/* 👈 HIỂN THỊ NGAY DƯỚI PROFILE */}
    </div>
  );
}
