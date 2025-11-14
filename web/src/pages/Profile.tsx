"use client"

import React from "react"
import ProfileTabs from "../components/Profile/ProfileTabs"
import { useAuth } from "../context/AuthContext"
export default function Profile() {
    const { currentUser } = useAuth();

  if (!currentUser) {
    return <p className="text-center text-gray-500 py-6">Bạn chưa đăng nhập.</p>;
  }
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-3xl mx-auto">
        <ProfileTabs />
      </div>
    </div>
  )
}
