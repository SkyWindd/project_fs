"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import EditProfileDialog from "./EditProfileDialog";
import AddressList from "./AddressList";
import { fetchUser } from "../../lib/api";

export default function ProfileInfo() {
  const { currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    fetchUser(currentUser.user_id)
      .then((data) => {
        updateUser(data); // cập nhật lại từ backend
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!currentUser) {
    return <p className="text-center text-gray-500 py-6">Bạn chưa đăng nhập.</p>;
  }

  if (loading) {
    return <p className="text-center text-gray-500 py-6">Đang tải dữ liệu...</p>;
  }

  return (
    <div className="space-y-6">
      <Card className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Thông tin tài khoản
          </CardTitle>
          <EditProfileDialog />
        </CardHeader>

        <CardContent className="space-y-5 mt-3">
          <Info label="Họ & tên" value={currentUser.full_name} />
          <Info label="Email" value={currentUser.email} />
          <Info label="Số điện thoại" value={currentUser.phone_number || "Chưa cập nhật"} />
          <Info label="Vai trò" value={currentUser.role === "admin" ? "Quản trị viên" : "Khách hàng"} />
        </CardContent>
      </Card>

      <AddressList />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className="text-sm text-gray-600">{label}</Label>
      <p className="text-base font-medium text-gray-800">{value}</p>
    </div>
  );
}
