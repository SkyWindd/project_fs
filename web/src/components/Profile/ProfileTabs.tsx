"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { useSearchParams, useNavigate } from "react-router-dom";

import ProfileInfo from "./ProfileInfo";
import ProfileOrders from "./ProfileOrders";

export default function ProfileTabs() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ⬇ Lấy tab từ URL, mặc định là "info"
  const initialTab = (searchParams.get("tab") as "info" | "orders") || "info";

  const [tab, setTab] = useState<"info" | "orders">(initialTab);

  // ⬇ Khi URL thay đổi → cập nhật tab
  useEffect(() => {
    const urlTab = (searchParams.get("tab") as "info" | "orders") || "info";
    setTab(urlTab);
  }, [searchParams]);

  // ⬇ Khi đổi tab → cập nhật URL
  const handleChangeTab = (v: "info" | "orders") => {
    setTab(v);
    navigate(`/profile?tab=${v}`, { replace: true }); // Không tạo thêm lịch sử
  };

  return (
    <Tabs
      value={tab}
      onValueChange={(v) => handleChangeTab(v as "info" | "orders")}
      className="w-full"
    >
      <TabsList
        className="
          grid grid-cols-2 w-full
          bg-gray-100
          p-1.5
          rounded-full
          border border-gray-200
        "
      >
        {/* TAB: Thông tin */}
        <TabsTrigger
          value="info"
          className="
            flex items-center justify-center
            py-2.5 text-sm font-medium
            rounded-full transition-all duration-200

            text-gray-700 hover:text-red-600
            data-[state=active]:bg-white
            data-[state=active]:text-red-600
            data-[state=active]:font-semibold
            data-[state=active]:shadow-md
          "
        >
          Thông tin
        </TabsTrigger>

        {/* TAB: Đơn hàng */}
        <TabsTrigger
          value="orders"
          className="
            flex items-center justify-center
            py-2.5 text-sm font-medium
            rounded-full transition-all duration-200

            text-gray-700 hover:text-red-600
            data-[state=active]:bg-white
            data-[state=active]:text-red-600
            data-[state=active]:font-semibold
            data-[state=active]:shadow-md
          "
        >
          Đơn hàng
        </TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="info" className="animate-fadeIn">
          <ProfileInfo />
        </TabsContent>

        <TabsContent value="orders" className="animate-fadeIn">
          <ProfileOrders />
        </TabsContent>
      </div>
    </Tabs>
  );
}
